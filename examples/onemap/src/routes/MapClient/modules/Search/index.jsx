import React, { Component } from "react";
import { connect } from "react-redux";
import { Input, Select, AutoComplete } from "antd";
import { SearchOutlined } from "@ant-design/icons";
const { Option } = Select;
import {
  query,
  resetQuery,
  queryOnFocus,
  changeQueryKey,
  clearSimpleResult,
  simpleQuery,
} from "../../actions/query";
import "./style.less";

class index extends Component {
  state = {
    result: [],
    text: this.props.query.key || "",
    searchtype:'loc'
  };

  /**
   *
   *
   * @param {*} value
   */
  handleSearch = (value) => {
    this.props.simpleQuery(value);
  };

  /**
   *
   *
   * @param {*} e
   */
  handleSubmit = (e) => {
    if (e.trim().length > 0) {
      this.props.onQuery();
    }
  };

  /**
   *
   *
   * @param {*} e
   */
  handleSelect = (e) => {
    const text = e.trim().split(",")[0];
    this.props.onQuery(text);
  };


  /**
   *
   *
   * @param {*} e
   */
  handleChange = (e) => {
    let text = e ? e.trim().split(",")[0] : "";
    this.props.changeQueryKey(text, "name");
  };

  clearKeys = () => {
    this.props.clearSimpleResult();
  };
  handleTypeChange=(searchtype)=>{
   this.setState({searchtype})
  }

  render() {
    const { simpleresult } = this.props.query;
    function renderOption(item) {
      return (
        <Option key={item.gbCode} value={item.name + "," + item.gbCode}>
          <SearchOutlined />
          {item.name}
          {item.duplicate && (
            <span className="search-item-class">
              {item.midbclass + " " + item.district}
            </span>
          )}
        </Option>
      );
    }
    return (
      <div>
       <AutoComplete
            className="search_auto"
            defaultActiveFirstOption={false}
            dropdownClassName="search_auto_dropdown"
            onFocus={() => this.props.queryOnFocus(true)}
            onSearch={this.handleSearch}
            onChange={this.handleChange}
            onSelect={this.handleSelect}
            value={this.props.query.key}
            dataSource={simpleresult ? simpleresult.map(renderOption) : []}
          >
            <Input.Search
              placeholder="请输入关键字"
              value={this.props.query.key}
              onSearch={this.handleSubmit}
            />
          </AutoComplete>
      </div>
    );
  }
}

export default connect(
  (state) => {
    return { query: state.query, sidebar: state.sidebar };
  },
  {
    onQuery: query,
    simpleQuery,
    resetQuery,
    queryOnFocus,
    changeQueryKey,
    clearSimpleResult
  }
)(index);
