/*
 * @Author: 史涛
 * @Date: 2020-04-14 09:27:41
 * @Last Modified by: 史涛
 * @Last Modified time: 2020-12-17 11:04:18
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Collapse, Icon, Table, Slider } from "antd";
import { connect } from "react-redux";
import {
  loadThematicsList,
  showThematicLayer,
  queryThematicMetaData,
  setSelectedQueryLayer,
  changeThematicOpacity,
  loadLegendJson,
} from "./actions";
import {
  addSourceAndLayers,
  removeSourceAndLayers,
  addSources,
  addLayers,
  updateLayer,
} from "../../components/MapBoxGL/actions";

import { ResourceCatalog } from "../../../../../lib/onemap-components-dev";
import "../../../../../lib/onemap-components-dev.css";

import "./style.less";

class Catalog extends Component {
  static propTypes = {
    prop: PropTypes,
  };

  state = { list: [], selectedRows: [], selectedRowKeys: [] };

  onOpacityChange = (record, value) => {
    this.props.changeThematicOpacity(record.id, value);
    this.props.updateLayer("thematic_" + record.id, {
      paint: { "raster-opacity": value },
    });
  };

  onExpand = (e, record) => {
    if (!record.legend) {
      this.props.loadLegendJson(record);
    }
  };

  componentWillMount() {}

  onSelect = (record, selected) => {
    if (selected) {
      this.addThematicToStyle(record);
    } else {
      this.removeThematicfromStyle(record);
    }
  };

  /**
   *添加图层到style表进行地图加载
   *
   * @memberof List
   */
  addThematicToStyle = (item) => {
    this.props.showThematicLayer(item.id);
    this.props.setSelectedQueryLayer(item.id);
    if (item.servicetype === "wms") {
      this.props.addSourceAndLayers(
        "thematic_" + item.name,
        {
          type: "raster",
          tiles: [
            ServerIp +
              item.url +
              "?bbox={bbox-epsg-4490}&format=image/png&service=WMS&version=1.1.1&request=GetMap&styles=default&srs=EPSG:4490&transparent=true&width=256&height=256&layers=0",
          ],
          tileSize: 256,
        },
        {
          id: "thematic_" + item.name,
          type: "raster",
          visibility: "none",
          source: "thematic_" + item.name,
          paint: {
            "raster-opacity": 0.8,
          },
        }
      );
    } else if (item.servicetype === "map") {
      this.props.updateLayer("thematic_" + item.id, {
        layout: { visibility: "visible" },
      });
      this.props.queryThematicMetaData({
        url: item.url,
        layerid: item.layers,
      });
    } else if (item.servicetype === "wmts") {
      this.props.addSourceAndLayers(
        "thematic_" + item.name,
        {
          type: "raster",
          tiles: [
            ServerIp +
              item.url +
              "?request=GetTile&tilematrix={z}&tilerow={y}&tilecol={x}",
          ],
          tileSize: 256,
        },
        {
          id: "thematic_" + item.name,
          type: "raster",
          visibility: "none",
          source: "thematic_" + item.name,
        }
      );
    }
  };

  /**
   *移除专题图层
   *
   * @memberof List
   */
  removeThematicfromStyle = (item) => {
    this.props.showThematicLayer(item.id);
    this.props.updateLayer("thematic_" + item.id, {
      layout: { visibility: "none" },
    });
  };

  render() {
    return (
      <ResourceCatalog
        sideprops={{title:'资源目录',placement:'left',visible:true,onClose:this.props.onClose}}
        data={this.props.thematics.themlist}
        onSelect={this.onSelect}
      ></ResourceCatalog>
    );
  }
}

export default connect(
  (state) => {
    return { thematics: state.thematics };
  },
  {
    loadThematicsList,
    setSelectedQueryLayer,
    addSourceAndLayers,
    removeSourceAndLayers,
    showThematicLayer,
    queryThematicMetaData,
    changeThematicOpacity,
    loadLegendJson,
    updateLayer,
    addSources,
    addLayers,
  }
)(Catalog);
