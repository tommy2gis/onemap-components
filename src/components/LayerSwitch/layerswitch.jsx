import React, { Component } from "react";
import { mapstyles } from "./mapstyles";
import { Radio } from "antd";
import "./style.less";

class layerswitch extends Component {
  onSliderChange = (e) => {
    const style = mapstyles.find((s) => s.id === e.target.value);
    this.props.mapBoxActions.changStyle(style);
  };

  renderItems = () => {
    return mapstyles.map((style) => {
      return (
        <Radio.Button value={style.id}>
          <div className="slide-item">
            <div className={`item ${style.className}`} />
            <div className="text">{style.title}</div>
          </div>
        </Radio.Button>
      );
    });
  };

  render() {
    return (
      <div className="mapandlayer_change">
        <Radio.Group
          defaultValue="road"
          buttonStyle="solid"
          onChange={this.onSliderChange}
        >
          {this.renderItems()}
        </Radio.Group>
      </div>
    );
  }
}

export default layerswitch;
