import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Collapse, Table } from "antd";
import "./style.less";

const ResourcesList = (props) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  /**
   *渲染服务二级列表
   *
   * @memberof List
   */
  const renderServiceList = (list) => {
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        setSelectedRowKeys(selectedRowKeys.map(Number));
      },
      selectedRowKeys,
      onSelect: (record, selected, selectedRows, nativeEvent) => {
        props.onSelect(record, selected);
      },
    };

    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        render: (text) => <a>{text}</a>,
      },
    ];
    return (
      <Table
        bordered={false}
        pagination={false}
        rowKey="id"
        showHeader={false}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={list}
      />
    );
  };
  /**
   *渲染服务一级列表
   *
   * @memberof List
   */
  const renderList = () => {
    const { list } = props;
    const rootlist = list.filter((e) => e.pid === 1);
    let rootrenderlist = [];
    rootlist.forEach((item) => {
      let sublist = list.filter((e) => e.pid == item.id);
      let num = sublist.length;
      rootrenderlist.push(
        <Collapse.Panel
          header={<div>{item.name + " (" + num + ")"}</div>}
          key={item.id}
        >
          {num > 0 ? renderServiceList(sublist) : null}
        </Collapse.Panel>
      );
    });

    return (
      <Collapse expandIconPosition="right" bordered={false}>
        {rootrenderlist}
      </Collapse>
    );
  };

  return <div className="resources_list">{renderList()}</div>;
};

ResourcesList.propTypes = {};

export default ResourcesList;
