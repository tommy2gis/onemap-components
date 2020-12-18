import React, { Component } from 'react';
import { connect } from "react-redux";
import buffer from '@turf/buffer';
import { Card, Divider, InputNumber,Select,Button, message,Icon} from "antd";
import AttributesFillter from './attributesfillter';
import Draggable from 'react-draggable';
import {
  geojsonToArcGIS
} from "@esri/arcgis-to-geojson-utils";

import {
    queryThematicMetaData,
    queryThematic,
    setRelateFeature
  } from "../ThematicList/actions.js";
  
class RelatePanel extends Component {
  state = { wherestr: null,bufferdistance:0 };
  onBufferChange = (value) => {
    this.setState({bufferdistance:value})
  };

  onQueryChange = (query) => {
    let filters=[];
    if(query.filterlist){
      query.filterlist.forEach(filter => {
        switch (filter.sel_filter_rel.value) {
          case "equal":
            filters.push(filter.sel_filter_field+" = '"+filter.sel_filter_value+"'");
            break;
          case "notequal":
            filters.push(filter.sel_filter_field+" != '"+filter.sel_filter_value+"'");
            break;
          case "contain":
            filters.push(filter.sel_filter_field+" like '%"+filter.sel_filter_value+"%'");
            break;
          default:
            break;
        }
      });
      this.setState({wherestr:filters.join(" and ")})
    }
    
  };

  attrQuery() {
    const {relatefeature,geometryField } = this.props.thematics;
    let wherestr = this.state.wherestr;
    const {bufferdistance}=this.state;
    let geom=relatefeature.geometry;
    if(bufferdistance){
      geom=buffer(relatefeature.geometry, bufferdistance/1000, {units: 'kilometers'}).geometry;
    }
    const arcgisgeo = geojsonToArcGIS(geom);

    if(this.state.attrlayer){
      this.props.queryThematic(
        mapConfigJson.mapserverurl,
        this.state.attrlayer,
        JSON.stringify(arcgisgeo),
        "esriGeometryPolygon",
        wherestr,
        "esriSpatialRelContains"
      );
    }else{
      message.info('请选择图层')
    }
  }

  onClose = () => {
    this.props.setRelateFeature(null);
  };

  onDataChange = (value) => {
    this.setState({ attrlayer: value });
    this.props.queryThematicMetaData({
      url:mapConfigJson.mapserverurl,
      layerid: value,
    });

  };

  render() {
    const {
      metaData,
      relatefeature,
      themlist,
    } = this.props.thematics;
    return (
      relatefeature ? (
        <Draggable grid={[25, 25]} 
        handle=".handle">
       <Card
          size="small"
          className="relate_toolbar_card"
          id="toolbar_card"
          title="关联查询"
          extra={<Icon className="handle" type="fullscreen" />} 
        >
          <Divider orientation="left">缓冲设置</Divider>
          <div style={{ margin: "4px 20px" }}>
            缓冲半径:{" "}
            <InputNumber
              min={0}
              value={this.state.bufferdistance}
              onChange={(e) => this.onBufferChange(e)}
            />{" "}
            米
          </div>

          <Divider orientation="left">选择图层</Divider>
          <div style={{ margin: "4px 20px" }}>
            <Select
              showSearch
              style={{ width: 150 }}
              placeholder="选择数据"
              optionFilterProp="children"
              onChange={this.onDataChange}
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {themlist
                .filter((e) => e.servicetype === "map")
                .map((them) => {
                  return <Option value={them.layers}>{them.name}</Option>;
                })}
            </Select>
          </div>

          <Divider orientation="left">要素属性设置</Divider>
          <div style={{ margin: "4px 20px" }}>
            <AttributesFillter
              fieldTypes={metaData.fields}
              onChange={(e) => this.onQueryChange(e)}
            ></AttributesFillter>
            <Button
            onClick={this.onClose}
            style={{ float: "right" }}
           
          >
            关闭
          </Button>
            <Button style={{ float: "right", right: 10 }}  type="primary" onClick={() => this.attrQuery()}>
              查询
            </Button>
          </div>
        </Card>
      </Draggable>
        
      ):null
    );
    
  }
}

export default connect(
    state => {
      return { thematics: state.thematics };
    },
    {queryThematicMetaData,queryThematic,setRelateFeature}
  )(RelatePanel);
