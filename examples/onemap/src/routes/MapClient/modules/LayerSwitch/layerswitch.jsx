import React, { Component } from "react";
import {
  // defaultMapStyle,
  // MapBlueStyle,
  // MapDarkStyle,
  IMAGEMapStyle,
  ROADMapStyle
} from "../../components/MapBoxGL/mapstyle";
import { loadStyle, changStyle,zoomToPoint3D} from "../../components/MapBoxGL/actions";
import { changeMapModule } from "../../actions/map";
import {switchLayerVisiable} from '../../actions/config'
import { connect } from "react-redux";
import { Avatar, Radio, Popover } from "antd";

// import SpeedDial from "@material-ui/lab/SpeedDial";
// import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import "./style.less";

class layerswitch extends Component {
  state = { open: false, model: "2.5D", layerchangevisiable: false };


  onSliderChange = e => {
    const index = e.target.value;
    if (index == 3) {
      this.props.changStyle(IMAGEMapStyle);
      this.props.changeMapModule("image");
    } else if (index == 4) {
      this.props.changStyle(ROADMapStyle);
      this.props.changeMapModule("road");
    }
  };



  render() {
    const content = (
      <div className="layer-switch-slider">
       
      </div>
    );

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
    return { map: state.map,mapConfig:state.mapConfig};
  },
  {
    loadStyle,
    changeMapModule,
    switchLayerVisiable,
    zoomToPoint3D,
    changStyle
  }
)(layerswitch);
