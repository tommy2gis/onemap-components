/*
 * @Author: 史涛
 * @Date: 2019-01-05 19:30:28
 * @Last Modified by: 史涛
 * @Last Modified time: 2020-12-19 17:47:06
 */
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { changeDrawingStatus } from "../../actions/draw";
import {
  setSelectedFeature,
  queryThematicResponces,
  showSpatialQuery,
  showSpatialAnalysis,
} from "../../actions/thematics";
import {
  AreaLocation,
  SetLocation,
} from "../../../../../lib/onemap-components-dev";
import { Card, Menu, Icon, Dropdown, message, Divider } from "antd";
import quhuadata from "./data";
import "./style.less";

import * as screenfull from "screenfull";

class ToolBar extends Component {
  static propTypes = {
    step: PropTypes.number,
    mapStateSource: PropTypes.string,
    currentZoom: PropTypes.number,
    map: PropTypes.object,
    mapConfig: PropTypes.object,
  };

  static defaultProps = {
    step: 1,
    currentZoom: 3,
  };

  state = {
    juanModalVisible: false,
    screemModalVisible: false,
    isFullscreen: false,
    mesurevisable: false,
  };

  setJuanModalVisible(juanModalVisible) {
    this.setState({ juanModalVisible });
  }

  setScreemModalVisible(screemModalVisible) {
    this.setState({ screemModalVisible });
  }

  setMeasureVisible(mesurevisable) {
    this.setState({ mesurevisable });
  }

  onVisibleChange = (e) => {
    this.setMeasureVisible(false);
  };

  onDisMeasure = () => {
    message.info("双击结束测量");
    this.props.changeDrawingStatus("start", "polyline", "measure", [], {});
  };

  handleSpatialQuery = () => {
    this.props.showSpatialQuery(true);
  };

  handleStatistic = () => {
    this.props.showSpatialAnalysis(true);
  };

  onAreaMeasure = () => {
    message.info("双击结束测量");
    this.props.changeDrawingStatus("start", "polygon", "measure", [], {});
  };

  handlePrint = () => {
    this.props.changeDrawingStatus("print", "", "toolbar", [], {});
  };

  handleClear = () => {
    this.props.changeDrawingStatus("clean", "", "measure", [], {});
    this.props.queryThematicResponces(null, null);
    this.props.setSelectedFeature(null);
  };
  handleScreenfull = () => {
    if (ConfigUtils.getBrowserProperties().ie) {
      message.info("ie模式下请使用键盘的F11键");
      return;
    }
    if (screenfull.enabled) {
      if (this.state.isFullscreen) {
        this.setState({ isFullscreen: false });
        screenfull.exit();
      } else {
        screenfull.request();
        this.setState({ isFullscreen: true });
      }
    }
  };

  onLocClose = () => {
    this.setState({ locationshow: false });
  };

  render() {
    const { mapBoxActions, mapConfig, map3d } = this.props;
    const measuremenu = (
      <Menu
        className={
          this.state.mesurevisable
            ? "toolbar_measure_list"
            : "toolbar_measure_list ant-dropdown-hidden"
        }
      >
        <Menu.Item>
          <a id="toolbar_measure_dis" onClick={this.onDisMeasure}>
            测距
          </a>
        </Menu.Item>
        <Menu.Item>
          <a id="toolbar_measure_area" onClick={this.onAreaMeasure}>
            测面
          </a>
        </Menu.Item>
      </Menu>
    );
    return (
      <div>
        <Card className="toolbar_card" id="toolbar_card" bordered={false}>
          <AreaLocation
            mapBoxActions={mapBoxActions}
            map3d={map3d}
            mapConfig={mapConfig}
            quhuadata={quhuadata}
          />
          <Divider type="vertical" />

          <Dropdown
            overlay={measuremenu}
            visible={true}
            onVisibleChange={this.onVisibleChange}
          >
            <button
              type="button"
              className="ant-btn toolbar_btn"
              onMouseMove={() => this.setMeasureVisible(true)}
            >
              <i className="iconfont icon-duibi"></i>
              <span>测量</span>
              <Icon type="down" />
            </button>
          </Dropdown>
          <Divider type="vertical" />
          <button
            type="button"
            className="ant-btn toolbar_btn"
            onClick={() => this.setState({ locationshow: true })}
          >
            <i className="iconfont icon-location-ok-copy"></i>
            <span>坐标定位</span>
          </button>
          <Divider type="vertical" />
          {/* <button
            type="button"
            className="ant-btn toolbar_btn"
            onClick={this.handlePrint}
          >
            <i className="iconfont icon-ditudaochu"></i>
            <span>地图导出</span>
          </button>
          <Divider type="vertical" /> */}
          <button
            type="button"
            className="ant-btn toolbar_btn"
            onClick={this.handleClear}
          >
            <i className="iconfont icon-qingchu"></i>
            <span>清除</span>
          </button>
          <Divider type="vertical" />
          <button
            type="button"
            className="ant-btn toolbar_btn"
            onClick={this.handleScreenfull}
          >
            <i className="iconfont icon-quanping"></i>
            <span>全屏</span>
          </button>
        </Card>
        {this.state.locationshow && (
          <SetLocation
            map3d={map3d}
            onClose={this.onLocClose}
            mapBoxActions={mapBoxActions}
          ></SetLocation>
        )}
      </div>
    );
  }
}

export default connect(
  (state) => {
    return {
      map: state.map || (state.mapConfig && state.mapConfig.map),
      draw: state.draw,
    };
  },
  {
    setSelectedFeature,
    queryThematicResponces,
    changeDrawingStatus,
    showSpatialQuery,
    showSpatialAnalysis,
  }
)(ToolBar);
