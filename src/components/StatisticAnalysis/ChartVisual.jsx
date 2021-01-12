import React, { Component } from "react";
import {downloadImage} from '../../utils/helpfunctions'
import {
  Row,
  Col,
  Collapse,
  Radio,
  Table,
  Switch,
  Input,
  Button,
} from "antd";
import { CaretRightOutlined,LineChartOutlined,PieChartOutlined,BarChartOutlined } from '@ant-design/icons';
import { Resizable} from "re-resizable";
const { Panel } = Collapse;
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util,
} from "bizcharts";
import DataSet from "@antv/data-set";

import "./style.less";

const customPanelStyle = {
  background: "#EEE",
  borderRadius: 4,
  marginBottom: 14,
  marginRight: 10,
  border: 0,
  overflow: "hidden",
};
const styles = {
  mainTitle: {
    fontSize: 20,
    color: "black",
    textAlign: "center",
  },
  subTitle: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
  },
};

export default class ChartVisual extends Component {
  state = {
    axisstr: "",
    chartIns: null,
    axisnum: "",
    charttype: "bar",
    mainTitle: "标题",
    showmaintitle: true,
    subTitle: "副标题",
    showsubtitle: true,
    chartwidth:600,
    chartheight:400
  };

  changeDataType = (type) => {
    let typestr = "";
    switch (type) {
      case "esriFieldTypeInteger":
      case "esriFieldTypeDouble":
        typestr = "数值";
        break;
      case "esriFieldTypeString":
        typestr = "字符串";
        break;
      case "esriFieldTypeDate":
        typestr = "日期";
        break;

      default:
        break;
    }
    return typestr;
  };
  componentDidMount() {
    this.setState(this.props.config);
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    if (newProps.config !== this.props.config) {
      this.setState(newProps.config);
    }
  }
  saveImage = () => {
    const chartIns = this.state.chartIns;
    downloadImage({
      chart: chartIns,
      name: this.state.mainTitle || "图表",
      subtitle: this.state.subTitle || "",
      width: this.state.chartwidth,
      height: this.state.chartheight,
    });
  };

  

  Update() {
    const {
      charttype,
      axisstr,
      axisnum,
      mainTitle,
      subTitle,
      showmaintitle,
      showsubtitle,
      chartwidth,
      chartheight
    } = this.state;
    this.props.onChange&&this.props.onChange({
      charttype,
      axisstr,
      axisnum,
      mainTitle,
      subTitle,
      showmaintitle,
      showsubtitle,
      chartwidth,
      chartheight
    });
  }

  onShowMainTitleChange = (checked) => {
    this.setState({ showmaintitle: checked }, this.Update);
  };

  onShowSubTitleChange = (checked) => {
    this.setState({ showsubtitle: checked }, this.Update);
  };

  onMainTitleChange = (e) => {
    const { value } = e.target;
    this.setState({ mainTitle: value }, this.Update);
  };

  onSubTitleChange = (e) => {
    const { value } = e.target;
    this.setState({ subTitle: value }, this.Update);
  };

  renderTitle = () => {
    const { mainTitle, subTitle, showmaintitle, showsubtitle } = this.state;
    return [
       (
        <h3 className="main-title" style={styles.mainTitle}>
          {showmaintitle?mainTitle:""}
        </h3>
      ) ,
      (
        <h4 className="sub-title" style={styles.subTitle}>
          {showsubtitle ? subTitle:""}
        </h4>
      )
    ];
  };

  onChartChange = (e) => {
    this.setState(
      {
        charttype: e.target.value,
      },
      this.Update
    );
  };
  render() {
    const { data, fields ,model} = this.props;
    const { charttype,chartwidth,chartheight} = this.state;
    const cols = {
      sales: {
        tickInterval: 20,
      },
    };
    const { DataView } = DataSet;
    const piedv = new DataView();
    piedv.source(data).transform({
      type: "percent",
      field: this.state.axisnum,
      dimension: this.state.axisstr,
      as: "percent",
    });
    const piecols = {
      percent: {
        formatter: (val) => {
          val = val * 100 + "%";
          return val;
        },
      },
    };

    const columns = [
      {
        title: "全部",
        dataIndex: "name",
        render: (text) => <a>{text}</a>,
      },
      {
        title: "字段类型",
        dataIndex: "type",
        render: (text) => <a>{this.changeDataType(text)}</a>,
      },
    ];

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        const axisstrs = selectedRows.filter(
          (e) => e.type === "esriFieldTypeString"
        );
        const axisnums = selectedRows.filter(
          (e) =>
            e.type == "esriFieldTypeDouble" || e.type == "esriFieldTypeInteger"
        );
        if (axisstrs.length == 0) {
          return;
        }
        if (axisnums.length == 0) {
          return;
        }
        this.setState({ axisstr: axisstrs[0].name }, this.Update);
        this.setState({ axisnum: axisnums[0].name }, this.Update);
      },
      getCheckboxProps: (record) => ({
        name: record.name,
      }),
    };

    const chartoptions = {
      onGetG2Instance: (chartIns) => {
        this.setState({
          chartIns: chartIns,
        });
      },
      className: "chart_div",
      height: chartheight-100,
      width: chartwidth,
      data: charttype === "pie" ? piedv : data,
      padding:[ '10%', '20%', '20%', '10%'],
      scale: charttype === "pie" ? piecols : cols,
    };
    const show =model==="show";
    return (
      <div className="chartvisual">
        <Row
          style={{
            height: show ? "100%" : "calc(100vh - 380px)",
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          <Col
            span={show ? 24 : 18}
            push={show ? 0 : 6}
            className={show?"chartshow":"chartedit"}
          >
           <Resizable
              style={{  display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "solid 1px #ddd",
              background: "#FFF"}}
              className="chartresizable"
              onResizeStop={(e, direction, ref, d) => {
                this.setState({
                  chartwidth: chartwidth + d.width,
                  chartheight: chartheight + d.height,
                },this.Update);
              }}
              size={{ width: chartwidth, height: chartheight }}
            >
              {charttype === "pie" ? (
                <Chart {...chartoptions}>
                  {this.renderTitle()}
                  <Coord type="theta" />
                  <Axis name="percent" />
                  <Legend position="right"  offsetX={-chartwidth/8} />
                  <Tooltip
                    showTitle={false}
                    itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
                  />
                  <Geom
                    type="intervalStack"
                    position="percent"
                    color={this.state.axisstr}
                    tooltip={[
                      this.state.axisstr + "*percent",
                      (item, percent) => {
                        percent = (percent * 100).toFixed(2) || 0 + "%";
                        return {
                          name: item,
                          value: percent,
                        };
                      },
                    ]}
                    style={{
                      lineWidth: 1,
                      stroke: "#fff",
                    }}
                  ></Geom>
                </Chart>
              ) : null}
              {charttype === "bar" ? (
                <Chart {...chartoptions}>
                  {this.renderTitle()}
                  <Axis name={this.state.axisstr} />
                  <Axis name={this.state.axisnum} />
                  <Tooltip />
                  <Geom
                    type="interval"
                    position={`${this.state.axisstr}*${this.state.axisnum}`}
                  />
                </Chart>
              ) : null}
              {charttype === "line" ? (
                <Chart {...chartoptions}>
                  {this.renderTitle()}
                  <Axis name={this.state.axisstr} />
                  <Axis name={this.state.axisnum} />
                  <Tooltip />
                  <Geom
                    type="line"
                    position={`${this.state.axisstr}*${this.state.axisnum}`}
                    size={2}
                    color="type"
                  />
                  ,
                  <Geom
                    type="point"
                    position={`${this.state.axisstr}*${this.state.axisnum}`}
                    size={4}
                    shape={"circle"}
                    style={{ stroke: "#fff", lineWidth: 1 }}
                  />
                </Chart>
              ) : null}
            </Resizable>
          </Col>
          <Col span={show ? 0 : 6} pull={18}>
            <Collapse
              bordered={false}
              defaultActiveKey={["1"]}
              expandIcon={({ isActive }) => (
                <CaretRightOutlined rotate={isActive ? 90 : 0}/>
              )}
            >
              <Radio.Group
                onChange={this.onChartChange}
                style={{ padding: 10 }}
                defaultValue="bar"
                buttonStyle="solid"
              >
                <Radio.Button value="bar">
                  <BarChartOutlined />
                </Radio.Button>
                <Radio.Button value="pie">
                  <PieChartOutlined />
                </Radio.Button>
                <Radio.Button value="line">
                  <LineChartOutlined />
                </Radio.Button>
              </Radio.Group>
              <Panel header="选择字段" key="1" style={customPanelStyle}>
                <Table
                  style={{ backgroundColor: "#fff" }}
                  pagination={false}
                  size="small"
                  bordered={false}
                  scroll={{ y: 140 }}
                  rowSelection={rowSelection}
                  columns={columns}
                  dataSource={fields.filter(
                    (e) =>
                      e.type == "esriFieldTypeDate" ||
                      e.type == "esriFieldTypeString" ||
                      e.type == "esriFieldTypeDouble" ||
                      e.type == "esriFieldTypeInteger"
                  )}
                />
              </Panel>
              <Panel header="画布" key="2" style={customPanelStyle}>
                <p>
                  标题:{" "}
                  <Switch
                    size="small"
                    defaultChecked
                    onChange={this.onShowMainTitleChange}
                  />
                  <Input
                    style={{ width: 200, margin: "0px 10px" }}
                    onChange={this.onMainTitleChange}
                  />
                </p>
                <p>
                  副标题:{" "}
                  <Switch
                    size="small"
                    defaultChecked
                    onChange={this.onShowSubTitleChange}
                  />
                  <Input
                    style={{ width: 200, margin: "0px 10px" }}
                    onChange={this.onSubTitleChange}
                  />
                </p>
              </Panel>
            </Collapse>
            <Button
              className="QueryBtn"
              onClick={this.saveImage}
              type="primary"
            >
              保存为图片
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}
