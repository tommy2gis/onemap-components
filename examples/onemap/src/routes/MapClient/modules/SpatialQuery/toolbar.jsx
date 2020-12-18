/*
 * @Author: 史涛
 * @Date: 2020-04-14 09:27:13
 * @Last Modified by: 史涛
 * @Last Modified time: 2020-12-17 14:53:10
 */
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Card,
  Radio,
  Button,
  Divider,
  Checkbox,
  InputNumber,
  Row,
  Spin,
} from "antd";
import { changeDrawingStatus } from "../../actions/draw";
import turfbuffer from "@turf/buffer";
import AttributesFillter from "./attributesfillter";
import "./style.less";
import {
  queryThematicResponces,
  setSelectedQueryLayer,
  setSelectedFeature,
  showSpatialQuery,
  queryThematicMetaData,
  setBufferDistance,
  queryThematic,
} from "../ThematicList/actions.js";
import {
  geojsonToArcGIS,
  arcgisToGeoJSON,
} from "@esri/arcgis-to-geojson-utils";

import { SpatialQueryPanel } from "../../../../../lib/onemap-components-dev";

class ToolBar extends Component {
  state = { wherestr: null };
  onSpatialQuery = (type) => {
    this.props.changeDrawingStatus("start", type, "spatial", [], {});
  };
  onCheckBuffer = (e) => {
    this.props.setBufferDistance(e.target.checked ? 100 : 0);
  };

  onBufferChange = (value) => {
    this.props.setBufferDistance(value);
  };

  onQueryChange = (query) => {
    let filters = [];
    if (query.filterlist) {
      query.filterlist.forEach((filter) => {
        switch (filter.sel_filter_rel.value) {
          case "equal":
            filters.push(
              filter.sel_filter_field + " = '" + filter.sel_filter_value + "'"
            );
            break;
          case "notequal":
            filters.push(
              filter.sel_filter_field + " != '" + filter.sel_filter_value + "'"
            );
            break;
          case "contain":
            filters.push(
              filter.sel_filter_field +
                " like '%" +
                filter.sel_filter_value +
                "%'"
            );
            break;
          default:
            break;
        }
      });
      this.setState({ wherestr: filters.join(" and ") });
    }
  };

  onLayerChange = (e) => {
    this.onClear();
    this.props.setSelectedQueryLayer(e.target.value);
    this.props.queryThematicMetaData({
      url: mapConfigJson.mapserverurl,
      layerid: e.target.value,
    });
  };

  onSearch = () => {
    const { drawOwner, drawMethod, geometry } = this.props.draw;
    const { querylayerid, themlist, bufferdistance } = this.props.thematics;
    const selectedThematic = themlist.filter((e) => e.id === querylayerid);
    //属性查询
    if (this.state.wherestr) {
      this.props.queryThematic(
        selectedThematic[0].url,
        selectedThematic[0].layers,
        null,
        null,
        this.state.wherestr
      );
    } //缓冲查询
    else if (drawOwner === "spatial" && geometry && bufferdistance) {
      const buffergeometry = turfbuffer(geometry, bufferdistance / 1000)
        .geometry;
      const arcgisgeo = geojsonToArcGIS(buffergeometry);
      this.props.queryThematic(
        selectedThematic[0].url,
        selectedThematic[0].layers,
        JSON.stringify(arcgisgeo),
        "esriGeometryPolygon"
      );
    }
  };

  onClear = () => {
    this.props.changeDrawingStatus("clean", "", "measure", [], {});
    this.props.queryThematicResponces(null, null);
    this.props.setSelectedFeature(null);
  };

  onClose = () => {
    this.props.showSpatialQuery(false);
    this.onClear();
  };

  

  render() {
    const { enable } = this.props.draw;
    const {
      spatialQueryShow,
      bufferdistance,
      metaData,
      queryloading,
      themlist,
      querylayerid
    } = this.props.thematics;
    return (
      spatialQueryShow &&
      enable && (
        <SpatialQueryPanel
          onLayerChange={this.onLayerChange}
          onSpatialQuery={this.onSpatialQuery}
          onCheckBuffer={this.onCheckBuffer}
          onBufferChange={this.onBufferChange}
          onQueryChange={this.onQueryChange}
          onClose={this.onClose}
          onClear={this.onClear}
          onSearch={this.onSearch}
          selthemlist={themlist.filter((e) => e.visibility)}
          querylayerid={querylayerid}
          queryloading={queryloading}
          metaData={metaData}
          bufferdistance={bufferdistance}
        ></SpatialQueryPanel>
      )
    );
  }
}

export default connect(
  (state) => {
    return { draw: state.draw, map: state.map, thematics: state.thematics };
  },
  {
    changeDrawingStatus,
    showSpatialQuery,
    queryThematicResponces,
    setSelectedFeature,
    setBufferDistance,
    queryThematicMetaData,
    setSelectedQueryLayer,
    queryThematic,
  }
)(ToolBar);
