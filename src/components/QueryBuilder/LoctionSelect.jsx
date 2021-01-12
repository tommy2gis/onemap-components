import React, { Component } from "react";
import { Select, Radio } from "antd";
import axios from "axios";
import qs from "qs";
import simplify from '@turf/simplify';
import {
  geojsonToArcGIS,
  arcgisToGeoJSON,
} from "@esri/arcgis-to-geojson-utils";
const { Option } = Select;

let timeout;
let currentValue;

function fetch(value, field, id, callback) {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  currentValue = value;

  function fake() {
    axios
      .post(
        `${mapConfigJson.mapserverurl}/${id}/query`,
        qs.stringify({
          returnGeometry: true,
          where: ` ${field} like '%${value}%'`,
          outSr: 4326,
          outFields: "*",
          inSr: 4326,
          geometry: "",
          geometryType: "",
          spatialRel: "esriSpatialRelIntersects",
          f: "pjson",
        })
      )
      .then((response) => {
        if (currentValue === value) {
          const { features } = response.data;
          const data = [];
          features.forEach((fea,index) => {
            data.push({
              value: index,
              text: fea.attributes[field],
              geom: fea.geometry,
            });
          });
          callback(data);
        }
      })
      .catch((e) => {
        // message.warning('数据查询失败,请稍后再试');
        // dispatch(queryError(e));
      });
  }

  timeout = setTimeout(fake, 300);
}

export default class LoctionSelect extends Component {
  state = {
    data: [],
    value: undefined,
    areatype: "区划",
  };

  handleSearch = (value) => {
    const field =
      this.state.areatype === "区划"
        ? "行政区"
        : this.state.areatype === "街道"
        ? "T_BOUNDARY"
        : "名称";
    const layerid =
      this.state.areatype === "区划"
        ? 5
        : this.state.areatype === "街道"
        ? 3
        : 1;
    if (value) {
      this.setState({loading:true});
      fetch(value, field, layerid, (data) => this.setState({ data,loading:false}));
    } else {
      this.setState({ data: [] });
    }
  };

  onSelect = (value, option) => {
    const selectfea = this.state.data.filter((e,index) => index === Number(value))[0];
    const geojson=arcgisToGeoJSON(selectfea.geom);
    const geom=simplify(geojson,  {tolerance: 0.0005, highQuality: false});
    selectfea.geom=geojsonToArcGIS(geom);
    this.props.featureSelected(selectfea);
  };

  handleChange = (value) => {
    this.setState({ value });
  };

  onAreaTypeChange = (e) => {
    this.setState({ areatype: e.target.value, data: [],value:null});
  };

  render() {
    const options = this.state.data.map((d) => (
      <Option key={d.value}>{d.text}</Option>
    ));
    return (
      <div style={{ margin: 10, textAlign: "center" }}>
        <Radio.Group
          value={this.state.areatype}
          onChange={this.onAreaTypeChange}
          buttonStyle="solid"
        >
          <Radio.Button value="区划">区划</Radio.Button>
          <Radio.Button value="街道">街道</Radio.Button>
          <Radio.Button value="社区">社区</Radio.Button>
        </Radio.Group>
        <br></br>
        <Select
          showSearch
          style={{ width: "200px", padding: 10 }}
          value={this.state.value}
          defaultActiveFirstOption={false}
          placeholder={`输入关键字查询选择${this.state.areatype}`}
          showArrow={false}
          filterOption={false}
          onSearch={this.handleSearch}
          onChange={this.handleChange}
          onSelect={(value) => this.onSelect(value)}
          notFoundContent={null}
          loading={this.state.loading}
        >
          {options}
        </Select>
      </div>
    );
  }
}
