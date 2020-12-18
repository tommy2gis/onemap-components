import React from "react";
import { Dropdown, Row, Col } from "antd";
import "./style.less";

const AreaLocation = (props) => {
  const menu = (
    <div className="ant-dropdown-menu arealocation_list customscrollbar">
      <Row type="flex" justify="start">
        <Col span={4}>
          <a onClick={() => props.onMenuClick("全市")} type="dashed">
            全市
          </a>
        </Col>
        {props.areaNames.map((ele) => {
          return (
            <Col key={ele} span={4}>
              <a onClick={() => props.onMenuClick(ele)} type="dashed">
                {ele}
              </a>
            </Col>
          );
        })}
      </Row>
    </div>
  );
  return (
    <Dropdown overlay={menu}>
      <button type="button" className="ant-btn toolbar_btn">
        {props.currentArea || "全市"}
      </button>
    </Dropdown>
  );
};

export default AreaLocation;
