/*
 * @Author: 史涛
 * @Date: 2019-01-05 17:40:59
 * @Last Modified by: 史涛
 * @Last Modified time: 2021-01-12 14:18:17
 */
Date.prototype.Format = function (fmt) {
  //author: meizz
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds(), //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  return fmt;
};

import { UserOutlined } from "@ant-design/icons";
import "../../../themes/iconfont/iconfont.css";
import { Layout, Space, Collapse, Drawer, Menu, message } from "antd";
const { Header, Content } = Layout;
import PropTypes from "prop-types";
import React from "react";
import MapBoxMap from "./MapBoxGL/map";
import {ROADMapStyle } from "./MapBoxGL/mapstyle";
import SideBar from "../modules/SideBar/panel";
import {
  ResourceCatalog,
  SpatialQuery,
  SpatialResultList,
  POISearch,
  POIList,
  LayerSwitch,
  StatisticAnalysis
} from "../../../../lib/onemap-components-dev";

import ToolBar from "../modules/ToolBar/toolbar";
import SpayialAnalysis from "../modules/SpatialAnalysis/analysis";
import axios from "axios";
import "../../../../lib/onemap-components-dev.css";
import "../components/MapBoxGL/assest/mapiconfont/iconfont.css";

class mapApp extends React.Component {
  static propTypes = {
    mapConfig: PropTypes.object,
    map: PropTypes.object,
    layers: PropTypes.object,
    step: PropTypes.number,
    mapStateSource: PropTypes.string,
    currentZoom: PropTypes.number,
    changeZoomLevel: PropTypes.func,
    mapOnClick: PropTypes.func,
    showsidebar: PropTypes.bool,
    drawStatus: PropTypes.string,
    drawOwner: PropTypes.string,
    drawMethod: PropTypes.string,
    features: PropTypes.array,
    query: PropTypes.object,
  };

  static defaultProps = {
    step: 1,
    currentZoom: 3,
    showsidebar: false,
    drawStatus: null,
    drawOwner: null,
    drawMethod: null,
    features: [],
    changeZoomLevel: () => {},
    style: {
      radius: 5,
      color: "blue",
      weight: 1,
      opacity: 1,
      fillOpacity: 0,
    },
    arealocationstyle: {
      dashArray: "6",
      radius: 5,
      color: "red",
      weight: 2,
      opacity: 0.4,
      fillOpacity: 0.2,
      fillColor: "#1890ff",
    },
  };

  state = {
    model3d: "mapbox",
    StreetViewVisible: false,
    drawervisible: false,
    locationshow: false,
    showcatalog: false,
    resize: 0,
  };

  showDrawer = (drawervisible) => {
    const { resultcollapsed } = this.props.query;
    if (resultcollapsed) {
      this.props.queryActions.resetQuery();
    } else {
      this.setState({ drawervisible });
    }
  };

  onClose = () => {
    this.setState({ drawervisible: false });
  };

  getServiceList = () => {
    const {thematicActions,mapBoxActions}=this.props;
    return axios
      .get(mapConfigJson.serverurl + "/datacatalog/tree")
      .then((response) => {
        let renderlist = response.data.result;

        thematicActions.loadThematicsList(renderlist);

        mapBoxActions.addSources(
          renderlist.filter((e) => e.servicetype === "map")
        );
        mapBoxActions.addLayers(
          renderlist.filter((e) => e.servicetype === "map")
        );
      })
      .catch((e) => {});
  };

  componentDidMount() {
    const {mapBoxActions,configActions}=this.props;
    mapBoxActions.loadStyle(ROADMapStyle);
    configActions.configureMap(mapConfigJson);
    this.getServiceList();
    const ele = document.getElementById("loading");
    ele.style.display = "none";
  }

  onDisMeasure = () => {
    message.info("双击结束测量");
    this.props.drawActions.changeDrawingStatus(
      "start",
      "polyline",
      "measure",
      [],
      {}
    );
  };

  onAreaMeasure = () => {
    message.info("双击结束测量");
    this.props.drawActions.changeDrawingStatus(
      "start",
      "polygon",
      "measure",
      [],
      {}
    );
  };

  onLocClose = () => {
    this.setState({ locationshow: false });
  };
  onToggleLayer = (item) => {
    this.props.layersActions.updateLayer(item.id, {
      layout: { visibility: item.show ? "visible" : "none" },
    });
  };

  handleSpatialQuery = () => {
    this.props.thematicActions.showSpatialQuery(true);
    this.props.thematicActions.showSpatialAnalysis(false);
  };

  handleStatistic = () => {
    this.props.thematicActions.showSpatialQuery(false);
    this.props.thematicActions.showSpatialAnalysis(true);
  };

  handleCatalog = () => {
    this.setState({ showcatalog: true });
  };
  onCloseCatalog = () => {
    this.setState({ showcatalog: false });
  };

  onCloseSearch = () => {
    this.props.queryActions.resetQuery();
  };

  render() {
    const {
      mapConfig,
      map3d,
      query,
      thematics,
      statistics,
      toolbar,
      analysis,
      draw,
      thematicActions,
      statisticsActions,
      queryActions,
      layersActions,
      mapBoxActions,
      drawActions,
    } = this.props;
    if (mapConfig && map3d) {
      return (
        <Layout>
          <Header className="customLayerHeader">
            <div className="mapheader">
              <Menu mode="horizontal">
                <Menu.Item key="1" onClick={this.handleCatalog}>
                  <i className="iconfont icon-yingxiangditu"></i>资源目录
                </Menu.Item>
                <Menu.Item key="2" onClick={this.handleSpatialQuery}>
                  <i className="iconfont icon-dituchaxun"></i>空间查询
                </Menu.Item>
                <Menu.Item key="3" onClick={this.handleStatistic}>
                  <i className="iconfont icon-fanganguanli"></i>项目辅助分析
                </Menu.Item>
              </Menu>
              <Space style={{ float: "right" }}></Space>
            </div>
            <div className="logo-bk"></div>
            <div className="logo-label">如皋生态功能区空间信息管理系统</div>
          </Header>
          <Content>
            <MapBoxMap
              query={query}
              map3d={map3d}
              thematics={thematics}
              toolbar={toolbar}
              mapConfig={mapConfig}
              draw={draw}
              analysis={analysis}
              thematicActions={thematicActions}
              queryActions={queryActions}
              layersActions={layersActions}
              mapBoxActions={mapBoxActions}
              drawActions={drawActions}
            />
            <LayerSwitch  mapBoxActions={mapBoxActions}></LayerSwitch>
            {thematics.themresult ? (
              <SpatialResultList
                thematics={thematics}
                thematicActions={thematicActions}
              ></SpatialResultList>
            ) : this.state.showcatalog ? (
              <ResourceCatalog
                sideprops={{
                  title: "资源目录",
                  placement: "left",
                  visible: true,
                  onClose: this.onCloseCatalog,
                }}
                thematics={thematics}
                thematicActions={thematicActions}
                mapBoxActions={mapBoxActions}
              ></ResourceCatalog>
            ) : null}
            <StatisticAnalysis
             thematics={thematics}
             statistics={statistics}
             statisticsActions={statisticsActions}
            sideprops={{
              title: "统计分析",
              placement: "left",
              className:"statics_panel",
              visible: true,
            }}
            ></StatisticAnalysis>
            <ToolBar
              map3d={map3d}
              mapConfig={mapConfig}
              drawActions={drawActions}
              thematicActions={thematicActions}
              mapBoxActions={mapBoxActions}
            ></ToolBar>
            <SpayialAnalysis></SpayialAnalysis>
            <SpatialQuery
              thematics={thematics}
              draw={draw}
              drawActions={drawActions}
              thematicActions={thematicActions}
            ></SpatialQuery>
            <POISearch  query={query} queryActions={queryActions}></POISearch>
            {query.result && (
              <SideBar
                className="sidebar_containtcard queryresult_drawer"
                title="查询结果"
                onClose={this.onCloseSearch}
              >
                <POIList
                query={query}
                queryActions={queryActions}
                mapBoxActions={mapBoxActions}
                ></POIList>
              </SideBar>
            )}
          </Content>
        </Layout>
      );
    }
    return null;
  }
}

export default mapApp;
