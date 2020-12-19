import React, { Component } from "react";
import {
  IMAGEMapStyle,
  ROADMapStyle
} from "../../components/MapBoxGL/mapstyle";
import { changStyle} from "../../components/MapBoxGL/actions";
import { connect } from "react-redux";
import { Radio } from "antd";
import "./style.less";

class layerswitch extends Component {
  state = { open: false, model: "2.5D", layerchangevisiable: false };


  onSliderChange = e => {
    const index = e.target.value;
    if (index == 3) {
      this.props.changStyle(IMAGEMapStyle);
    } else if (index == 4) {
      this.props.changStyle(ROADMapStyle);
    }
  };



  render() {


    return (
      <div className="mapandlayer_change">
        <Radio.Group
          defaultValue="4"
          buttonStyle="solid"
          onChange={this.onSliderChange}
        >
          <Radio.Button value="3">
            <div className="slide-item">
              <div className="item mapboxstyle3" />
              <div className="text">天地图影像</div>
            </div>
          </Radio.Button>
          <Radio.Button value="4">
            <div className="slide-item">
              <div className="item mapboxstyle4" />
              <div className="text">天地图矢量</div>
            </div>
          </Radio.Button>
        </Radio.Group>
      </div>
    );
  }
}

export default connect(
  state => {
    return { map: state.map};
  },
  {
    changStyle
  }
)(layerswitch);
