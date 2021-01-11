/*
 * @Author: 史涛
 * @Date: 2020-02-14 16:57:11
 * @Last Modified by: 史涛
 * @Last Modified time: 2021-01-11 16:48:28
 */
import ReactMapboxGl, {
  Layer,
  Cluster,
  GeoJSONLayer,
  Feature,
  Popup,
  Marker,
  ScaleControl,
  ZoomControl,
  RotationControl,
} from "@shitao1988/swsk-react-mapbox-gl";
import DrawRectangle from "mapbox-gl-draw-rectangle-mode";
import DrawControl from "@shitao1988/swsk-react-mapbox-gl-draw";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import {
  Menu,
  Space,
  Icon,
  Dropdown,
  Image
} from "antd";
import { MarkerPin, SmallPin } from "./markerpin";
import React, { PureComponent } from "react";
import turfarea from "@turf/area";
import turflength from "@turf/length";
import turfbuffer from "@turf/buffer";
import pointOnFeature from "@turf/point-on-feature";
import customdrawtheme from "./drawtheme";
import _ from "lodash";
import {
  geojsonToArcGIS,
  arcgisToGeoJSON,
} from "@esri/arcgis-to-geojson-utils";
import "./style.less";

const Map = ReactMapboxGl({
  isIntScrollZoom: true,
  preserveDrawingBuffer: true, //允许保存图片
  crs: "EPSG:4490",
  maxZoom: 17,
  minZoom: 10,
});


const NewSimpleSelect = _.extend(MapboxDraw.modes.simple_select, {
  dragMove() {},
});

const NewDirectSelect = _.extend(MapboxDraw.modes.direct_select, {
  dragFeature() {},
});

const modes = MapboxDraw.modes;
modes.draw_rectangle = DrawRectangle;
modes.simple_select = NewSimpleSelect;
modes.direct_select = NewDirectSelect;

class MapBoxMap extends PureComponent {
  constructor(props) {
    super(props);
    this.DrawControl = React.createRef();
  }

  state = {
    menushow: false,
    buildingInfo: null,
    buildinglngLat: null,
    imagevisible: false,
    images: [],
    menupoint: { x: 0, y: 0 },
  };

  componentDidMount() {
    const { latitude, longitude, zoom, maxZoom, minZoom, bearing, pitch } = this
      .props.map3d.zoom
      ? this.props.map3d
      : this.props.mapConfig.map3d.viewport;
    this.props.mapBoxActions.changeMap3DView(
      latitude,
      longitude,
      zoom,
      maxZoom || 19,
      minZoom || 10,
      bearing,
      pitch,
      0
    );
  }

  /**
   *右键菜单点击
   *
   * @param {*} e
   */
  handleMenuClick = (e) => {
    const { menulnglat } = this.state;
    switch (e.key) {
      case "3":
        break;
      case "4":
        break;
      case "5":
        this.props.mapBoxActions.zoomToPoint3D(
          { x: menulnglat.lng, y: menulnglat.lat },
          this.props.map3d.zoom
        );
        break;
      case "6":
        this.props.drawActions.changeDrawingStatus("clean", "", "measure", [], {});
        break;
      default:
        break;
    }

    this.setState({
      menushow: false,
    });
  };

  /**
   *显示右键菜单
   *
   * @param {*} map
   * @param {*} evt
   */
  _showContextMenu = (map, evt) => {
    if (this.state.rotateend) return;
    evt.preventDefault();
    this.setState({
      menulnglat: evt.lngLat,
      menupoint: evt.point,
      menushow: true,
    });
  };

  /**
   *隐藏右键菜单
   *
   * @param {*} map
   * @param {*} evt
   */
  _hideContextMenu = (map, evt) => {
    this.setState({
      menulnglat: evt.lngLat,
      menupoint: evt.point,
      menushow: false,
    });
  };

  onMouseUp = (map, evt) => {
    this.setState({
      rotateend: false,
    });
  };

  clearSelectFeatures = () => {
    this.props.thematicActions.setSelectedFeature(null);
    this.props.thematicActions.identifyThematicResponces(null);
  };

  /**
   *地图点击
   *
   * @param {*} map
   * @param {*} event
   */
  onMapClick = (map, evt) => {
    if (this.props.query.selecteditem) {
      this.props.queryActions.setSelectPOIItem(null);
    }
    if (this.props.thematics.selectedfeature) {
      this.props.thematicActions.setSelectedFeature(null);
    }

    const { drawOwner, drawStatus } = this.props.draw;
    const selectedThematic = this.props.thematics.themlist.filter(
      (e) => e.visibility
    );
    this.clearSelectFeatures();
    if (drawStatus != "start"&&selectedThematic.length>0) {
      const { _sw, _ne } = this.props.map3d.bounds;
      const bounds = [_sw.lng, _sw.lat, _ne.lng, _ne.lat];
      const { clientWidth, clientHeight } = this._map._container;
      this.props.thematicActions.identifyThematic({
        url: mapConfigJson.mapserverurl + "/identify",
        params: {
          sr: 4326,
          tolerance: 6,
          returnGeometry: true,
          layers: "visible:" + selectedThematic.map((e) => e.layers).join(","),
          // imageDisplay: "256,256,96",
          imageDisplay: [clientWidth, clientHeight, 96].join(","),
          //  mapExtent: '120.24330699221053,31.478403907142713,120.57272518072843,31.568869454484517',
          mapExtent: bounds.join(","),
          geometry: JSON.stringify({
            x: evt.lngLat.lng,
            y: evt.lngLat.lat,
            spatialReference: { wkid: 4326 },
          }),
          geometryType: "esriGeometryPoint",
          f: "json",
        },
      });
    }
  };

  closeBuildingPopup = () => {};

  onStyleLoad = (map) => {
    this._map = map;
    let bounds = this._map.getBounds();
    this.props.mapBoxActions.updateBounds(bounds);
  };

  /**
   *监听mapview
   *
   * @param {*} map
   */
  mapviewchange = (map, evt) => {
    if (evt.type === "rotateend") {
      this.setState({
        rotateend: true,
      });
    }

    this.props.mapBoxActions.changeMap3DView(
      map.getCenter().lat,
      map.getCenter().lng,
      map.getZoom(),
      map.getMaxZoom || 19,
      map.getMinZoom || 10,
      map.getBearing(),
      map.getPitch(),
      0
    );
  };

  /**
   *渲染气泡框
   *
   * @returns
   * @memberof MapBoxMap
   */
  _renderPopup() {
    const { selecteditem } = this.props.query;

    return (
      selecteditem && (
        <Popup
          coordinates={[
            Number(selecteditem.lonlat.split(" ")[0]),
            Number(selecteditem.lonlat.split(" ")[1]),
          ]}
          offset={{
            bottom: [0, -8],
          }}
        >
          <div class="title">
            <b>{selecteditem.name}</b>
          </div>
          <div class="content">
            <p> 名称: {selecteditem.name}</p>
            <p> 地址: {selecteditem.address}</p>
            <p> 电话: {selecteditem.phone}</p>
          </div>
        </Popup>
      )
    );
  }

  printMap() {
    var url = this._map.getCanvas().toDataURL("image/png");
    var a = document.createElement("a");
    var event = new MouseEvent("click");
    a.download = "map";
    a.href = url;
    a.dispatchEvent(event);
  }

  _updateMapPositionFromNewProps = (newProps) => {
    // current implementation will update the map only if the movement
    // between 12 decimals in the reference system to avoid rounded value
    // changes due to float mathematics operations.
    const isNearlyEqual = function (a, b) {
      if (a === undefined || b === undefined) {
        return false;
      }
      return a.toFixed(10) - b.toFixed(10) === 0;
    };

    // getting all centers we need to check
    const newCenter = newProps.map3d.center;
    const currentCenter = this.props.map3d.center;
    const mapCenter = this._map.getCenter();
    // checking if the current props are the same
    const propsCentersEqual =
      isNearlyEqual(newCenter[0], currentCenter[0]) &&
      isNearlyEqual(newCenter[1], currentCenter[1]);
    // if props are the same nothing to do, otherwise
    // we need to check if the new center is equal to map center
    const centerIsNotUpdated =
      propsCentersEqual ||
      (isNearlyEqual(newCenter[0], mapCenter[0]) &&
        isNearlyEqual(newCenter[1], mapCenter[1]));
    let bounds = this._map.getBounds();

    if (!centerIsNotUpdated) this.props.mapBoxActions.updateBounds(bounds);
    // getting all zoom values we need to check
    const newZoom = newProps.map3d.zoom;
    const currentZoom = this.props.map3d.zoom;
    const mapZoom = this._map.getZoom();
    // checking if the current props are the same
    const propsZoomEqual = newZoom === currentZoom;
    // if props are the same nothing to do, otherwise
    // we need to check if the new zoom is equal to map zoom
    const zoomIsNotUpdated = propsZoomEqual || newZoom === mapZoom;

    if (!centerIsNotUpdated || !zoomIsNotUpdated) {
      let bounds = this._map.getBounds();
      this.props.mapBoxActions.updateBounds(bounds);
    }

    //中心点坐标和缩放级别同时修改
    if (!centerIsNotUpdated && !zoomIsNotUpdated && newZoom) {
      this._map.flyTo({ center: newProps.map3d.center, zoom: newZoom });
    }
  };

  /**
   *渲染专题要素信息
   *
   * @param {*} feas
   * @returns
   * @memberof MapBoxMap
   */
  renderThematicContent(feas, fields) {
    let list = [];
    let ignoreattr = ["FID","Id", "OBJECTID", "Shape"];

    for (const key in feas) {
      let has = false;
      ignoreattr.forEach((sttr) => {
        if (key.indexOf(sttr) > -1) {
          has = true;
        }
      });
      if (has) continue;

      switch (key) {
        case "LEIBIE":
          list.push(<p>类别: {feas[key] ? feas[key] : "空"}</p>);
          break;
        case "NUM":
          list.push(<p>数量: {feas[key] ? feas[key] : "空"}</p>);
          break;
        default:
          list.push(
            <p>
              {fields ? fields[key] : key}: {feas[key] ? feas[key] : "空"}
            </p>
          );
          break;
      }
    }
    return list;
  }

  /**
   *渲染专题数据气泡框
   *
   * @returns
   * @memberof MapBoxMap
   */
  _renderIdentifyPopup() {
    const { identifyresult, selectedfeature } = this.props.thematics;
    if (!identifyresult || selectedfeature) return;
    let jsonfeas = arcgisToGeoJSON(identifyresult[0]);
    const point = pointOnFeature(jsonfeas).geometry.coordinates;
    return (
      <Popup
        coordinates={[Number(point[0]), Number(point[1])]}
        offset={{
          bottom: [0, -8],
        }}
      >
        <div className="title">
          {jsonfeas.properties[identifyresult[0].displayFieldName]}
          <Icon
            style={{ float: "right", marginTop: 8 }}
            onClick={this.clearSelectFeatures}
            type="close"
          />
        </div>
        <div className="content">
        <Space>
        <div>
          {this.renderThematicContent(
            jsonfeas.attributes || jsonfeas.properties,
            jsonfeas.attributes ? themresult.fieldAliases : null
          )}
          </div>
         
          {jsonfeas.properties['界桩刻号']?<Image
              width={200}
              height={200}
              src={`images/红线桩图片/${jsonfeas.properties['界桩刻号']}.png`}
              fallback="data:image/png;base64,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"
            />:jsonfeas.properties['现场图片']?<Image
            width={200}
            height={200}
            src={`images/告示牌图片/${jsonfeas.properties['现场图片']}.png`}
            fallback="data:image/png;base64,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"
          />:null}

        </Space>
          
        </div>
      </Popup>
    );
  }

  renderIdentifyContent = () => {
    const { identifyresult, selectedfeature } = this.props.thematics;
    if (identifyresult && !selectedfeature) {
      let jsonfeas = arcgisToGeoJSON(identifyresult[0]);
      let layeroptions;
      switch (identifyresult[0].geometryType) {
        case "esriGeometryPolygon":
          layeroptions = {
            // fillOnClick: this.onGeojsonLayerClick,
            fillPaint: { "fill-color": "#DCEAF0", "fill-opacity": 0.6 },
            linePaint: { "line-color": "#1890ff", "line-width": 4 },
            circlePaint: {
              "circle-radius": 10,
              "circle-color": "#E54E52",
              "circle-opacity": 0,
            },
          };
          break;
        case "esriGeometryPoint":
          layeroptions = {
            //   circleOnClick: this.onGeojsonLayerClick,
            fillPaint: { "fill-color": "#DCEAF0", "fill-opacity": 0 },
            linePaint: { "line-color": "#1890ff", "line-opacity": 0 },
            circlePaint: {
              "circle-radius": 10,
              "circle-color": "#E54E52",
              "circle-opacity": 0.8,
            },
          };
          break;
        case "esriGeometryPolyline":
          layeroptions = {
            //  lineOnClick: this.onGeojsonLayerClick,
            fillPaint: { "fill-color": "#DCEAF0", "fill-opacity": 0 },
            linePaint: { "line-color": "#1890ff", "line-width": 4 },
            circlePaint: {
              "circle-radius": 5,
              "circle-color": "#E54E52",
              "circle-opacity": 0,
            },
          };
          break;
        default:
          break;
      }
      let data = {
        type: "FeatureCollection",
        features: [jsonfeas],
      };
      return <GeoJSONLayer {...layeroptions} data={data}></GeoJSONLayer>;
    }
    return null;
  };

  /**
   *渲染查询结果
   *
   * @returns
   */
  renderQueryAllContent = () => {
    if (this.props.query.resultall) {
      const list = _.differenceBy(
        this.props.query.resultall,
        this.props.query.result,
        "hotPointID"
      );
      return list.map((item, index) => {
        return (
          <Marker
            key={`mainmarker-${index}`}
            coordinates={[
              Number(item.lonlat.split(" ")[0]),
              Number(item.lonlat.split(" ")[1]),
            ]}
          >
            <SmallPin
              size={10}
              color={"#ff4d4f"}
              title={item.name}
              onClick={() => this.props.queryActions.setSelectPOIItem(item)}
            />
          </Marker>
        );
      });
    }
    return null;
  };

  /**
   *渲染专题空间查询结果
   *
   * @returns
   */
  renderThematicBufferContent = () => {
    const { querygeometry, bufferdistance } = this.props.thematics;
    if (querygeometry && bufferdistance) {
      const geojsongeom = arcgisToGeoJSON(JSON.parse(querygeometry));
      let layeroptions = {
        fillPaint: { "fill-color": "#6157cc", "fill-opacity": 0.3 },
        linePaint: { "line-color": "#1890ff", "line-opacity": 0 },
        circlePaint: {
          "circle-radius": 10,
          "circle-color": "#E54E52",
          "circle-opacity": 0,
        },
      };
      return <GeoJSONLayer {...layeroptions} data={geojsongeom}></GeoJSONLayer>;
    }
    return null;
  };

  /**
   *渲染专题数据气泡框
   *
   * @returns
   * @memberof MapBoxMap
   */
  _renderThematicPopup() {
    const { selectedfeature } = this.props.thematics;
    const point =
      selectedfeature && pointOnFeature(selectedfeature).geometry.coordinates;
    return (
      selectedfeature && (
        <Popup
          coordinates={[Number(point[0]), Number(point[1])]}
          offset={{
            bottom: [0, -8],
          }}
        >
          <div className="title">
            <Icon
              style={{ float: "right", marginTop: 8 }}
              onClick={this.clearSelectFeatures}
              type="close"
            />
          </div>
          <div className="content">
            {this.renderThematicContent(
              selectedfeature.attributes || selectedfeature.properties,
              selectedfeature.attributes ? themresult.fieldAliases : null
            )}
          </div>
        </Popup>
      )
    );
  }

  renderAnalysisBufferContent = () => {
    const { bufferlist } = this.props.analysis;
    if (bufferlist) {
      const layeroptions = {
        fillOnClick: this.onGeojsonLayerClick,
        fillPaint: { "fill-color": "#f0dfdc", "fill-opacity": 0.6 },
        linePaint: { "line-color": "#2ecc71", "line-width": 4 },
        circlePaint: {
          "circle-radius": 10,
          "circle-color": "#E54E52",
          "circle-opacity": 0,
        },
      };
      let data = {
        type: "FeatureCollection",
        features: bufferlist,
      };
      return <GeoJSONLayer {...layeroptions} data={data}></GeoJSONLayer>;
    }
    return null;
  };

  renderIntersectContent = () => {
    const { intersectlist } = this.props.analysis;
    if (intersectlist) {
      const layeroptions = {
        fillOnClick: this.onGeojsonLayerClick,
        fillPaint: { "fill-color": "#DCEAF0", "fill-opacity": 0.6 },
        linePaint: { "line-color": "#ff4b18", "line-width": 4 },
        circlePaint: {
          "circle-radius": 10,
          "circle-color": "#E54E52",
          "circle-opacity": 0,
        },
      };

      const symboloptions = {
        symbolLayout: {
          "text-field": "冲突区域",
          "text-font": ["Microsoft YaHei Regular"],
          "text-size": 14,
          "symbol-placement": "point",
          "text-anchor": "center",
          "text-justify": "center",
          "text-keep-upright": false,
          "symbol-z-order": "auto",
          "text-max-width": 10,
          "symbol-spacing": 250,
        },
        symbolPaint: {
          "text-color": "rgba(199, 33, 33, 1)",
          "text-halo-color": "rgba(246, 203, 178, 1)",
          "text-halo-width": 1
        },
      };
      let data = {
        type: "FeatureCollection",
        features: intersectlist,
      };
      return [
        <GeoJSONLayer {...layeroptions} data={data}></GeoJSONLayer>,
        <GeoJSONLayer {...symboloptions} data={data}></GeoJSONLayer>,
      ];
    }
    return null;
  };

  renderAnalysisContent = () => {
    const { analysislist, geotype } = this.props.analysis;
    if (analysislist) {
      let layeroptions;
      switch (geotype) {
        case "Polygon":
          layeroptions = {
            fillOnClick: this.onGeojsonLayerClick,
            fillPaint: { "fill-color": "#DCEAF0", "fill-opacity": 0.6 },
            linePaint: { "line-color": "#1890ff", "line-width": 4 },
            circlePaint: {
              "circle-radius": 10,
              "circle-color": "#E54E52",
              "circle-opacity": 0,
            },
          };
          break;
        case "Point":
          layeroptions = {
            circleOnClick: this.onGeojsonLayerClick,
            fillPaint: { "fill-color": "#DCEAF0", "fill-opacity": 0 },
            linePaint: { "line-color": "#1890ff", "line-opacity": 0 },
            circlePaint: {
              "circle-radius": 4,
              "circle-color": "#E54E52",
              "circle-opacity": 1,
            },
          };
          break;
        case "Polyline":
          layeroptions = {
            lineOnClick: this.onGeojsonLayerClick,
            fillPaint: { "fill-color": "#DCEAF0", "fill-opacity": 0 },
            linePaint: { "line-color": "#1890ff", "line-width": 4 },
            circlePaint: {
              "circle-radius": 5,
              "circle-color": "#E54E52",
              "circle-opacity": 0,
            },
          };
          break;
        default:
          break;
      }
      let data = {
        type: "FeatureCollection",
        features: analysislist,
      };
      return <GeoJSONLayer {...layeroptions} data={data}></GeoJSONLayer>;
    }
    return null;
  };

  /**
   *渲染专题空间查询结果
   *
   * @returns
   */
  renderThematicQueryContent = () => {
    const { themresult, selectedType, typecolors } = this.props.thematics;
    let circlecolor = ["match", ["get", "子类型"]];
    for (const key in typecolors) {
      circlecolor.push(key);
      circlecolor.push(typecolors[key]);
    }
    circlecolor.push("#1890ff");
    if (themresult) {
      let jsonfeas = [];
      themresult.features.forEach((fea) => {
        jsonfeas.push(arcgisToGeoJSON(fea));
      });
      let layeroptions;
      switch (themresult.geometryType) {
        case "esriGeometryPolygon":
          layeroptions = {
            fillOnClick: this.onGeojsonLayerClick,
            fillPaint: { "fill-color": "#DCEAF0", "fill-opacity": 0.6 },
            linePaint: { "line-color": "#1890ff", "line-width": 4 },
            circlePaint: {
              "circle-radius": 10,
              "circle-color": "#E54E52",
              "circle-opacity": 0,
            },
          };
          break;
        case "esriGeometryPoint":
          layeroptions = {
            circleOnClick: this.onGeojsonLayerClick,
            fillPaint: { "fill-color": "#DCEAF0", "fill-opacity": 0 },
            linePaint: { "line-color": "#1890ff", "line-opacity": 0 },
            circlePaint: {
              "circle-radius": 10,
              "circle-color": "#E54E52",
              "circle-opacity": 1,
            },
          };
          break;
        case "esriGeometryPolyline":
          layeroptions = {
            lineOnClick: this.onGeojsonLayerClick,
            fillPaint: { "fill-color": "#DCEAF0", "fill-opacity": 0 },
            linePaint: { "line-color": "#1890ff", "line-width": 4 },
            circlePaint: {
              "circle-radius": 5,
              "circle-color": "#E54E52",
              "circle-opacity": 0,
            },
          };
          break;
        default:
          break;
      }
      let data = {
        type: "FeatureCollection",
        features: jsonfeas,
      };
      return <GeoJSONLayer {...layeroptions} data={data}></GeoJSONLayer>;
    }
    return null;
  };

  /**
   *渲染查询结果
   *
   * @returns
   */
  renderQueryContent = () => {
    if (this.props.query.result) {
      return this.props.query.result.map((item, index) => {
        return (
          <Marker
            key={`mainmarker-${index}`}
            coordinates={[
              Number(item.lonlat.split(" ")[0]),
              Number(item.lonlat.split(" ")[1]),
            ]}
            anchor="bottom"
            title={item.name}
          >
            <MarkerPin
              size={30}
              text={index + 1}
              title={item.name}
              hover={this.props.query.hoverid == item.hotPointID ? true : false}
              onClick={() => this.props.queryActions.setSelectPOIItem(item)}
            />
          </Marker>
        );
      });
    }
    return null;
  };

  renderMeasureContent = () => {
    const { drawStatus, drawOwner, geometry } = this.props.draw;
    let contents = [];
    if (geometry && drawStatus !== "clean" && drawOwner == "measure") {
      contents.push(this.renderMeasureTitle(geometry));
      contents.push(this.renderMeasureFeature(geometry));
      return contents;
    }
    return null;
  };

  renderMeasureFeature(geometry) {
    return (
      <GeoJSONLayer
        data={geometry}
        lineLayout={{ "line-join": "round", "line-cap": "round" }}
        linePaint={{ "line-color": "#FF0000", "line-width": 2 }}
      ></GeoJSONLayer>
    );
  }

  /**
   *绘制要素
   *
   * @param {*} e
   */
  onDrawCreate = (e) => {
    const { drawOwner, drawMethod } = this.props.draw;
    const { querylayerid, bufferdistance } = this.props.thematics;
    let feature = e.features[0];
    this.props.drawActions.endDrawing(feature, drawOwner);
    this.props.drawActions.changeDrawingStatus("stop", "", drawOwner, [], {});
    if (drawOwner === "spatial") {
      if (!querylayerid) return;
      let geometry = bufferdistance
        ? turfbuffer(feature.geometry, bufferdistance / 1000).geometry
        : feature.geometry;
      const arcgisgeo = geojsonToArcGIS(geometry);
      const selectedThematic = this.props.thematics.themlist.filter(
        (e) => querylayerid === e.id
      );

      if (selectedThematic.length > 0) {
        switch (drawMethod) {
          case "point":
            this.props.thematicActions.queryThematic(
              selectedThematic[0].url,
              selectedThematic[0].layers,
              JSON.stringify(arcgisgeo),
              bufferdistance ? "esriGeometryPolygon" : "esriGeometryPoint"
            );
            break;
          case "polygon":
          case "rectangle":
            this.props.thematicActions.queryThematic(
              selectedThematic[0].url,
              selectedThematic[0].layers,
              JSON.stringify(arcgisgeo),
              "esriGeometryPolygon"
            );
            break;
          case "polyline":
            this.props.thematicActions.queryThematic(
              selectedThematic[0].url,
              selectedThematic[0].layers,
              JSON.stringify(arcgisgeo),
              bufferdistance ? "esriGeometryPolygon" : "esriGeometryPolyline"
            );
            break;
          default:
            break;
        }
      }
    } else if (drawOwner === "measure") {
      this.props.drawActions.endDrawing(feature, drawOwner);
      this.drawControl.draw.deleteAll();
    }
  };

  renderMeasureTitle(geometry) {
    if (geometry.type == "Polygon") {
      const polygonArea = turfarea(geometry);
      const point = pointOnFeature(geometry).geometry.coordinates;
      return (
        <Marker
          key={`measurePolygonMarker`}
          title={polygonArea}
          coordinates={[point[0], point[1]]}
        >
          <div className="measureresultlabel">
            {polygonArea.toFixed(2)}平方米
          </div>
        </Marker>
      );
    } else {
      const polylinelength = turflength(geometry) * 1000;
      const point = geometry.coordinates[geometry.coordinates.length - 1];
      return (
        <Marker
          key={`measureLengthMarker`}
          title={polylinelength}
          coordinates={[point[0], point[1]]}
        >
          <div className="measureresultlabel">
            {polylinelength.toFixed(2)}米
          </div>
        </Marker>
      );
    }
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    if (this._map) {
      this._updateMapPositionFromNewProps(newProps);
    }

    // if (this._map&&newProps.map3d.outletfilter&&this.props.map3d.outletfilter !== newProps.map3d.outletfilter) {
    //   var features = this._map.querySourceFeatures('paikou', {
    //     sourceLayer: 'hedao',
    //     filter:["in", "name"].concat(newProps.map3d.outletfilter)
    //     });
    //   console.log(features);
    //   if(features[0]){
    //     const point = pointOnFeature(features[0].geometry).geometry.coordinates;
    //     this._map.flyTo({ center: point, zoom: 15 });
    //   }

    // }

    if (
      (newProps.draw &&
        this.props.draw.drawStatus !== newProps.draw.drawStatus) ||
      this.props.draw.drawMethod !== newProps.draw.drawMethod
    ) {
      if (!this.drawControl) return;
      switch (newProps.draw.drawStatus) {
        case "create":
          break;
        case "start":
          switch (newProps.draw.drawMethod) {
            case "polygon":
              this.drawControl.draw.changeMode("draw_polygon");
              break;
            case "polyline":
              this.drawControl.draw.changeMode("draw_line_string");
              break;
            case "point":
              this.drawControl.draw.changeMode("draw_point");
              break;
            case "rectangle":
              this.drawControl.draw.changeMode("draw_rectangle");
              break;
            default:
              break;
          }
          break;
        case "drawOrEdit":
          break;
        case "addfeature":
          newProps.draw.features.forEach((fea, index) => {
            this.drawControl.draw.add(fea);
          });

          break;
        case "stop":
          this.drawControl.draw.changeMode("simple_select");

          break;
        case "replace":
          break;
        case "clean":
          this.drawControl.draw.deleteAll();
          break;
        case "endDrawing":
          break;
        case "print":
          this.printMap();
          break;
        default:
          return;
      }
    }
  }

  render() {
    const { mapstyle, center, zoom, bearing, pitch } = this.props.map3d;
    const outleylayer = mapstyle.layers.find(
      (e) => e.id === "outlet_江北入河排污口"
    );
    //右键菜单
    const menu = (
      <Menu onClick={this.handleMenuClick} className="mapcontentmenu">
        {/* <Menu.Item key="3">
          <span className=" iconfont icon-24xanywhere blue-6" />
          这是哪儿
        </Menu.Item> */}
        <Menu.Item key="5">
          <span className=" iconfont icon-location1 blue-6" />
          设为地图中心
        </Menu.Item>
        <Menu.Item key="6">
          <span className=" iconfont icon-qingchu blue-6" />
          清除
        </Menu.Item>
      </Menu>
    );

    if (center) {
      return (
        <div>
          <Map
            {...this.props.map3d}
            zoom={[zoom]}
            maxZoom={19.5}
            id="mapboxgl-canvas"
            onDragEnd={this.mapviewchange}
            onZoomEnd={this.mapviewchange}
            onRotateEnd={this.mapviewchange}
            onMouseUp={this.onMouseUp}
            center={center}
            style={mapstyle}
            onClick={this.onMapClick}
            onStyleLoad={this.onStyleLoad}
            onMouseDown={this._hideContextMenu}
            // onContextMenu={this._showContextMenu}
            containerStyle={{
              height: "100vh",
            }}
          >
            {this._renderPopup()}
            {this.renderThematicQueryContent()}
            {this.renderAnalysisContent()}
            {this.renderAnalysisBufferContent()}
            {this.renderIntersectContent()}
            {this.renderThematicBufferContent()}
            {this._renderThematicPopup()}
            {this.renderQueryAllContent()}
            {this.renderQueryContent()}
            {this.renderIdentifyContent()}
            {this._renderIdentifyPopup()}
            {this.renderMeasureContent()}
            <ScaleControl
              className="MapboxGLScaleControl"
              position="bottom-left"
            ></ScaleControl>
            <ZoomControl
              className="MapboxGLZoomControl"
              position="bottom-right"
            ></ZoomControl>
            <RotationControl
              className="MapboxGLRotationControl"
              position="bottom-right"
            ></RotationControl>

            <DrawControl
              className="MapboxGLDrawControl"
              modes={modes}
              ref={(drawControl) => {
                if (!this.drawControl) {
                  console.log(drawControl);
                  this.drawControl = drawControl;
                  this.props.drawActions.drawEnable(true);
                }
              }}
              styles={customdrawtheme}
              onDrawCreate={this.onDrawCreate}
              onDrawUpdate={this.onDrawUpdate}
              displayControlsDefault={false}
            />
          </Map>
          <div
            id="menudiv"
            style={{
              left: this.state.menupoint.x,
              top: this.state.menupoint.y,
              position: "absolute",
              visibility: this.state.menushow ? "visible" : "hidden",
            }}
          >
            {this.state.menushow && (
              <Dropdown
                getPopupContainer={() => document.getElementById("menudiv")}
                visible={true}
                overlay={menu}
              >
                <a className="ant-dropdown-link" href="#" />
              </Dropdown>
            )}
          </div>
        </div>
      );
    }
    return null;
  }
}

export default MapBoxMap;
