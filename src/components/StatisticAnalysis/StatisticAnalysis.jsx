import React, { Component } from "react";
import SideBar from "../SideBar/SideBar";
import QueryBuilder from "../QueryBuilder/QueryBuilder";
import ChartVisual from "./ChartVisual";
import ExportJsonExcel  from 'js-export-excel'
import { Button, Table, Radio, Space, Popconfirm, message } from "antd";
import axios from "axios";

export default class StatisticAnalysis extends Component {
  state = {
    queryparams: { source: null, grouplist: [] },
    geoshow: true,
    currid: null,
    title: "",
    visualType: "table",
    groupAreavalue: "country",
    groupAreaFieldvalue: "",
    fielddatas: [],
  };

  
  onQuery = () => {
    const {
      source,
      callist,
      filterlist,
      grouplist,
      orderfields,
      filterfea,
    } = this.state.queryparams;
    const outStatistics = callist.map((cal) => {
      return {
        statisticType: cal.sel_cal.value,
        onStatisticField: cal.sel_field.name,
        outStatisticFieldName:
          cal.sel_cal.title === "数量"
            ? cal.sel_cal.title
            : cal.sel_field.alias + "的" + cal.sel_cal.title,
      };
    });
    const wheres = filterlist.map((cal) => {
      let filter = "";
      switch (cal.sel_filter_rel.value) {
        case "equal":
          filter = cal.sel_filter_field + " = '" + cal.sel_filter_value + "' ";
          break;
        case "notequal":
          filter = cal.sel_filter_field + " != '" + cal.sel_filter_value + "' ";
          break;
        case "contain":
          filter =
            cal.sel_filter_field + " like '%" + cal.sel_filter_value + "%' ";
          break;
        default:
          break;
      }
      return filter;
    });

    const groupfield = grouplist.map((e) => e.sel_group_field).join(",");

    return axios
      .get(source.url + "/" + source.layerid + "/query", {
        params: {
          where: wheres.length > 0 ? wheres.join(" and ") : "1=1",
          outFields: "*",
          returnGeometry: true,
          returnIdsOnly: false,
          returnCountOnly: false,
          outSr: 4326,
          outFields: "*",
          inSr: 4326,
          geometry: filterfea ? filterfea.geom : "",
          geometryType: "esriGeometryPolygon",
          spatialRel: "esriSpatialRelContains",
          orderByFields: orderfields.join(","),
          groupByFieldsForStatistics: groupfield,
          outStatistics:
            outStatistics.length > 0 ? JSON.stringify(outStatistics) : "",
          f: "pjson",
        },
      })
      .then((response) => {
        if (!response.data.error) {
          this.props.statisticsActions.loadStatisticData(response.data);
        }
      })
      .catch((e) => {});
  };


  onChartConfigChange = (params) => {
    this.setState({ chartconfig: params });
  };

  onVisualChange = (e) => {
    this.setState({
      visualType: e.target.value,
    });
  };


  onQueryChange = (query) => {
    if (!query.source) return;
    if (
      !this.state.queryparams.source ||
      query.source.id !== this.state.queryparams.source.id
    ) {
      this.getFields(query.source);
    }
    this.setState({ queryparams: query });
  };

  getFields = (item) => {
    return axios
      .get(item.url + "/" + item.layerid + "?f=json")
      .then((response) => {
        this.setState({ fielddatas: response.data.fields });
      })
      .catch((e) => {});
  };

  downloadData=(columns,data)=>{
    const {title} = this.props;
    var option={};
    option.fileName =title||'excel';
    option.datas=[
      {
        sheetData:data,
        sheetName:'sheet',
        sheetFilter:columns.map(e=>e.title),
        sheetHeader:columns.map(e=>e.title)
      }
    ];
    var toExcel = new ExportJsonExcel(option); 
    toExcel.saveExcel();
  }

  render() {
    const { themlist } = this.props.thematics;
    const { visualType } = this.state;
    const sourcedata =
      themlist.length > 0
        ? themlist.map((e) => {
            e.pId = e.pid;
            e.title = e.name;
            e.value = e.name;
            e.layerid = e.layers;
            e.selectable = e.pid === 1 ? false : true;
            return e;
          })
        : [];
    const { statisticlist } = this.props.statistics;
    const columns = statisticlist.fields
      .filter(
        (e) =>
          e.name != "OBJECTID" && e.name.toUpperCase().indexOf("SHAPE") == -1
      )
      .map((field) => {
        return {
          title: field.alias,
          dataIndex: field.name,
          width: _.max([
            field.alias.replace(/[^\x00-\xff]/g, "01").length * 20,
            130,
          ]),
          key: field.name, //field.type  length
          render: (text) =>
            field.type === "esriFieldTypeDouble"
              ? Number.isNaN(Number(text))
                ? 0
                : Number.isInteger(text)
                ? text
                : Number(text).toFixed(3)
              : text,
        };
      });

    const data = statisticlist.features.map((fea) => {
      return fea.attributes;
    });
    return (
      <SideBar {...this.props.sideprops}>
        <QueryBuilder
          config={this.state.queryparams}
          sourcedata={sourcedata}
          fielddatas={this.state.fielddatas}
          onChange={this.onQueryChange}
        ></QueryBuilder>
         <Space style={{margin:'10px'}}>
         <Button
          disabled={this.state.queryparams.source ? false : true}
          className="QueryBtn"
          onClick={this.onQuery}
          type="primary"
        >
          获取数据
        </Button>
        <Radio.Group defaultValue="table" buttonStyle="solid" onChange={this.onVisualChange}>
          <Radio.Button value="table">表格</Radio.Button>
          <Radio.Button value="chart">统计图</Radio.Button>
        </Radio.Group>
        {visualType === "table"?<Button   onClick={()=>this.downloadData(columns,data)}>下载</Button>:null}
         </Space>
        
        {visualType === "table" ? (<Table
            className="querytable"
            columns={columns}
            dataSource={data}
            scroll={{ x: columns.length * 100, y: "calc(100vh - 490px)" }}
          />
          
        ):visualType === "chart" ? (
          <ChartVisual
            model="edit"
            onChange={this.onChartConfigChange}
            config={this.state.chartconfig}
            data={data}
            fields={statisticlist.fields}
          ></ChartVisual>
        ) : null}
      </SideBar>
    );
  }
}
