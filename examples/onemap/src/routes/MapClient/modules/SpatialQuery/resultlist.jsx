/*
 * @Author: 史涛 
 * @Date: 2020-04-14 09:27:06 
 * @Last Modified by: 史涛
 * @Last Modified time: 2020-06-12 10:55:05
 */
import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Icon, Collapse } from "antd";
import arcgisX from "@tommy2gis/arcgis-x";
import {
  queryThematicResponces,
  setSelectedFeature,
  setRelateFeature
} from "../../actions/thematics.js";
import {
  arcgisToGeoJSON
} from "@esri/arcgis-to-geojson-utils";


class ResultList extends Component {

  state={show:true}

  downloadData=()=>{
    const { themresult,metaData} = this.props.thematics;
    let csvKml = arcgisX.toCsvGeoJson(themresult).replace(/\|/g,",");

    var aLink = document.createElement('a');
    aLink.download = (metaData.name||'data')+'.csv';
    aLink.href = 'data:text/csv;charset=UTF-8,\uFEFF' + encodeURIComponent(csvKml);

    var event = new MouseEvent('click');
    aLink.dispatchEvent(event);
  }

  backMenu=()=>{
    this.props.queryThematicResponces(null, null);
  }

  /**
   *选择要素
   *
   * @param {*} e
   * @param {*} item
   */
  onSelectItem = (e,item) => {
    e.stopPropagation();
    this.props.setSelectedFeature(arcgisToGeoJSON(item));
  };

  /**
   *对要素进行关联查询
   *
   * @param {*} e
   * @param {*} item
   */
  onRelateQuery= (e,item) => {
    e.stopPropagation();
    this.props.setRelateFeature(arcgisToGeoJSON(item));
  };
  
  renderList = (list, titlefield,fields) => {
    return list.map((el, index) => {
      return (
        <Collapse.Panel
          extra={
            [<a title="定位" style={{margin:'0 10px'}} onClick={(e) => this.onSelectItem(e,el)} >
              <Icon type="environment" />
            </a>,
            <a title="关联查询" onClick={(e) => this.onRelateQuery(e,el)}>
             <Icon type="link" />
            </a>]
          }
          header={el.attributes[titlefield]}
          key={index}
        >
          {this.renderThematicContent(el.attributes,fields)}
        </Collapse.Panel>
      );
    });
  };
  renderThematicContent(feas,fields) {
    let list = [];
    for (const key in feas) {
      if(key.indexOf('OBJECTID')==-1&&key.toUpperCase().indexOf('SHAPE')==-1&&
      key.toUpperCase().indexOf("IMAGES") == -1){
        list.push(
          <p>
            {fields[key]}: {feas[key] ? feas[key] : "空"}
          </p>
        );
      }
     
    }
    return list;
  }
  render() {
    const { themresult,querygeometry} = this.props.thematics;
    const {show}=this.state;
    if (themresult&&themresult.features.length>0) {
      return (
        <Card
          size="small"
          title="查询结果"
          className="spatial_result_card"
          bordered={false}
          extra={[<a  style={{marginRight:10}} onClick={this.backMenu}><Icon type="rollback" title="返回目录"/></a>,<a onClick={this.downloadData}><Icon type="download" title="下载"/></a>]} 
        >
          <Collapse bordered={false} defaultActiveKey={[0]}>
            {this.renderList(themresult.features, themresult.displayFieldName,themresult.fieldAliases)}
          </Collapse>
        </Card>
      );
    }
    return null;
  }
}

export default connect(
  state => {
    return { thematics: state.thematics };
  },
  { queryThematicResponces, setSelectedFeature,setRelateFeature  }
)(ResultList);
