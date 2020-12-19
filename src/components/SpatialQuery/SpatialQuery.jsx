/*
 * @Author: 史涛
 * @Date: 2020-04-14 09:27:13
 * @Last Modified by: 史涛
 * @Last Modified time: 2020-12-19 21:54:53
 */
import React, { Component } from "react";
import turfbuffer from "@turf/buffer";
import { geojsonToArcGIS } from "@esri/arcgis-to-geojson-utils";

import SpatialQueryPanel  from "./SpatialQueryPanel";

class SpatialQuery extends Component {
  state = { wherestr: null };
  onSpatialQuery = (type) => {
    this.props.drawActions.changeDrawingStatus("start", type, "spatial", [], {});
  };
  onCheckBuffer = (e) => {
    this.props.thematicActions.setBufferDistance(e.target.checked ? 100 : 0);
  };

  onBufferChange = (value) => {
    this.props.thematicActions.setBufferDistance(value);
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
    this.props.thematicActions.setSelectedQueryLayer(e.target.value);
    this.props.thematicActions.queryThematicMetaData({
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
      this.props.thematicActions.queryThematic(
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
      this.props.thematicActions.queryThematic(
        selectedThematic[0].url,
        selectedThematic[0].layers,
        JSON.stringify(arcgisgeo),
        "esriGeometryPolygon"
      );
    }
  };

  onClear = () => {
    this.props.drawActions.changeDrawingStatus("clean", "", "measure", [], {});
    this.props.thematicActions.queryThematicResponces(null, null);
    this.props.thematicActions.setSelectedFeature(null);
  };

  onClose = () => {
    this.props.thematicActions.showSpatialQuery(false);
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

export default SpatialQuery;
