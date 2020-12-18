/*
 * @Author: 史涛 
 * @Date: 2020-04-14 09:27:22 
 * @Last Modified by: 史涛
 * @Last Modified time: 2020-11-18 14:02:49
 */
import React, { Component } from "react";
import {
  Popover,
  Tag,
  Button,
  Select,
  Input,
  List,
  InputNumber
} from "antd";
import { PlusOutlined,LeftOutlined } from '@ant-design/icons';
const assign = require("object-assign");

export default class AttributesFillter extends Component {
  state = {
    filterlistshow: true,
    sel_filter_list: [],
    sel_filter_field: "",
    sel_filter_value: null,
    sel_filter_rel: { value: "equal", children: "等于" },
    sel_data_title: ""
  };

  /**
   *渲染筛选标签
   *
   * @memberof AttributesFillter
   */
  _renderFilterTags = () => {
    return this.state.sel_filter_list.map((filter, index) => {
      return (
        <Tag
          key={index}
          color="#9cc177"
          closable
          onClose={() => this.filterDelete(index)}
        >
          {filter.sel_filter_field} {filter.sel_filter_rel.children}{" "}
          {filter.sel_filter_value}
        </Tag>
      );
    });
  };

  filterValueChange = value => {
    this.setState({ sel_filter_value: value });
  };

  /**
   *移除筛选项
   *
   * @memberof AttributesFillter
   */
  filterDelete = i => {
    let oldstate = assign({}, this.state);
    let sel_filter_list = oldstate.sel_filter_list.filter(
      (e, index) => index !== i
    );
    this.setState(
      {
        sel_filter_list: sel_filter_list
      },
      this.Update
    );
  };

  /**
   *选择筛选属性
   *
   * @memberof AttributesFillter
   */
  onSelectFilterField = item => {
    this.setState({
      sel_filter_field: item.name,
      sel_filter_field_type: item.type,
      filterlistshow: false
    });
  };

  /**
   *添加筛选条件
   *
   * @memberof AttributesFillter
   */
  onAddFilter = () => {
    let oldstate = assign({}, this.state);
    oldstate.sel_filter_list.push({
      sel_filter_field:oldstate.sel_filter_field,
      sel_filter_field_type:oldstate.sel_filter_field_type,
      sel_filter_rel:oldstate.sel_filter_rel,
      sel_filter_value:oldstate.sel_filter_value
    });
    this.setState({
      sel_filter_field:null,
      sel_filter_field_type:null,
      sel_filter_rel:{ value: "equal", children: "等于" },
      sel_filter_value:null,
      filterlistshow:true,
      sel_filter_list: oldstate.sel_filter_list
    },this.Update);
  };

  /**
   *注册更新
   *
   * @memberof AttributesFillter
   */
  Update() {
    const {sel_filter_list}=this.state;
    this.props.onChange({
      filterlist: sel_filter_list,
    });
  }

  render() {
    const {
      filterlistshow,
      sel_filter_list,
      sel_filter_field,
      sel_filter_field_type,
      sel_filter_rel
    } = this.state;
    return (
      <div className="attr_filter">
        {this._renderFilterTags()}
        {sel_filter_list.length === 0 && (
          <span className="itemlabel" style={{ color: "#9cc177" }}>
            添加筛选条件
          </span>
        )}
        <Popover
          placement="bottom"
          overlayClassName="querybuilder_popover"
          title={
            filterlistshow ? (
              ""
            ) : (
              <div>
                <a
                  style={{ margin: "0 2px 0 -10px" }}
                  onClick={() => {
                    this.setState({
                      filterlistshow: true
                    });
                  }}
                >
                  <LeftOutlined />
                </a>
                {sel_filter_field}
                {sel_filter_field_type === "esriFieldTypeString" ? (
                  <Select
                    defaultValue="equal"
                    onChange={(value, option) => {
                      this.setState({ sel_filter_rel: option.props });
                    }}
                    style={{ width: 100 }}
                  >
                    <Select.Option value="equal">等于</Select.Option>
                    <Select.Option value="notequal">不等于</Select.Option>
                    <Select.Option value="contain">包含</Select.Option>
                  </Select>
                ) : (
                  <Select
                    defaultValue="equal"
                    onChange={(value, option) => {
                      this.setState({ sel_filter_rel: option.props });
                    }}
                    style={{ width: 100 }}
                  >
                    <Select.Option value="equal">等于</Select.Option>
                    <Select.Option value="notequal">不等于</Select.Option>
                    <Select.Option value="bigger">大于</Select.Option>
                    <Select.Option value="smaller">小于</Select.Option>
                    <Select.Option value="between">介于之间</Select.Option>
                    <Select.Option value="null">为空</Select.Option>
                    <Select.Option value="notnull">不为空</Select.Option>
                  </Select>
                )}
              </div>
            )
          }
          content={
            filterlistshow ? (
              <List
                className="field_listitem"
                itemLayout="horizontal"
                split={false}
                dataSource={this.props.fieldTypes?this.props.fieldTypes.filter(
                  e => e.type === "esriFieldTypeString"
                ):[]}
                renderItem={item => (
                  <List.Item onClick={() => this.onSelectFilterField(item)}>
                    <List.Item.Meta
                      avatar={
                        <Tag color="rgb(156, 193, 119)">
                          <i
                            className={`iconfont ${
                              item.type === "esriFieldTypeString" ? "icon-Abc1" : "icon-number"
                            }`}
                          />
                        </Tag>
                      }
                      title={<a>{item.alias}</a>}
                    />
                  </List.Item>
                )}
              />
            ) : (
              <div>
                {sel_filter_field_type === "esriFieldTypeString" ? (
                  <Input
                    style={{ width: "100%" }}
                    size="large"
                    onChange={e => this.filterValueChange(e.target.value)}
                    placeholder="输入值"
                  />
                ) : sel_filter_rel.value === "between" ? (
                  <Input.Group compact>
                    <InputNumber
                      style={{ width: "auto", textAlign: "center" }}
                      placeholder="最小值"
                    />
                    <Input
                      style={{
                        width: 30,
                        borderLeft: 0,
                        pointerEvents: "none",
                        backgroundColor: "#fff"
                      }}
                      placeholder="~"
                      disabled
                    />
                    <InputNumber
                      style={{
                        width: "auto",
                        textAlign: "center",
                        borderLeft: 0
                      }}
                      placeholder="最大值"
                    />
                  </Input.Group>
                ) : sel_filter_rel.value === "null" ||
                  sel_filter_rel.value === "notnull" ? null : (
                  <InputNumber
                    style={{ width: "100%" }}
                    onChange={this.filterValueChange}
                  />
                )}

                <Button onClick={this.onAddFilter} type="primary">
                  添加筛选
                </Button>
              </div>
            )
          }
          trigger="click"
        >
          <Button icon={<PlusOutlined />} />
        </Popover>
      </div>
    );
  }
}
