import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Card,
  Button,
  Upload,
  Divider,
  message,
  Checkbox,
  InputNumber,
  Space,
  Result,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { getAnalysisList, setBufferList, setIntersectList,clearList } from "./actions";
import {zoomToPoint3D} from '../../components/MapBoxGL/actions'
import {
  showSpatialAnalysis
} from "../ThematicList/actions";
import { changeDrawingStatus } from "../../actions/draw";
import {
  geojsonToArcGIS,
  arcgisToGeoJSON,
} from "@esri/arcgis-to-geojson-utils";
import Buffer from "@turf/buffer";
import Intersect from "@turf/intersect";
import Center from "@turf/center";
import hbdatas from "./hbdata";
import "./style.less";
const { Dragger } = Upload;
import axios from "axios";

class analysis extends Component {
  state = { bufferdistance: 0 };
  onCheckBuffer = (e) => {
    this.setState({ bufferdistance: e.target.checked ? 1 : 0 });
    this.setBufferGeometries(1);
  };

  onBufferChange = (value) => {
    this.setState({ bufferdistance: value });
    this.setBufferGeometries(value);
  };

  setBufferGeometries = (distance) => {
    const { analysislist } = this.props.analysis;
    const bufferlist = analysislist.map((fea) => {
      return Buffer(fea.geometry, distance / 1000);
    });
    this.props.setBufferList(bufferlist);
  };

  onPanelClose=()=>{
    this.props.showSpatialAnalysis(false);
    this.props.clearList();
    this.setState({ bufferdistance: 0 });
  }

  saveToPng=()=>{
    this.props.changeDrawingStatus("print", "", "toolbar", [], {});
  }

  onAnalisys = () => {
    const { bufferlist, analysislist } = this.props.analysis;
    const fealist = this.state.bufferdistance ? bufferlist : analysislist;
    let intersects = [];
    fealist.forEach((fea) => {
      hbdatas.features.forEach((hbfea) => {
        const intersect = Intersect(fea.geometry, hbfea.geometry);
        if (intersect){
          intersect.properties=hbfea.properties;
          intersects.push(intersect);
        } 
      });
    });
    if(intersects.length>0){
      var center=Center({
        type: "FeatureCollection",
        features: intersects,
      })
      this.props.zoomToPoint3D({ x: center.geometry.coordinates[0], y: center.geometry.coordinates[1] },12);
    }
    
    this.props.setIntersectList(intersects);
  };
  handleCadToJson = (filename) => {
    axios
      .get(mapConfigJson.cadtojsonserver, {
        params: {
          type: "cad",
          dwg: mapConfigJson.cadpath + filename,
          layerTypes: "Point;Polyline;Polygon;Annotation", //Polygon//Point//Polyline
        },
      })
      .then((response) => {
        if (response.statusText === "OK") {
          console.log(response.data);
          const geolist = response.data["Polygon"].map((data) => {
            let geojson = arcgisToGeoJSON(data);
            geojson.properties = data.attribute;
            return geojson;
          });
          var center=Center({
            type: "FeatureCollection",
            features: geolist,
          })
          this.props.zoomToPoint3D({ x: center.geometry.coordinates[0], y: center.geometry.coordinates[1] },12);
          this.props.getAnalysisList(geolist, "Polygon");
        }
      })
      .catch((e) => {});
  };
  render() {
    const props = {
      // beforeUpload: (file) => {
      //   this.handleFile(file);
      //   return false;
      // },
      action: mapConfigJson.serverurl + "/file/upload",
      data: { type: "cad" },
      showUploadList: false,
      onChange: (data) => {
        console.log(data);
        if (data.file.response) {
          const { msg, result } = data.file.response;
          message.info(msg);
          this.handleCadToJson(result.fileSaveName);
        }
      },
    };
    const { spatialAnaysisShow } = this.props.thematics;
    const { bufferdistance } = this.state;
    const { intersectlist } = this.props.analysis;
    return (
      spatialAnaysisShow && (
        <Card className="spatial_analysis_card" bordered={false}>
          <Divider orientation="left">上传项目范围</Divider>
          <Space direction="vertical" style={{ width: "100%" }}>
            <Dragger {...props}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">将文件拖到此处，或点击上传</p>
              <p className="ant-upload-hint">支持DWG文件</p>
            </Dragger>
            <div>
              <Checkbox onChange={(e) => this.onCheckBuffer(e)}>
                {" "}
                缓冲区{" "}
              </Checkbox>
              <InputNumber
                min={1}
                value={bufferdistance}
                onChange={(e) => this.onBufferChange(e)}
              />{" "}
              米
            </div>
            <div>
            <Button
              onClick={this.onPanelClose}
              style={{ float: "right", right: 20, top: 5 }}
            >
              关闭
            </Button>
            <Button
              onClick={this.onAnalisys}
              style={{ float: "right", right: 30, top: 5 }}
              type="primary"
            >
              分析
            </Button>

           
            </div>
            
          </Space>
          {intersectlist && <Divider orientation="left">分析结果</Divider>}
          {intersectlist ? (
            intersectlist.length > 0 ? (
              <Result
                status="warning"
                title="有冲突"
                subTitle={`与${intersectlist.map(e=>e.properties['名称']).join(",")}有冲突，项目范围不符合管控要求`}
                extra={[
                  <Button type="primary" key="console" onClick={this.saveToPng}>
                    导出地图
                  </Button>,
                ]}
              />
            ) : (
              <Result
                status="success"
                title="无冲突"
                subTitle="未与生态红线及生态空间管控区域有冲突，项目范围符合管控要求"
                extra={[
                  <Button type="primary" key="console"onClick={this.saveToPng}>
                    导出地图
                  </Button>,
                ]}
              />
            )
          ) : null}
        </Card>
      )
    );
  }
}

export default connect(
  (state) => {
    return {
      draw: state.draw,
      map: state.map,
      thematics: state.thematics,
      analysis: state.analysis,
    };
  },
  {
    getAnalysisList,
    setBufferList,
    setIntersectList,
    showSpatialAnalysis,
    changeDrawingStatus,
    zoomToPoint3D,
    clearList
  }
)(analysis);
