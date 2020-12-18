import React from "react";
import {
  Card,
  Radio,
  Button,
  Divider,
  Checkbox,
  InputNumber,
  Row,
  Spin,
} from "antd";
import "./style.less";
import AttributesFillter from "./AttributesFillter";

const SpatialQueryPanel = (props) => {
  const renderLayerSelectPanel = () => {
    return props.selthemlist.length ? (
      <Radio.Group
        onChange={props.onLayerChange}
        value={props.querylayerid}
        buttonStyle="solid"
      >
        {props.selthemlist.map((el) => {
          return (
            <Radio.Button key={el.id} value={el.id}>
              {el.name}
            </Radio.Button>
          );
        })}
      </Radio.Group>
    ) : (
      "请在资源目录选择图层"
    );
  };
  return (
    <Card className="spatial_query_card" id="toolbar_card" bordered={false}>
      {props.queryloading && (
        <Spin className="query_spin" tip="查询中..."></Spin>
      )}
      <Divider orientation="left">图层选择</Divider>
      {renderLayerSelectPanel()}
      <Divider orientation="left">空间类型</Divider>
      <Button.Group className="toolbar">
        <Button onClick={() => props.onSpatialQuery("point")}>点</Button>
        <Button onClick={() => props.onSpatialQuery("polyline")}>线</Button>
        <Button onClick={() => props.onSpatialQuery("polygon")}>面</Button>
        <Button onClick={() => props.onSpatialQuery("rectangle")}>矩形</Button>
      </Button.Group>

      <Row className="buffercontain">
        <Checkbox onChange={(e) => props.onCheckBuffer(e)}> 缓冲区 </Checkbox>
        <InputNumber
          min={100}
          value={props.bufferdistance}
          onChange={(e) => props.onBufferChange(e)}
        />{" "}
        米
      </Row>
      <Divider orientation="left">属性查询</Divider>
      {props.metaData && (
        <AttributesFillter
          fieldTypes={props.metaData.fields}
          onChange={(e) => props.onQueryChange(e)}
        ></AttributesFillter>
      )}
      <Button onClick={props.onClose} style={{ float: "right" }}>
        关闭
      </Button>
      <Button
        onClick={props.onClear}
        style={{ float: "right", right: 10 }}
        type="primary"
      >
        清除
      </Button>
      <Button
        onClick={props.onSearch}
        style={{ float: "right", right: 20 }}
        type="primary"
      >
        查询
      </Button>
    </Card>
  );
};

export default SpatialQueryPanel;
