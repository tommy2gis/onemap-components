/*
 * @Author: 史涛
 * @Date: 2019-01-05 17:40:59
 * @Last Modified by: 史涛
 * @Last Modified time: 2020-12-19 18:02:05
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
import { Layout, Space, Button, Drawer, Menu, message } from "antd";
const { Header, Content } = Layout;
import PropTypes from "prop-types";
import React from "react";
import MapBoxMap from "./MapBoxGL/map";
import { defaultMapStyle, ROADMapStyle } from "./MapBoxGL/mapstyle";
import { createFromIconfontCN } from "@ant-design/icons";
import LayerSwitch from "../modules/LayerSwitch/layerswitch";
import SideBar from "../modules/SideBar/panel";
import ThematicList from "../modules/ThematicList/List";
import ThematicCatalog from "../modules/ThematicList/catalog";
import ResultList from "../modules/SpatialQuery/resultlist";
import ToolBar from "../modules/ToolBar/toolbar";
import SpatialQuery from "../modules/SpatialQuery/toolbar";
import SpayialAnalysis from "../modules/SpatialAnalysis/analysis";
import Search from "../modules/Search/index";
import SearchList from "../modules/Search/resultlist";
import axios from "axios";
const MapIcon = createFromIconfontCN({
  scriptUrl: "mapiconfont/iconfont.js", // 在 iconfont.cn 上生成
});

import "../components/MapBoxGL/assest/mapiconfont/iconfont.css";

class mapApp extends React.Component {
  static propTypes = {
    // redux store slice with map configuration (bound through connect to store at the end of the file)
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
    showcatalog:false,
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
    return axios
      .get(mapConfigJson.serverurl + "/datacatalog/tree")
      .then((response) => {
        let renderlist = response.data.result;

        this.props.thematicActions.loadThematicsList(renderlist);

        this.props.mapBoxActions.addSources(
          renderlist.filter((e) => e.servicetype === "map")
        );
        this.props.mapBoxActions.addLayers(renderlist.filter((e) => e.servicetype === "map"));
      })
      .catch((e) => {});
  };

  componentDidMount() {
    this.props.mapBoxActions.loadStyle(ROADMapStyle);
    this.props.configActions.configureMap(mapConfigJson);
    this.getServiceList();
    const ele = document.getElementById("loading");
    ele.style.display = "none";
  }

  onDisMeasure = () => {
    message.info("双击结束测量");
    this.props.drawActions.changeDrawingStatus("start", "polyline", "measure", [], {});
  };

  onAreaMeasure = () => {
    message.info("双击结束测量");
    this.props.drawActions.changeDrawingStatus("start", "polygon", "measure", [], {});
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

  handleCatalog= () => {
    this.setState({showcatalog:true})
  };
  onCloseCatalog= () => {
    this.setState({showcatalog:false})
  };

  onCloseSearch= () => {
    this.props.queryActions.resetQuery()
  };

  render() {
    const { mapConfig, map3d, query, thematics } = this.props;
    if (mapConfig && map3d) {
      return (
        <Layout>
          <Header>
            <div className="mapheader">
              <Menu mode="horizontal" >
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
            query={this.props.query}
            map3d={this.props.map3d}
            thematics={this.props.thematics}
            toolbar={this.props.toolbar}
            mapConfig={this.props.mapConfig}
            draw={this.props.draw}
            analysis={this.props.analysis}
            thematicActions={this.props.thematicActions}
            queryActions={this.props.queryActions}
            layersActions={this.props.layersActions}
            mapBoxActions={this.props.mapBoxActions}
            drawActions={this.props.drawActions}
             />
            <LayerSwitch></LayerSwitch>
            {thematics.themresult ? (
              <ResultList></ResultList>
            ) :this.state.showcatalog? (
              <ThematicCatalog onClose={this.onCloseCatalog}
              thematics={this.props.thematics}
              thematicActions={this.props.thematicActions}
              mapBoxActions={this.props.mapBoxActions}
              ></ThematicCatalog>
            ):null}
            <ToolBar map3d={this.props.map3d}
            mapConfig={this.props.mapConfig}
            mapBoxActions={this.props.mapBoxActions}></ToolBar>
            <SpayialAnalysis></SpayialAnalysis>
            <SpatialQuery></SpatialQuery>
            <Search></Search>
            {query.result&&<SideBar className="sidebar_containtcard queryresult_drawer" title="查询结果" onClose={this.onCloseSearch}>
            <SearchList></SearchList>
            </SideBar>
            }
          </Content>
        </Layout>
      );
    }
    return null;
  }
}

export default mapApp;
