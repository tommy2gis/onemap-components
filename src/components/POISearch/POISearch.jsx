import React, { Component } from "react";
import { Input, Select, AutoComplete } from "antd";
import { SearchOutlined } from "@ant-design/icons";
const { Option } = Select;
import "./style.less";

class POISearch extends Component {
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
    this.props.queryActions.simpleQuery(value);
  };

  /**
   *
   *
   * @param {*} e
   */
  handleSubmit = (e) => {
    if (e.trim().length > 0) {
      this.props.queryActions.query();
    }
  };

  /**
   *
   *
   * @param {*} e
   */
  handleSelect = (e) => {
    const text = e.trim().split(",")[0];
    this.props.queryActions.query(text);
  };


  /**
   *
   *
   * @param {*} e
   */
  handleChange = (e) => {
    let text = e ? e.trim().split(",")[0] : "";
    this.props.queryActions.changeQueryKey(text, "name");
  };

  clearKeys = () => {
    this.props.queryActions.clearSimpleResult();
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
            onFocus={() => this.props.queryActions.queryOnFocus(true)}
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

export default POISearch;
