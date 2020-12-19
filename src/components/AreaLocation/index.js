import AreaLocationComponent from './AreaLocation';
import React, { Component } from "react";
import centroid from "@turf/centroid";

class AreaLocation extends Component {
  componentWillMount() {
    const {mapBoxActions,quhuadata}=this.props;

    mapBoxActions.setAreaLocation(quhuadata);
    mapBoxActions.updateSource("arealocation", {
      type: "geojson",
      data: quhuadata,
    });
  }

  handleMenuClick = (area) => {

    const {mapBoxActions,mapConfig,map3d}=this.props;

    if (area == "全市") {
      mapBoxActions.zoomToPoint3D(
        { x: mapConfig.center.x, y: mapConfig.center.y },
        mapConfig.zoom
      );
    }
    mapBoxActions.selectAreaLocation(area);
    mapBoxActions.updateLayer("arealocation-outline", {
      filter: ["all", ["==", "NAME", area]],
    });
    map3d.arearesult.features.forEach((ele) => {
      if (ele.properties.NAME === area) {
        let center = centroid(ele.geometry);
        mapBoxActions.zoomToPoint3D(
          {
            x: center.geometry.coordinates[0],
            y: center.geometry.coordinates[1],
          },
          11.5
        );
      }
    });
  };
  render() {
    const {quhuadata,map3d}=this.props;
    const quhuaarray =quhuadata.features.map(e=>e.properties.NAME);
    return (
      <div style={{ float: "left" }}>
        <AreaLocationComponent
          areaNames={quhuaarray}
          onMenuClick={this.handleMenuClick}
          currentArea={map3d.currentarea}
        ></AreaLocationComponent>
      </div>
    );
  }
}

export default AreaLocation;