/*
 * @Author: 史涛
 * @Date: 2020-03-25 11:23:27
 * @Last Modified by: 史涛
 * @Last Modified time: 2020-12-17 17:02:13
 */
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import centroid from "@turf/centroid";
import { setAreaLocation, selectAreaLocation } from "./actions";
import {
  addSourceAndLayers,
  updateSource,
  updateLayer,
  zoomToPoint3D,
} from "../../components/MapBoxGL/actions";

import { AreaLocation } from "../../../../../lib/onemap-components-dev";
import quhuadata from "./data";
import "./arealocation.css";

class AreaLocationComponent extends Component {
  componentWillMount() {
    this.props.setAreaLocation(quhuadata);
    this.props.mapboxActions.updateSource("arealocation", {
      type: "geojson",
      data: quhuadata,
    });
  }

  handleMenuClick = (area) => {
    if (area == "全市") {
      // this.props.zoomToPoint(
      //   { x: this.props.mapConfig.center.x, y: this.props.mapConfig.center.y },
      //   this.props.mapConfig.zoom
      // );
      this.props.mapboxActions.zoomToPoint3D(
        { x: this.props.mapConfig.center.x, y: this.props.mapConfig.center.y },
        this.props.mapConfig.zoom
      );
    }
    this.props.selectAreaLocation(area);
    this.props.mapboxActions.updateLayer("arealocation-outline", {
      filter: ["all", ["==", "NAME", area]],
    });
    this.props.arealocation.result.features.forEach((ele) => {
      if (ele.properties.NAME === area) {
        let center = centroid(ele.geometry);
        this.props.mapboxActions.zoomToPoint3D(
          {
            x: center.geometry.coordinates[0],
            y: center.geometry.coordinates[1],
          },
          11.5
        );
      }
    });
  };
  render() {
    const quhuaarray = [
      "城北街道",
      "如城街道",
      "城南街道",
      "九华镇",
      "石庄镇",
      "长江镇",
      "下原镇",
      "吴窑镇",
      "搬经镇",
      "江安镇",
      "东陈镇",
      "白蒲镇",
      "丁堰镇",
      "磨头镇",
    ];
    return (
      <div style={{ float: "left" }}>
        <AreaLocation
          areaNames={quhuaarray}
          onMenuClick={this.handleMenuClick}
          currentArea={this.props.arealocation.currentarea}
        ></AreaLocation>
      </div>
    );
  }
}

export default connect(
  (state) => {
    return { arealocation: state.arealocation, mapConfig: state.mapConfig };
  },
  {
    setAreaLocation,
    selectAreaLocation,
    addSourceAndLayers,
    updateSource,
    updateLayer,
    zoomToPoint3D,
  }
)(AreaLocationComponent);
