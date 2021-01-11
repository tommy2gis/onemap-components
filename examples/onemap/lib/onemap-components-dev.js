import React__default, { useState, Component, useEffect, forwardRef, createElement } from 'react';
import { Drawer, Collapse, Table, Popover, Select, List, Tag, Input, InputNumber, Button, Card, Spin, Divider, Radio, Row, Checkbox, Col, Dropdown, message, AutoComplete } from 'antd';
import turfbuffer from '@turf/buffer';
import arcgisX from '@tommy2gis/arcgis-x';
import centroid from '@turf/centroid';

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var _extends_1 = createCommonjsModule(function (module) {
function _extends() {
  module.exports = _extends = Object.assign || function (target) {
    var arguments$1 = arguments;

    for (var i = 1; i < arguments.length; i++) {
      var source = arguments$1[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

module.exports = _extends;
});

var SideBar = function SideBar(props) {
  return /*#__PURE__*/React__default.createElement(Drawer, _extends_1({}, props, {
    className: "".concat(props.className || '', " sidebar_containtcard"),
    mask: false
  }), props.children);
};

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var classCallCheck = _classCallCheck;

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) { descriptor.writable = true; }
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) { _defineProperties(Constructor.prototype, protoProps); }
  if (staticProps) { _defineProperties(Constructor, staticProps); }
  return Constructor;
}

var createClass = _createClass;

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

var assertThisInitialized = _assertThisInitialized;

var setPrototypeOf = createCommonjsModule(function (module) {
function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

module.exports = _setPrototypeOf;
});

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) { setPrototypeOf(subClass, superClass); }
}

var inherits = _inherits;

var _typeof_1 = createCommonjsModule(function (module) {
function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;
});

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof_1(call) === "object" || typeof call === "function")) {
    return call;
  }

  return assertThisInitialized(self);
}

var possibleConstructorReturn = _possibleConstructorReturn;

var getPrototypeOf = createCommonjsModule(function (module) {
function _getPrototypeOf(o) {
  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

module.exports = _getPrototypeOf;
});

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var defineProperty = _defineProperty;

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) { return arr; }
}

var arrayWithHoles = _arrayWithHoles;

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) { return; }
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) { break; }
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) { _i["return"](); }
    } finally {
      if (_d) { throw _e; }
    }
  }

  return _arr;
}

var iterableToArrayLimit = _iterableToArrayLimit;

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) { len = arr.length; }

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

var arrayLikeToArray = _arrayLikeToArray;

function _unsupportedIterableToArray(o, minLen) {
  if (!o) { return; }
  if (typeof o === "string") { return arrayLikeToArray(o, minLen); }
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) { n = o.constructor.name; }
  if (n === "Map" || n === "Set") { return Array.from(o); }
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) { return arrayLikeToArray(o, minLen); }
}

var unsupportedIterableToArray = _unsupportedIterableToArray;

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var nonIterableRest = _nonIterableRest;

function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest();
}

var slicedToArray = _slicedToArray;

var ResourcesList = function ResourcesList(props) {
  var _useState = useState([]),
      _useState2 = slicedToArray(_useState, 2),
      selectedRowKeys = _useState2[0],
      setSelectedRowKeys = _useState2[1];
  /**
   *渲染服务二级列表
   *
   * @memberof List
   */


  var renderServiceList = function renderServiceList(list) {
    var rowSelection = {
      onChange: function onChange(selectedRowKeys, selectedRows) {
        setSelectedRowKeys(selectedRowKeys.map(Number));
      },
      selectedRowKeys: selectedRowKeys,
      onSelect: function onSelect(record, selected, selectedRows, nativeEvent) {
        props.onSelect(record, selected);
      }
    };
    var columns = [{
      title: "Name",
      dataIndex: "name",
      render: function render(text) {
        return /*#__PURE__*/React__default.createElement("a", null, text);
      }
    }];
    return /*#__PURE__*/React__default.createElement(Table, {
      bordered: false,
      pagination: false,
      rowKey: "id",
      showHeader: false,
      rowSelection: rowSelection,
      columns: columns,
      dataSource: list
    });
  };
  /**
   *渲染服务一级列表
   *
   * @memberof List
   */


  var renderList = function renderList() {
    var list = props.list;
    var rootlist = list.filter(function (e) {
      return e.pid === 1;
    });
    var rootrenderlist = [];
    rootlist.forEach(function (item) {
      var sublist = list.filter(function (e) {
        return e.pid == item.id;
      });
      var num = sublist.length;
      rootrenderlist.push( /*#__PURE__*/React__default.createElement(Collapse.Panel, {
        header: /*#__PURE__*/React__default.createElement("div", null, item.name + " (" + num + ")"),
        key: item.id
      }, num > 0 ? renderServiceList(sublist) : null));
    });
    return /*#__PURE__*/React__default.createElement(Collapse, {
      expandIconPosition: "right",
      bordered: false
    }, rootrenderlist);
  };

  return /*#__PURE__*/React__default.createElement("div", {
    className: "".concat(props.className || "", " resources_list")
  }, renderList());
};

ResourcesList.propTypes = {};

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) { return false; } if (Reflect.construct.sham) { return false; } if (typeof Proxy === "function") { return true; } try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var ResourceCatalog = /*#__PURE__*/function (_Component) {
  inherits(ResourceCatalog, _Component);

  var _super = _createSuper(ResourceCatalog);

  function ResourceCatalog() {
    var arguments$1 = arguments;

    var _this;

    classCallCheck(this, ResourceCatalog);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments$1[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    defineProperty(assertThisInitialized(_this), "state", {
      list: [],
      selectedRows: [],
      selectedRowKeys: []
    });

    defineProperty(assertThisInitialized(_this), "onOpacityChange", function (record, value) {
      _this.props.thematicActions.changeThematicOpacity(record.id, value);

      _this.props.mapBoxActions.updateLayer("thematic_" + record.id, {
        paint: {
          "raster-opacity": value
        }
      });
    });

    defineProperty(assertThisInitialized(_this), "onExpand", function (e, record) {
      if (!record.legend) {
        _this.props.thematicActions.loadLegendJson(record);
      }
    });

    defineProperty(assertThisInitialized(_this), "onSelect", function (record, selected) {
      if (selected) {
        _this.addThematicToStyle(record);
      } else {
        _this.removeThematicfromStyle(record);
      }
    });

    defineProperty(assertThisInitialized(_this), "addThematicToStyle", function (item) {
      _this.props.thematicActions.showThematicLayer(item.id);

      _this.props.thematicActions.setSelectedQueryLayer(item.id);

      if (item.servicetype === "wms") {
        _this.props.mapBoxActions.addSourceAndLayers("thematic_" + item.name, {
          type: "raster",
          tiles: [ServerIp + item.url + "?bbox={bbox-epsg-4490}&format=image/png&service=WMS&version=1.1.1&request=GetMap&styles=default&srs=EPSG:4490&transparent=true&width=256&height=256&layers=0"],
          tileSize: 256
        }, {
          id: "thematic_" + item.name,
          type: "raster",
          visibility: "none",
          source: "thematic_" + item.name,
          paint: {
            "raster-opacity": 0.8
          }
        });
      } else if (item.servicetype === "map") {
        _this.props.mapBoxActions.updateLayer("thematic_" + item.id, {
          layout: {
            visibility: "visible"
          }
        });

        _this.props.thematicActions.queryThematicMetaData({
          url: item.url,
          layerid: item.layers
        });
      } else if (item.servicetype === "wmts") {
        _this.props.mapBoxActions.addSourceAndLayers("thematic_" + item.name, {
          type: "raster",
          tiles: [ServerIp + item.url + "?request=GetTile&tilematrix={z}&tilerow={y}&tilecol={x}"],
          tileSize: 256
        }, {
          id: "thematic_" + item.name,
          type: "raster",
          visibility: "none",
          source: "thematic_" + item.name
        });
      }
    });

    defineProperty(assertThisInitialized(_this), "removeThematicfromStyle", function (item) {
      _this.props.thematicActions.showThematicLayer(item.id);

      _this.props.mapBoxActions.updateLayer("thematic_" + item.id, {
        layout: {
          visibility: "none"
        }
      });
    });

    return _this;
  }

  createClass(ResourceCatalog, [{
    key: "componentWillMount",
    value: function componentWillMount() {}
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React__default.createElement(SideBar, this.props.sideprops, /*#__PURE__*/React__default.createElement(ResourcesList, {
        list: this.props.thematics.themlist,
        onSelect: this.onSelect
      }));
    }
  }]);

  return ResourceCatalog;
}(Component);

/*
 * Copyright 2017 Esri
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// checks if 2 x,y points are equal
function pointsEqual (a, b) {
  for (var i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
}

// checks if the first and last points of a ring are equal and closes the ring
function closeRing (coordinates) {
  if (!pointsEqual(coordinates[0], coordinates[coordinates.length - 1])) {
    coordinates.push(coordinates[0]);
  }
  return coordinates;
}

// determine if polygon ring coordinates are clockwise. clockwise signifies outer ring, counter-clockwise an inner ring
// or hole. this logic was found at http://stackoverflow.com/questions/1165647/how-to-determine-if-a-list-of-polygon-
// points-are-in-clockwise-order
function ringIsClockwise (ringToTest) {
  var total = 0;
  var i = 0;
  var rLength = ringToTest.length;
  var pt1 = ringToTest[i];
  var pt2;
  for (i; i < rLength - 1; i++) {
    pt2 = ringToTest[i + 1];
    total += (pt2[0] - pt1[0]) * (pt2[1] + pt1[1]);
    pt1 = pt2;
  }
  return (total >= 0);
}

// ported from terraformer.js https://github.com/Esri/Terraformer/blob/master/terraformer.js#L504-L519
function vertexIntersectsVertex (a1, a2, b1, b2) {
  var uaT = ((b2[0] - b1[0]) * (a1[1] - b1[1])) - ((b2[1] - b1[1]) * (a1[0] - b1[0]));
  var ubT = ((a2[0] - a1[0]) * (a1[1] - b1[1])) - ((a2[1] - a1[1]) * (a1[0] - b1[0]));
  var uB = ((b2[1] - b1[1]) * (a2[0] - a1[0])) - ((b2[0] - b1[0]) * (a2[1] - a1[1]));

  if (uB !== 0) {
    var ua = uaT / uB;
    var ub = ubT / uB;

    if (ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1) {
      return true;
    }
  }

  return false;
}

// ported from terraformer.js https://github.com/Esri/Terraformer/blob/master/terraformer.js#L521-L531
function arrayIntersectsArray (a, b) {
  for (var i = 0; i < a.length - 1; i++) {
    for (var j = 0; j < b.length - 1; j++) {
      if (vertexIntersectsVertex(a[i], a[i + 1], b[j], b[j + 1])) {
        return true;
      }
    }
  }

  return false;
}

// ported from terraformer.js https://github.com/Esri/Terraformer/blob/master/terraformer.js#L470-L480
function coordinatesContainPoint (coordinates, point) {
  var contains = false;
  for (var i = -1, l = coordinates.length, j = l - 1; ++i < l; j = i) {
    if (((coordinates[i][1] <= point[1] && point[1] < coordinates[j][1]) ||
         (coordinates[j][1] <= point[1] && point[1] < coordinates[i][1])) &&
        (point[0] < (((coordinates[j][0] - coordinates[i][0]) * (point[1] - coordinates[i][1])) / (coordinates[j][1] - coordinates[i][1])) + coordinates[i][0])) {
      contains = !contains;
    }
  }
  return contains;
}

// ported from terraformer-arcgis-parser.js https://github.com/Esri/terraformer-arcgis-parser/blob/master/terraformer-arcgis-parser.js#L106-L113
function coordinatesContainCoordinates (outer, inner) {
  var intersects = arrayIntersectsArray(outer, inner);
  var contains = coordinatesContainPoint(outer, inner[0]);
  if (!intersects && contains) {
    return true;
  }
  return false;
}

// do any polygons in this array contain any other polygons in this array?
// used for checking for holes in arcgis rings
// ported from terraformer-arcgis-parser.js https://github.com/Esri/terraformer-arcgis-parser/blob/master/terraformer-arcgis-parser.js#L117-L172
function convertRingsToGeoJSON (rings) {
  var outerRings = [];
  var holes = [];
  var x; // iterator
  var outerRing; // current outer ring being evaluated
  var hole; // current hole being evaluated

  // for each ring
  for (var r = 0; r < rings.length; r++) {
    var ring = closeRing(rings[r].slice(0));
    if (ring.length < 4) {
      continue;
    }
    // is this ring an outer ring? is it clockwise?
    if (ringIsClockwise(ring)) {
      var polygon = [ ring.slice().reverse() ]; // wind outer rings counterclockwise for RFC 7946 compliance
      outerRings.push(polygon); // push to outer rings
    } else {
      holes.push(ring.slice().reverse()); // wind inner rings clockwise for RFC 7946 compliance
    }
  }

  var uncontainedHoles = [];

  // while there are holes left...
  while (holes.length) {
    // pop a hole off out stack
    hole = holes.pop();

    // loop over all outer rings and see if they contain our hole.
    var contained = false;
    for (x = outerRings.length - 1; x >= 0; x--) {
      outerRing = outerRings[x][0];
      if (coordinatesContainCoordinates(outerRing, hole)) {
        // the hole is contained push it into our polygon
        outerRings[x].push(hole);
        contained = true;
        break;
      }
    }

    // ring is not contained in any outer ring
    // sometimes this happens https://github.com/Esri/esri-leaflet/issues/320
    if (!contained) {
      uncontainedHoles.push(hole);
    }
  }

  // if we couldn't match any holes using contains we can try intersects...
  while (uncontainedHoles.length) {
    // pop a hole off out stack
    hole = uncontainedHoles.pop();

    // loop over all outer rings and see if any intersect our hole.
    var intersects = false;

    for (x = outerRings.length - 1; x >= 0; x--) {
      outerRing = outerRings[x][0];
      if (arrayIntersectsArray(outerRing, hole)) {
        // the hole is contained push it into our polygon
        outerRings[x].push(hole);
        intersects = true;
        break;
      }
    }

    if (!intersects) {
      outerRings.push([hole.reverse()]);
    }
  }

  if (outerRings.length === 1) {
    return {
      type: 'Polygon',
      coordinates: outerRings[0]
    };
  } else {
    return {
      type: 'MultiPolygon',
      coordinates: outerRings
    };
  }
}

// This function ensures that rings are oriented in the right directions
// outer rings are clockwise, holes are counterclockwise
// used for converting GeoJSON Polygons to ArcGIS Polygons
function orientRings (poly) {
  var output = [];
  var polygon = poly.slice(0);
  var outerRing = closeRing(polygon.shift().slice(0));
  if (outerRing.length >= 4) {
    if (!ringIsClockwise(outerRing)) {
      outerRing.reverse();
    }

    output.push(outerRing);

    for (var i = 0; i < polygon.length; i++) {
      var hole = closeRing(polygon[i].slice(0));
      if (hole.length >= 4) {
        if (ringIsClockwise(hole)) {
          hole.reverse();
        }
        output.push(hole);
      }
    }
  }

  return output;
}

// This function flattens holes in multipolygons to one array of polygons
// used for converting GeoJSON Polygons to ArcGIS Polygons
function flattenMultiPolygonRings (rings) {
  var output = [];
  for (var i = 0; i < rings.length; i++) {
    var polygon = orientRings(rings[i]);
    for (var x = polygon.length - 1; x >= 0; x--) {
      var ring = polygon[x].slice(0);
      output.push(ring);
    }
  }
  return output;
}

// shallow object clone for feature properties and attributes
// from http://jsperf.com/cloning-an-object/2
function shallowClone (obj) {
  var target = {};
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      target[i] = obj[i];
    }
  }
  return target;
}

function getId (attributes, idAttribute) {
  var keys = idAttribute ? [idAttribute, 'OBJECTID', 'FID'] : ['OBJECTID', 'FID'];
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (
      key in attributes &&
      (typeof attributes[key] === 'string' ||
        typeof attributes[key] === 'number')
    ) {
      return attributes[key];
    }
  }
  throw Error('No valid id attribute found');
}

function arcgisToGeoJSON (arcgis, idAttribute) {
  var geojson = {};

  if (arcgis.features) {
    geojson.type = 'FeatureCollection';
    geojson.features = [];
    for (var i = 0; i < arcgis.features.length; i++) {
      geojson.features.push(arcgisToGeoJSON(arcgis.features[i], idAttribute));
    }
  }

  if (typeof arcgis.x === 'number' && typeof arcgis.y === 'number') {
    geojson.type = 'Point';
    geojson.coordinates = [arcgis.x, arcgis.y];
    if (typeof arcgis.z === 'number') {
      geojson.coordinates.push(arcgis.z);
    }
  }

  if (arcgis.points) {
    geojson.type = 'MultiPoint';
    geojson.coordinates = arcgis.points.slice(0);
  }

  if (arcgis.paths) {
    if (arcgis.paths.length === 1) {
      geojson.type = 'LineString';
      geojson.coordinates = arcgis.paths[0].slice(0);
    } else {
      geojson.type = 'MultiLineString';
      geojson.coordinates = arcgis.paths.slice(0);
    }
  }

  if (arcgis.rings) {
    geojson = convertRingsToGeoJSON(arcgis.rings.slice(0));
  }

  if (
    typeof arcgis.xmin === 'number' &&
    typeof arcgis.ymin === 'number' &&
    typeof arcgis.xmax === 'number' &&
    typeof arcgis.ymax === 'number'
  ) {
    geojson.type = 'Polygon';
    geojson.coordinates = [[
      [arcgis.xmax, arcgis.ymax],
      [arcgis.xmin, arcgis.ymax],
      [arcgis.xmin, arcgis.ymin],
      [arcgis.xmax, arcgis.ymin],
      [arcgis.xmax, arcgis.ymax]
    ]];
  }

  if (arcgis.geometry || arcgis.attributes) {
    geojson.type = 'Feature';
    geojson.geometry = (arcgis.geometry) ? arcgisToGeoJSON(arcgis.geometry) : null;
    geojson.properties = (arcgis.attributes) ? shallowClone(arcgis.attributes) : null;
    if (arcgis.attributes) {
      try {
        geojson.id = getId(arcgis.attributes, idAttribute);
      } catch (err) {
        // don't set an id
      }
    }
  }

  // if no valid geometry was encountered
  if (JSON.stringify(geojson.geometry) === JSON.stringify({})) {
    geojson.geometry = null;
  }

  if (
    arcgis.spatialReference &&
    arcgis.spatialReference.wkid &&
    arcgis.spatialReference.wkid !== 4326
  ) {
    console.warn('Object converted in non-standard crs - ' + JSON.stringify(arcgis.spatialReference));
  }

  return geojson;
}

function geojsonToArcGIS (geojson, idAttribute) {
  idAttribute = idAttribute || 'OBJECTID';
  var spatialReference = { wkid: 4326 };
  var result = {};
  var i;

  switch (geojson.type) {
    case 'Point':
      result.x = geojson.coordinates[0];
      result.y = geojson.coordinates[1];
      result.spatialReference = spatialReference;
      break;
    case 'MultiPoint':
      result.points = geojson.coordinates.slice(0);
      result.spatialReference = spatialReference;
      break;
    case 'LineString':
      result.paths = [geojson.coordinates.slice(0)];
      result.spatialReference = spatialReference;
      break;
    case 'MultiLineString':
      result.paths = geojson.coordinates.slice(0);
      result.spatialReference = spatialReference;
      break;
    case 'Polygon':
      result.rings = orientRings(geojson.coordinates.slice(0));
      result.spatialReference = spatialReference;
      break;
    case 'MultiPolygon':
      result.rings = flattenMultiPolygonRings(geojson.coordinates.slice(0));
      result.spatialReference = spatialReference;
      break;
    case 'Feature':
      if (geojson.geometry) {
        result.geometry = geojsonToArcGIS(geojson.geometry, idAttribute);
      }
      result.attributes = (geojson.properties) ? shallowClone(geojson.properties) : {};
      if (geojson.id) {
        result.attributes[idAttribute] = geojson.id;
      }
      break;
    case 'FeatureCollection':
      result = [];
      for (i = 0; i < geojson.features.length; i++) {
        result.push(geojsonToArcGIS(geojson.features[i], idAttribute));
      }
      break;
    case 'GeometryCollection':
      result = [];
      for (i = 0; i < geojson.geometries.length; i++) {
        result.push(geojsonToArcGIS(geojson.geometries[i], idAttribute));
      }
      break;
  }

  return result;
}

function _arrayWithHoles$1(arr) {
  if (Array.isArray(arr)) { return arr; }
}

function _iterableToArrayLimit$1(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) { return; }
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) { break; }
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) { _i["return"](); }
    } finally {
      if (_d) { throw _e; }
    }
  }

  return _arr;
}

function _arrayLikeToArray$1(arr, len) {
  if (len == null || len > arr.length) { len = arr.length; }

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _unsupportedIterableToArray$1(o, minLen) {
  if (!o) { return; }
  if (typeof o === "string") { return _arrayLikeToArray$1(o, minLen); }
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) { n = o.constructor.name; }
  if (n === "Map" || n === "Set") { return Array.from(o); }
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) { return _arrayLikeToArray$1(o, minLen); }
}

function _nonIterableRest$1() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray$1(arr, i) {
  return _arrayWithHoles$1(arr) || _iterableToArrayLimit$1(arr, i) || _unsupportedIterableToArray$1(arr, i) || _nonIterableRest$1();
}

function _defineProperty$1(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) { return {}; }
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) { continue; }
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) { return {}; }
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) { continue; }
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) { continue; }
      target[key] = source[key];
    }
  }

  return target;
}

var classnames = createCommonjsModule(function (module) {
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var arguments$1 = arguments;

		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments$1[i];
			if (!arg) { continue; }

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg) && arg.length) {
				var inner = classNames.apply(null, arg);
				if (inner) {
					classes.push(inner);
				}
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if ( module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else {
		window.classNames = classNames;
	}
}());
});

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) { symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    }); }
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  var arguments$1 = arguments;

  for (var i = 1; i < arguments.length; i++) {
    var source = arguments$1[i] != null ? arguments$1[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty$1(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

/**
 * Take input from [0, n] and return it as [0, 1]
 * @hidden
 */
function bound01(n, max) {
    if (isOnePointZero(n)) {
        n = '100%';
    }
    var isPercent = isPercentage(n);
    n = max === 360 ? n : Math.min(max, Math.max(0, parseFloat(n)));
    // Automatically convert percentage into number
    if (isPercent) {
        n = parseInt(String(n * max), 10) / 100;
    }
    // Handle floating point rounding errors
    if (Math.abs(n - max) < 0.000001) {
        return 1;
    }
    // Convert into [0, 1] range if it isn't already
    if (max === 360) {
        // If n is a hue given in degrees,
        // wrap around out-of-range values into [0, 360] range
        // then convert into [0, 1].
        n = (n < 0 ? (n % max) + max : n % max) / parseFloat(String(max));
    }
    else {
        // If n not a hue given in degrees
        // Convert into [0, 1] range if it isn't already.
        n = (n % max) / parseFloat(String(max));
    }
    return n;
}
/**
 * Force a number between 0 and 1
 * @hidden
 */
function clamp01(val) {
    return Math.min(1, Math.max(0, val));
}
/**
 * Need to handle 1.0 as 100%, since once it is a number, there is no difference between it and 1
 * <http://stackoverflow.com/questions/7422072/javascript-how-to-detect-number-as-a-decimal-including-1-0>
 * @hidden
 */
function isOnePointZero(n) {
    return typeof n === 'string' && n.includes('.') && parseFloat(n) === 1;
}
/**
 * Check to see if string passed in is a percentage
 * @hidden
 */
function isPercentage(n) {
    return typeof n === 'string' && n.includes('%');
}
/**
 * Return a valid alpha value [0,1] with all invalid values being set to 1
 * @hidden
 */
function boundAlpha(a) {
    a = parseFloat(a);
    if (isNaN(a) || a < 0 || a > 1) {
        a = 1;
    }
    return a;
}
/**
 * Replace a decimal with it's percentage value
 * @hidden
 */
function convertToPercentage(n) {
    if (n <= 1) {
        return Number(n) * 100 + "%";
    }
    return n;
}
/**
 * Force a hex value to have 2 characters
 * @hidden
 */
function pad2(c) {
    return c.length === 1 ? '0' + c : String(c);
}

// `rgbToHsl`, `rgbToHsv`, `hslToRgb`, `hsvToRgb` modified from:
// <http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript>
/**
 * Handle bounds / percentage checking to conform to CSS color spec
 * <http://www.w3.org/TR/css3-color/>
 * *Assumes:* r, g, b in [0, 255] or [0, 1]
 * *Returns:* { r, g, b } in [0, 255]
 */
function rgbToRgb(r, g, b) {
    return {
        r: bound01(r, 255) * 255,
        g: bound01(g, 255) * 255,
        b: bound01(b, 255) * 255,
    };
}
/**
 * Converts an RGB color value to HSL.
 * *Assumes:* r, g, and b are contained in [0, 255] or [0, 1]
 * *Returns:* { h, s, l } in [0,1]
 */
function rgbToHsl(r, g, b) {
    r = bound01(r, 255);
    g = bound01(g, 255);
    b = bound01(b, 255);
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    var h = 0;
    var s = 0;
    var l = (max + min) / 2;
    if (max === min) {
        s = 0;
        h = 0; // achromatic
    }
    else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }
    return { h: h, s: s, l: l };
}
function hue2rgb(p, q, t) {
    if (t < 0) {
        t += 1;
    }
    if (t > 1) {
        t -= 1;
    }
    if (t < 1 / 6) {
        return p + (q - p) * (6 * t);
    }
    if (t < 1 / 2) {
        return q;
    }
    if (t < 2 / 3) {
        return p + (q - p) * (2 / 3 - t) * 6;
    }
    return p;
}
/**
 * Converts an HSL color value to RGB.
 *
 * *Assumes:* h is contained in [0, 1] or [0, 360] and s and l are contained [0, 1] or [0, 100]
 * *Returns:* { r, g, b } in the set [0, 255]
 */
function hslToRgb(h, s, l) {
    var r;
    var g;
    var b;
    h = bound01(h, 360);
    s = bound01(s, 100);
    l = bound01(l, 100);
    if (s === 0) {
        // achromatic
        g = l;
        b = l;
        r = l;
    }
    else {
        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }
    return { r: r * 255, g: g * 255, b: b * 255 };
}
/**
 * Converts an RGB color value to HSV
 *
 * *Assumes:* r, g, and b are contained in the set [0, 255] or [0, 1]
 * *Returns:* { h, s, v } in [0,1]
 */
function rgbToHsv(r, g, b) {
    r = bound01(r, 255);
    g = bound01(g, 255);
    b = bound01(b, 255);
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    var h = 0;
    var v = max;
    var d = max - min;
    var s = max === 0 ? 0 : d / max;
    if (max === min) {
        h = 0; // achromatic
    }
    else {
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }
    return { h: h, s: s, v: v };
}
/**
 * Converts an HSV color value to RGB.
 *
 * *Assumes:* h is contained in [0, 1] or [0, 360] and s and v are contained in [0, 1] or [0, 100]
 * *Returns:* { r, g, b } in the set [0, 255]
 */
function hsvToRgb(h, s, v) {
    h = bound01(h, 360) * 6;
    s = bound01(s, 100);
    v = bound01(v, 100);
    var i = Math.floor(h);
    var f = h - i;
    var p = v * (1 - s);
    var q = v * (1 - f * s);
    var t = v * (1 - (1 - f) * s);
    var mod = i % 6;
    var r = [v, q, p, p, t, v][mod];
    var g = [t, v, v, q, p, p][mod];
    var b = [p, p, t, v, v, q][mod];
    return { r: r * 255, g: g * 255, b: b * 255 };
}
/**
 * Converts an RGB color to hex
 *
 * Assumes r, g, and b are contained in the set [0, 255]
 * Returns a 3 or 6 character hex
 */
function rgbToHex(r, g, b, allow3Char) {
    var hex = [
        pad2(Math.round(r).toString(16)),
        pad2(Math.round(g).toString(16)),
        pad2(Math.round(b).toString(16)) ];
    // Return a 3 character hex if possible
    if (allow3Char &&
        hex[0].startsWith(hex[0].charAt(1)) &&
        hex[1].startsWith(hex[1].charAt(1)) &&
        hex[2].startsWith(hex[2].charAt(1))) {
        return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
    }
    return hex.join('');
}
/**
 * Converts an RGBA color plus alpha transparency to hex
 *
 * Assumes r, g, b are contained in the set [0, 255] and
 * a in [0, 1]. Returns a 4 or 8 character rgba hex
 */
// eslint-disable-next-line max-params
function rgbaToHex(r, g, b, a, allow4Char) {
    var hex = [
        pad2(Math.round(r).toString(16)),
        pad2(Math.round(g).toString(16)),
        pad2(Math.round(b).toString(16)),
        pad2(convertDecimalToHex(a)) ];
    // Return a 4 character hex if possible
    if (allow4Char &&
        hex[0].startsWith(hex[0].charAt(1)) &&
        hex[1].startsWith(hex[1].charAt(1)) &&
        hex[2].startsWith(hex[2].charAt(1)) &&
        hex[3].startsWith(hex[3].charAt(1))) {
        return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0) + hex[3].charAt(0);
    }
    return hex.join('');
}
/** Converts a decimal to a hex value */
function convertDecimalToHex(d) {
    return Math.round(parseFloat(d) * 255).toString(16);
}
/** Converts a hex value to a decimal */
function convertHexToDecimal(h) {
    return parseIntFromHex(h) / 255;
}
/** Parse a base-16 hex value into a base-10 integer */
function parseIntFromHex(val) {
    return parseInt(val, 16);
}
function numberInputToObject(color) {
    return {
        r: color >> 16,
        g: (color & 0xff00) >> 8,
        b: color & 0xff,
    };
}

// https://github.com/bahamas10/css-color-names/blob/master/css-color-names.json
/**
 * @hidden
 */
var names = {
    aliceblue: '#f0f8ff',
    antiquewhite: '#faebd7',
    aqua: '#00ffff',
    aquamarine: '#7fffd4',
    azure: '#f0ffff',
    beige: '#f5f5dc',
    bisque: '#ffe4c4',
    black: '#000000',
    blanchedalmond: '#ffebcd',
    blue: '#0000ff',
    blueviolet: '#8a2be2',
    brown: '#a52a2a',
    burlywood: '#deb887',
    cadetblue: '#5f9ea0',
    chartreuse: '#7fff00',
    chocolate: '#d2691e',
    coral: '#ff7f50',
    cornflowerblue: '#6495ed',
    cornsilk: '#fff8dc',
    crimson: '#dc143c',
    cyan: '#00ffff',
    darkblue: '#00008b',
    darkcyan: '#008b8b',
    darkgoldenrod: '#b8860b',
    darkgray: '#a9a9a9',
    darkgreen: '#006400',
    darkgrey: '#a9a9a9',
    darkkhaki: '#bdb76b',
    darkmagenta: '#8b008b',
    darkolivegreen: '#556b2f',
    darkorange: '#ff8c00',
    darkorchid: '#9932cc',
    darkred: '#8b0000',
    darksalmon: '#e9967a',
    darkseagreen: '#8fbc8f',
    darkslateblue: '#483d8b',
    darkslategray: '#2f4f4f',
    darkslategrey: '#2f4f4f',
    darkturquoise: '#00ced1',
    darkviolet: '#9400d3',
    deeppink: '#ff1493',
    deepskyblue: '#00bfff',
    dimgray: '#696969',
    dimgrey: '#696969',
    dodgerblue: '#1e90ff',
    firebrick: '#b22222',
    floralwhite: '#fffaf0',
    forestgreen: '#228b22',
    fuchsia: '#ff00ff',
    gainsboro: '#dcdcdc',
    ghostwhite: '#f8f8ff',
    goldenrod: '#daa520',
    gold: '#ffd700',
    gray: '#808080',
    green: '#008000',
    greenyellow: '#adff2f',
    grey: '#808080',
    honeydew: '#f0fff0',
    hotpink: '#ff69b4',
    indianred: '#cd5c5c',
    indigo: '#4b0082',
    ivory: '#fffff0',
    khaki: '#f0e68c',
    lavenderblush: '#fff0f5',
    lavender: '#e6e6fa',
    lawngreen: '#7cfc00',
    lemonchiffon: '#fffacd',
    lightblue: '#add8e6',
    lightcoral: '#f08080',
    lightcyan: '#e0ffff',
    lightgoldenrodyellow: '#fafad2',
    lightgray: '#d3d3d3',
    lightgreen: '#90ee90',
    lightgrey: '#d3d3d3',
    lightpink: '#ffb6c1',
    lightsalmon: '#ffa07a',
    lightseagreen: '#20b2aa',
    lightskyblue: '#87cefa',
    lightslategray: '#778899',
    lightslategrey: '#778899',
    lightsteelblue: '#b0c4de',
    lightyellow: '#ffffe0',
    lime: '#00ff00',
    limegreen: '#32cd32',
    linen: '#faf0e6',
    magenta: '#ff00ff',
    maroon: '#800000',
    mediumaquamarine: '#66cdaa',
    mediumblue: '#0000cd',
    mediumorchid: '#ba55d3',
    mediumpurple: '#9370db',
    mediumseagreen: '#3cb371',
    mediumslateblue: '#7b68ee',
    mediumspringgreen: '#00fa9a',
    mediumturquoise: '#48d1cc',
    mediumvioletred: '#c71585',
    midnightblue: '#191970',
    mintcream: '#f5fffa',
    mistyrose: '#ffe4e1',
    moccasin: '#ffe4b5',
    navajowhite: '#ffdead',
    navy: '#000080',
    oldlace: '#fdf5e6',
    olive: '#808000',
    olivedrab: '#6b8e23',
    orange: '#ffa500',
    orangered: '#ff4500',
    orchid: '#da70d6',
    palegoldenrod: '#eee8aa',
    palegreen: '#98fb98',
    paleturquoise: '#afeeee',
    palevioletred: '#db7093',
    papayawhip: '#ffefd5',
    peachpuff: '#ffdab9',
    peru: '#cd853f',
    pink: '#ffc0cb',
    plum: '#dda0dd',
    powderblue: '#b0e0e6',
    purple: '#800080',
    rebeccapurple: '#663399',
    red: '#ff0000',
    rosybrown: '#bc8f8f',
    royalblue: '#4169e1',
    saddlebrown: '#8b4513',
    salmon: '#fa8072',
    sandybrown: '#f4a460',
    seagreen: '#2e8b57',
    seashell: '#fff5ee',
    sienna: '#a0522d',
    silver: '#c0c0c0',
    skyblue: '#87ceeb',
    slateblue: '#6a5acd',
    slategray: '#708090',
    slategrey: '#708090',
    snow: '#fffafa',
    springgreen: '#00ff7f',
    steelblue: '#4682b4',
    tan: '#d2b48c',
    teal: '#008080',
    thistle: '#d8bfd8',
    tomato: '#ff6347',
    turquoise: '#40e0d0',
    violet: '#ee82ee',
    wheat: '#f5deb3',
    white: '#ffffff',
    whitesmoke: '#f5f5f5',
    yellow: '#ffff00',
    yellowgreen: '#9acd32',
};

/**
 * Given a string or object, convert that input to RGB
 *
 * Possible string inputs:
 * ```
 * "red"
 * "#f00" or "f00"
 * "#ff0000" or "ff0000"
 * "#ff000000" or "ff000000"
 * "rgb 255 0 0" or "rgb (255, 0, 0)"
 * "rgb 1.0 0 0" or "rgb (1, 0, 0)"
 * "rgba (255, 0, 0, 1)" or "rgba 255, 0, 0, 1"
 * "rgba (1.0, 0, 0, 1)" or "rgba 1.0, 0, 0, 1"
 * "hsl(0, 100%, 50%)" or "hsl 0 100% 50%"
 * "hsla(0, 100%, 50%, 1)" or "hsla 0 100% 50%, 1"
 * "hsv(0, 100%, 100%)" or "hsv 0 100% 100%"
 * ```
 */
function inputToRGB(color) {
    var rgb = { r: 0, g: 0, b: 0 };
    var a = 1;
    var s = null;
    var v = null;
    var l = null;
    var ok = false;
    var format = false;
    if (typeof color === 'string') {
        color = stringInputToObject(color);
    }
    if (typeof color === 'object') {
        if (isValidCSSUnit(color.r) && isValidCSSUnit(color.g) && isValidCSSUnit(color.b)) {
            rgb = rgbToRgb(color.r, color.g, color.b);
            ok = true;
            format = String(color.r).substr(-1) === '%' ? 'prgb' : 'rgb';
        }
        else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.v)) {
            s = convertToPercentage(color.s);
            v = convertToPercentage(color.v);
            rgb = hsvToRgb(color.h, s, v);
            ok = true;
            format = 'hsv';
        }
        else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.l)) {
            s = convertToPercentage(color.s);
            l = convertToPercentage(color.l);
            rgb = hslToRgb(color.h, s, l);
            ok = true;
            format = 'hsl';
        }
        if (Object.prototype.hasOwnProperty.call(color, 'a')) {
            a = color.a;
        }
    }
    a = boundAlpha(a);
    return {
        ok: ok,
        format: color.format || format,
        r: Math.min(255, Math.max(rgb.r, 0)),
        g: Math.min(255, Math.max(rgb.g, 0)),
        b: Math.min(255, Math.max(rgb.b, 0)),
        a: a,
    };
}
// <http://www.w3.org/TR/css3-values/#integers>
var CSS_INTEGER = '[-\\+]?\\d+%?';
// <http://www.w3.org/TR/css3-values/#number-value>
var CSS_NUMBER = '[-\\+]?\\d*\\.\\d+%?';
// Allow positive/negative integer/number.  Don't capture the either/or, just the entire outcome.
var CSS_UNIT = "(?:" + CSS_NUMBER + ")|(?:" + CSS_INTEGER + ")";
// Actual matching.
// Parentheses and commas are optional, but not required.
// Whitespace can take the place of commas or opening paren
var PERMISSIVE_MATCH3 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
var PERMISSIVE_MATCH4 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
var matchers = {
    CSS_UNIT: new RegExp(CSS_UNIT),
    rgb: new RegExp('rgb' + PERMISSIVE_MATCH3),
    rgba: new RegExp('rgba' + PERMISSIVE_MATCH4),
    hsl: new RegExp('hsl' + PERMISSIVE_MATCH3),
    hsla: new RegExp('hsla' + PERMISSIVE_MATCH4),
    hsv: new RegExp('hsv' + PERMISSIVE_MATCH3),
    hsva: new RegExp('hsva' + PERMISSIVE_MATCH4),
    hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
    hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
    hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
    hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
};
/**
 * Permissive string parsing.  Take in a number of formats, and output an object
 * based on detected format.  Returns `{ r, g, b }` or `{ h, s, l }` or `{ h, s, v}`
 */
function stringInputToObject(color) {
    color = color.trim().toLowerCase();
    if (color.length === 0) {
        return false;
    }
    var named = false;
    if (names[color]) {
        color = names[color];
        named = true;
    }
    else if (color === 'transparent') {
        return { r: 0, g: 0, b: 0, a: 0, format: 'name' };
    }
    // Try to match string input using regular expressions.
    // Keep most of the number bounding out of this function - don't worry about [0,1] or [0,100] or [0,360]
    // Just return an object and let the conversion functions handle that.
    // This way the result will be the same whether the tinycolor is initialized with string or object.
    var match = matchers.rgb.exec(color);
    if (match) {
        return { r: match[1], g: match[2], b: match[3] };
    }
    match = matchers.rgba.exec(color);
    if (match) {
        return { r: match[1], g: match[2], b: match[3], a: match[4] };
    }
    match = matchers.hsl.exec(color);
    if (match) {
        return { h: match[1], s: match[2], l: match[3] };
    }
    match = matchers.hsla.exec(color);
    if (match) {
        return { h: match[1], s: match[2], l: match[3], a: match[4] };
    }
    match = matchers.hsv.exec(color);
    if (match) {
        return { h: match[1], s: match[2], v: match[3] };
    }
    match = matchers.hsva.exec(color);
    if (match) {
        return { h: match[1], s: match[2], v: match[3], a: match[4] };
    }
    match = matchers.hex8.exec(color);
    if (match) {
        return {
            r: parseIntFromHex(match[1]),
            g: parseIntFromHex(match[2]),
            b: parseIntFromHex(match[3]),
            a: convertHexToDecimal(match[4]),
            format: named ? 'name' : 'hex8',
        };
    }
    match = matchers.hex6.exec(color);
    if (match) {
        return {
            r: parseIntFromHex(match[1]),
            g: parseIntFromHex(match[2]),
            b: parseIntFromHex(match[3]),
            format: named ? 'name' : 'hex',
        };
    }
    match = matchers.hex4.exec(color);
    if (match) {
        return {
            r: parseIntFromHex(match[1] + match[1]),
            g: parseIntFromHex(match[2] + match[2]),
            b: parseIntFromHex(match[3] + match[3]),
            a: convertHexToDecimal(match[4] + match[4]),
            format: named ? 'name' : 'hex8',
        };
    }
    match = matchers.hex3.exec(color);
    if (match) {
        return {
            r: parseIntFromHex(match[1] + match[1]),
            g: parseIntFromHex(match[2] + match[2]),
            b: parseIntFromHex(match[3] + match[3]),
            format: named ? 'name' : 'hex',
        };
    }
    return false;
}
/**
 * Check to see if it looks like a CSS unit
 * (see `matchers` above for definition).
 */
function isValidCSSUnit(color) {
    return Boolean(matchers.CSS_UNIT.exec(String(color)));
}

var TinyColor = /** @class */ (function () {
    function TinyColor(color, opts) {
        if (color === void 0) { color = ''; }
        if (opts === void 0) { opts = {}; }
        var _a;
        // If input is already a tinycolor, return itself
        if (color instanceof TinyColor) {
            // eslint-disable-next-line no-constructor-return
            return color;
        }
        if (typeof color === 'number') {
            color = numberInputToObject(color);
        }
        this.originalInput = color;
        var rgb = inputToRGB(color);
        this.originalInput = color;
        this.r = rgb.r;
        this.g = rgb.g;
        this.b = rgb.b;
        this.a = rgb.a;
        this.roundA = Math.round(100 * this.a) / 100;
        this.format = (_a = opts.format) !== null && _a !== void 0 ? _a : rgb.format;
        this.gradientType = opts.gradientType;
        // Don't let the range of [0,255] come back in [0,1].
        // Potentially lose a little bit of precision here, but will fix issues where
        // .5 gets interpreted as half of the total, instead of half of 1
        // If it was supposed to be 128, this was already taken care of by `inputToRgb`
        if (this.r < 1) {
            this.r = Math.round(this.r);
        }
        if (this.g < 1) {
            this.g = Math.round(this.g);
        }
        if (this.b < 1) {
            this.b = Math.round(this.b);
        }
        this.isValid = rgb.ok;
    }
    TinyColor.prototype.isDark = function () {
        return this.getBrightness() < 128;
    };
    TinyColor.prototype.isLight = function () {
        return !this.isDark();
    };
    /**
     * Returns the perceived brightness of the color, from 0-255.
     */
    TinyColor.prototype.getBrightness = function () {
        // http://www.w3.org/TR/AERT#color-contrast
        var rgb = this.toRgb();
        return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
    };
    /**
     * Returns the perceived luminance of a color, from 0-1.
     */
    TinyColor.prototype.getLuminance = function () {
        // http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
        var rgb = this.toRgb();
        var R;
        var G;
        var B;
        var RsRGB = rgb.r / 255;
        var GsRGB = rgb.g / 255;
        var BsRGB = rgb.b / 255;
        if (RsRGB <= 0.03928) {
            R = RsRGB / 12.92;
        }
        else {
            // eslint-disable-next-line prefer-exponentiation-operator
            R = Math.pow((RsRGB + 0.055) / 1.055, 2.4);
        }
        if (GsRGB <= 0.03928) {
            G = GsRGB / 12.92;
        }
        else {
            // eslint-disable-next-line prefer-exponentiation-operator
            G = Math.pow((GsRGB + 0.055) / 1.055, 2.4);
        }
        if (BsRGB <= 0.03928) {
            B = BsRGB / 12.92;
        }
        else {
            // eslint-disable-next-line prefer-exponentiation-operator
            B = Math.pow((BsRGB + 0.055) / 1.055, 2.4);
        }
        return 0.2126 * R + 0.7152 * G + 0.0722 * B;
    };
    /**
     * Returns the alpha value of a color, from 0-1.
     */
    TinyColor.prototype.getAlpha = function () {
        return this.a;
    };
    /**
     * Sets the alpha value on the current color.
     *
     * @param alpha - The new alpha value. The accepted range is 0-1.
     */
    TinyColor.prototype.setAlpha = function (alpha) {
        this.a = boundAlpha(alpha);
        this.roundA = Math.round(100 * this.a) / 100;
        return this;
    };
    /**
     * Returns the object as a HSVA object.
     */
    TinyColor.prototype.toHsv = function () {
        var hsv = rgbToHsv(this.r, this.g, this.b);
        return { h: hsv.h * 360, s: hsv.s, v: hsv.v, a: this.a };
    };
    /**
     * Returns the hsva values interpolated into a string with the following format:
     * "hsva(xxx, xxx, xxx, xx)".
     */
    TinyColor.prototype.toHsvString = function () {
        var hsv = rgbToHsv(this.r, this.g, this.b);
        var h = Math.round(hsv.h * 360);
        var s = Math.round(hsv.s * 100);
        var v = Math.round(hsv.v * 100);
        return this.a === 1 ? "hsv(" + h + ", " + s + "%, " + v + "%)" : "hsva(" + h + ", " + s + "%, " + v + "%, " + this.roundA + ")";
    };
    /**
     * Returns the object as a HSLA object.
     */
    TinyColor.prototype.toHsl = function () {
        var hsl = rgbToHsl(this.r, this.g, this.b);
        return { h: hsl.h * 360, s: hsl.s, l: hsl.l, a: this.a };
    };
    /**
     * Returns the hsla values interpolated into a string with the following format:
     * "hsla(xxx, xxx, xxx, xx)".
     */
    TinyColor.prototype.toHslString = function () {
        var hsl = rgbToHsl(this.r, this.g, this.b);
        var h = Math.round(hsl.h * 360);
        var s = Math.round(hsl.s * 100);
        var l = Math.round(hsl.l * 100);
        return this.a === 1 ? "hsl(" + h + ", " + s + "%, " + l + "%)" : "hsla(" + h + ", " + s + "%, " + l + "%, " + this.roundA + ")";
    };
    /**
     * Returns the hex value of the color.
     * @param allow3Char will shorten hex value to 3 char if possible
     */
    TinyColor.prototype.toHex = function (allow3Char) {
        if (allow3Char === void 0) { allow3Char = false; }
        return rgbToHex(this.r, this.g, this.b, allow3Char);
    };
    /**
     * Returns the hex value of the color -with a # appened.
     * @param allow3Char will shorten hex value to 3 char if possible
     */
    TinyColor.prototype.toHexString = function (allow3Char) {
        if (allow3Char === void 0) { allow3Char = false; }
        return '#' + this.toHex(allow3Char);
    };
    /**
     * Returns the hex 8 value of the color.
     * @param allow4Char will shorten hex value to 4 char if possible
     */
    TinyColor.prototype.toHex8 = function (allow4Char) {
        if (allow4Char === void 0) { allow4Char = false; }
        return rgbaToHex(this.r, this.g, this.b, this.a, allow4Char);
    };
    /**
     * Returns the hex 8 value of the color -with a # appened.
     * @param allow4Char will shorten hex value to 4 char if possible
     */
    TinyColor.prototype.toHex8String = function (allow4Char) {
        if (allow4Char === void 0) { allow4Char = false; }
        return '#' + this.toHex8(allow4Char);
    };
    /**
     * Returns the object as a RGBA object.
     */
    TinyColor.prototype.toRgb = function () {
        return {
            r: Math.round(this.r),
            g: Math.round(this.g),
            b: Math.round(this.b),
            a: this.a,
        };
    };
    /**
     * Returns the RGBA values interpolated into a string with the following format:
     * "RGBA(xxx, xxx, xxx, xx)".
     */
    TinyColor.prototype.toRgbString = function () {
        var r = Math.round(this.r);
        var g = Math.round(this.g);
        var b = Math.round(this.b);
        return this.a === 1 ? "rgb(" + r + ", " + g + ", " + b + ")" : "rgba(" + r + ", " + g + ", " + b + ", " + this.roundA + ")";
    };
    /**
     * Returns the object as a RGBA object.
     */
    TinyColor.prototype.toPercentageRgb = function () {
        var fmt = function (x) { return Math.round(bound01(x, 255) * 100) + "%"; };
        return {
            r: fmt(this.r),
            g: fmt(this.g),
            b: fmt(this.b),
            a: this.a,
        };
    };
    /**
     * Returns the RGBA relative values interpolated into a string
     */
    TinyColor.prototype.toPercentageRgbString = function () {
        var rnd = function (x) { return Math.round(bound01(x, 255) * 100); };
        return this.a === 1
            ? "rgb(" + rnd(this.r) + "%, " + rnd(this.g) + "%, " + rnd(this.b) + "%)"
            : "rgba(" + rnd(this.r) + "%, " + rnd(this.g) + "%, " + rnd(this.b) + "%, " + this.roundA + ")";
    };
    /**
     * The 'real' name of the color -if there is one.
     */
    TinyColor.prototype.toName = function () {
        if (this.a === 0) {
            return 'transparent';
        }
        if (this.a < 1) {
            return false;
        }
        var hex = '#' + rgbToHex(this.r, this.g, this.b, false);
        for (var _i = 0, _a = Object.entries(names); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            if (hex === value) {
                return key;
            }
        }
        return false;
    };
    /**
     * String representation of the color.
     *
     * @param format - The format to be used when displaying the string representation.
     */
    TinyColor.prototype.toString = function (format) {
        var formatSet = Boolean(format);
        format = format !== null && format !== void 0 ? format : this.format;
        var formattedString = false;
        var hasAlpha = this.a < 1 && this.a >= 0;
        var needsAlphaFormat = !formatSet && hasAlpha && (format.startsWith('hex') || format === 'name');
        if (needsAlphaFormat) {
            // Special case for "transparent", all other non-alpha formats
            // will return rgba when there is transparency.
            if (format === 'name' && this.a === 0) {
                return this.toName();
            }
            return this.toRgbString();
        }
        if (format === 'rgb') {
            formattedString = this.toRgbString();
        }
        if (format === 'prgb') {
            formattedString = this.toPercentageRgbString();
        }
        if (format === 'hex' || format === 'hex6') {
            formattedString = this.toHexString();
        }
        if (format === 'hex3') {
            formattedString = this.toHexString(true);
        }
        if (format === 'hex4') {
            formattedString = this.toHex8String(true);
        }
        if (format === 'hex8') {
            formattedString = this.toHex8String();
        }
        if (format === 'name') {
            formattedString = this.toName();
        }
        if (format === 'hsl') {
            formattedString = this.toHslString();
        }
        if (format === 'hsv') {
            formattedString = this.toHsvString();
        }
        return formattedString || this.toHexString();
    };
    TinyColor.prototype.toNumber = function () {
        return (Math.round(this.r) << 16) + (Math.round(this.g) << 8) + Math.round(this.b);
    };
    TinyColor.prototype.clone = function () {
        return new TinyColor(this.toString());
    };
    /**
     * Lighten the color a given amount. Providing 100 will always return white.
     * @param amount - valid between 1-100
     */
    TinyColor.prototype.lighten = function (amount) {
        if (amount === void 0) { amount = 10; }
        var hsl = this.toHsl();
        hsl.l += amount / 100;
        hsl.l = clamp01(hsl.l);
        return new TinyColor(hsl);
    };
    /**
     * Brighten the color a given amount, from 0 to 100.
     * @param amount - valid between 1-100
     */
    TinyColor.prototype.brighten = function (amount) {
        if (amount === void 0) { amount = 10; }
        var rgb = this.toRgb();
        rgb.r = Math.max(0, Math.min(255, rgb.r - Math.round(255 * -(amount / 100))));
        rgb.g = Math.max(0, Math.min(255, rgb.g - Math.round(255 * -(amount / 100))));
        rgb.b = Math.max(0, Math.min(255, rgb.b - Math.round(255 * -(amount / 100))));
        return new TinyColor(rgb);
    };
    /**
     * Darken the color a given amount, from 0 to 100.
     * Providing 100 will always return black.
     * @param amount - valid between 1-100
     */
    TinyColor.prototype.darken = function (amount) {
        if (amount === void 0) { amount = 10; }
        var hsl = this.toHsl();
        hsl.l -= amount / 100;
        hsl.l = clamp01(hsl.l);
        return new TinyColor(hsl);
    };
    /**
     * Mix the color with pure white, from 0 to 100.
     * Providing 0 will do nothing, providing 100 will always return white.
     * @param amount - valid between 1-100
     */
    TinyColor.prototype.tint = function (amount) {
        if (amount === void 0) { amount = 10; }
        return this.mix('white', amount);
    };
    /**
     * Mix the color with pure black, from 0 to 100.
     * Providing 0 will do nothing, providing 100 will always return black.
     * @param amount - valid between 1-100
     */
    TinyColor.prototype.shade = function (amount) {
        if (amount === void 0) { amount = 10; }
        return this.mix('black', amount);
    };
    /**
     * Desaturate the color a given amount, from 0 to 100.
     * Providing 100 will is the same as calling greyscale
     * @param amount - valid between 1-100
     */
    TinyColor.prototype.desaturate = function (amount) {
        if (amount === void 0) { amount = 10; }
        var hsl = this.toHsl();
        hsl.s -= amount / 100;
        hsl.s = clamp01(hsl.s);
        return new TinyColor(hsl);
    };
    /**
     * Saturate the color a given amount, from 0 to 100.
     * @param amount - valid between 1-100
     */
    TinyColor.prototype.saturate = function (amount) {
        if (amount === void 0) { amount = 10; }
        var hsl = this.toHsl();
        hsl.s += amount / 100;
        hsl.s = clamp01(hsl.s);
        return new TinyColor(hsl);
    };
    /**
     * Completely desaturates a color into greyscale.
     * Same as calling `desaturate(100)`
     */
    TinyColor.prototype.greyscale = function () {
        return this.desaturate(100);
    };
    /**
     * Spin takes a positive or negative amount within [-360, 360] indicating the change of hue.
     * Values outside of this range will be wrapped into this range.
     */
    TinyColor.prototype.spin = function (amount) {
        var hsl = this.toHsl();
        var hue = (hsl.h + amount) % 360;
        hsl.h = hue < 0 ? 360 + hue : hue;
        return new TinyColor(hsl);
    };
    /**
     * Mix the current color a given amount with another color, from 0 to 100.
     * 0 means no mixing (return current color).
     */
    TinyColor.prototype.mix = function (color, amount) {
        if (amount === void 0) { amount = 50; }
        var rgb1 = this.toRgb();
        var rgb2 = new TinyColor(color).toRgb();
        var p = amount / 100;
        var rgba = {
            r: (rgb2.r - rgb1.r) * p + rgb1.r,
            g: (rgb2.g - rgb1.g) * p + rgb1.g,
            b: (rgb2.b - rgb1.b) * p + rgb1.b,
            a: (rgb2.a - rgb1.a) * p + rgb1.a,
        };
        return new TinyColor(rgba);
    };
    TinyColor.prototype.analogous = function (results, slices) {
        if (results === void 0) { results = 6; }
        if (slices === void 0) { slices = 30; }
        var hsl = this.toHsl();
        var part = 360 / slices;
        var ret = [this];
        for (hsl.h = (hsl.h - ((part * results) >> 1) + 720) % 360; --results;) {
            hsl.h = (hsl.h + part) % 360;
            ret.push(new TinyColor(hsl));
        }
        return ret;
    };
    /**
     * taken from https://github.com/infusion/jQuery-xcolor/blob/master/jquery.xcolor.js
     */
    TinyColor.prototype.complement = function () {
        var hsl = this.toHsl();
        hsl.h = (hsl.h + 180) % 360;
        return new TinyColor(hsl);
    };
    TinyColor.prototype.monochromatic = function (results) {
        if (results === void 0) { results = 6; }
        var hsv = this.toHsv();
        var h = hsv.h;
        var s = hsv.s;
        var v = hsv.v;
        var res = [];
        var modification = 1 / results;
        while (results--) {
            res.push(new TinyColor({ h: h, s: s, v: v }));
            v = (v + modification) % 1;
        }
        return res;
    };
    TinyColor.prototype.splitcomplement = function () {
        var hsl = this.toHsl();
        var h = hsl.h;
        return [
            this,
            new TinyColor({ h: (h + 72) % 360, s: hsl.s, l: hsl.l }),
            new TinyColor({ h: (h + 216) % 360, s: hsl.s, l: hsl.l }) ];
    };
    /**
     * Compute how the color would appear on a background
     */
    TinyColor.prototype.onBackground = function (background) {
        var fg = this.toRgb();
        var bg = new TinyColor(background).toRgb();
        return new TinyColor({
            r: bg.r + (fg.r - bg.r) * fg.a,
            g: bg.g + (fg.g - bg.g) * fg.a,
            b: bg.b + (fg.b - bg.b) * fg.a,
        });
    };
    /**
     * Alias for `polyad(3)`
     */
    TinyColor.prototype.triad = function () {
        return this.polyad(3);
    };
    /**
     * Alias for `polyad(4)`
     */
    TinyColor.prototype.tetrad = function () {
        return this.polyad(4);
    };
    /**
     * Get polyad colors, like (for 1, 2, 3, 4, 5, 6, 7, 8, etc...)
     * monad, dyad, triad, tetrad, pentad, hexad, heptad, octad, etc...
     */
    TinyColor.prototype.polyad = function (n) {
        var hsl = this.toHsl();
        var h = hsl.h;
        var result = [this];
        var increment = 360 / n;
        for (var i = 1; i < n; i++) {
            result.push(new TinyColor({ h: (h + i * increment) % 360, s: hsl.s, l: hsl.l }));
        }
        return result;
    };
    /**
     * compare color vs current color
     */
    TinyColor.prototype.equals = function (color) {
        return this.toRgbString() === new TinyColor(color).toRgbString();
    };
    return TinyColor;
}());

var hueStep = 2; // 色相阶梯

var saturationStep = 0.16; // 饱和度阶梯，浅色部分

var saturationStep2 = 0.05; // 饱和度阶梯，深色部分

var brightnessStep1 = 0.05; // 亮度阶梯，浅色部分

var brightnessStep2 = 0.15; // 亮度阶梯，深色部分

var lightColorCount = 5; // 浅色数量，主色上

var darkColorCount = 4; // 深色数量，主色下
// 暗色主题颜色映射关系表

var darkColorMap = [{
  index: 7,
  opacity: 0.15
}, {
  index: 6,
  opacity: 0.25
}, {
  index: 5,
  opacity: 0.3
}, {
  index: 5,
  opacity: 0.45
}, {
  index: 5,
  opacity: 0.65
}, {
  index: 5,
  opacity: 0.85
}, {
  index: 4,
  opacity: 0.9
}, {
  index: 3,
  opacity: 0.95
}, {
  index: 2,
  opacity: 0.97
}, {
  index: 1,
  opacity: 0.98
}];

function getHue(hsv, i, light) {
  var hue; // 根据色相不同，色相转向不同

  if (Math.round(hsv.h) >= 60 && Math.round(hsv.h) <= 240) {
    hue = light ? Math.round(hsv.h) - hueStep * i : Math.round(hsv.h) + hueStep * i;
  } else {
    hue = light ? Math.round(hsv.h) + hueStep * i : Math.round(hsv.h) - hueStep * i;
  }

  if (hue < 0) {
    hue += 360;
  } else if (hue >= 360) {
    hue -= 360;
  }

  return hue;
}

function getSaturation(hsv, i, light) {
  // grey color don't change saturation
  if (hsv.h === 0 && hsv.s === 0) {
    return hsv.s;
  }

  var saturation;

  if (light) {
    saturation = hsv.s - saturationStep * i;
  } else if (i === darkColorCount) {
    saturation = hsv.s + saturationStep;
  } else {
    saturation = hsv.s + saturationStep2 * i;
  } // 边界值修正


  if (saturation > 1) {
    saturation = 1;
  } // 第一格的 s 限制在 0.06-0.1 之间


  if (light && i === lightColorCount && saturation > 0.1) {
    saturation = 0.1;
  }

  if (saturation < 0.06) {
    saturation = 0.06;
  }

  return Number(saturation.toFixed(2));
}

function getValue(hsv, i, light) {
  var value;

  if (light) {
    value = hsv.v + brightnessStep1 * i;
  } else {
    value = hsv.v - brightnessStep2 * i;
  }

  if (value > 1) {
    value = 1;
  }

  return Number(value.toFixed(2));
}

function generate(color) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var patterns = [];
  var pColor = new TinyColor(color);

  for (var i = lightColorCount; i > 0; i -= 1) {
    var hsv = pColor.toHsv();
    var colorString = new TinyColor({
      h: getHue(hsv, i, true),
      s: getSaturation(hsv, i, true),
      v: getValue(hsv, i, true)
    }).toHexString();
    patterns.push(colorString);
  }

  patterns.push(pColor.toHexString());

  for (var _i = 1; _i <= darkColorCount; _i += 1) {
    var _hsv = pColor.toHsv();

    var _colorString = new TinyColor({
      h: getHue(_hsv, _i),
      s: getSaturation(_hsv, _i),
      v: getValue(_hsv, _i)
    }).toHexString();

    patterns.push(_colorString);
  } // dark theme patterns


  if (opts.theme === 'dark') {
    return darkColorMap.map(function (_ref) {
      var index = _ref.index,
          opacity = _ref.opacity;
      var darkColorString = new TinyColor(opts.backgroundColor || '#141414').mix(patterns[index], opacity * 100).toHexString();
      return darkColorString;
    });
  }

  return patterns;
}

var presetPrimaryColors = {
  red: '#F5222D',
  volcano: '#FA541C',
  orange: '#FA8C16',
  gold: '#FAAD14',
  yellow: '#FADB14',
  lime: '#A0D911',
  green: '#52C41A',
  cyan: '#13C2C2',
  blue: '#1890FF',
  geekblue: '#2F54EB',
  purple: '#722ED1',
  magenta: '#EB2F96',
  grey: '#666666'
};
var presetPalettes = {};
var presetDarkPalettes = {};
Object.keys(presetPrimaryColors).forEach(function (key) {
  presetPalettes[key] = generate(presetPrimaryColors[key]);
  presetPalettes[key].primary = presetPalettes[key][5]; // dark presetPalettes

  presetDarkPalettes[key] = generate(presetPrimaryColors[key], {
    theme: 'dark',
    backgroundColor: '#141414'
  });
  presetDarkPalettes[key].primary = presetDarkPalettes[key][5];
});

/* eslint-disable no-console */
var warned = {};
function warning(valid, message) {
  // Support uglify
  if (process.env.NODE_ENV !== 'production' && !valid && console !== undefined) {
    console.error("Warning: ".concat(message));
  }
}
function call(method, valid, message) {
  if (!valid && !warned[message]) {
    method(false, message);
    warned[message] = true;
  }
}
function warningOnce(valid, message) {
  call(warning, valid, message);
}
/* eslint-enable */

var containers = []; // will store container HTMLElement references
var styleElements = []; // will store {prepend: HTMLElement, append: HTMLElement}

var usage = 'insert-css: You need to provide a CSS string. Usage: insertCss(cssString[, options]).';

function insertCss(css, options) {
    options = options || {};

    if (css === undefined) {
        throw new Error(usage);
    }

    var position = options.prepend === true ? 'prepend' : 'append';
    var container = options.container !== undefined ? options.container : document.querySelector('head');
    var containerId = containers.indexOf(container);

    // first time we see this container, create the necessary entries
    if (containerId === -1) {
        containerId = containers.push(container) - 1;
        styleElements[containerId] = {};
    }

    // try to get the correponding container + position styleElement, create it otherwise
    var styleElement;

    if (styleElements[containerId] !== undefined && styleElements[containerId][position] !== undefined) {
        styleElement = styleElements[containerId][position];
    } else {
        styleElement = styleElements[containerId][position] = createStyleElement();

        if (position === 'prepend') {
            container.insertBefore(styleElement, container.childNodes[0]);
        } else {
            container.appendChild(styleElement);
        }
    }

    // strip potential UTF-8 BOM if css was read from a file
    if (css.charCodeAt(0) === 0xFEFF) { css = css.substr(1, css.length); }

    // actually add the stylesheet
    if (styleElement.styleSheet) {
        styleElement.styleSheet.cssText += css;
    } else {
        styleElement.textContent += css;
    }

    return styleElement;
}
function createStyleElement() {
    var styleElement = document.createElement('style');
    styleElement.setAttribute('type', 'text/css');
    return styleElement;
}

var insertCss_1 = insertCss;
var insertCss_2 = insertCss;
insertCss_1.insertCss = insertCss_2;

function warning$1(valid, message) {
  warningOnce(valid, "[@ant-design/icons] ".concat(message));
}
function isIconDefinition(target) {
  return _typeof(target) === 'object' && typeof target.name === 'string' && typeof target.theme === 'string' && (_typeof(target.icon) === 'object' || typeof target.icon === 'function');
}
function normalizeAttrs() {
  var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return Object.keys(attrs).reduce(function (acc, key) {
    var val = attrs[key];

    switch (key) {
      case 'class':
        acc.className = val;
        delete acc.class;
        break;

      default:
        acc[key] = val;
    }

    return acc;
  }, {});
}
function generate$1(node, key, rootProps) {
  if (!rootProps) {
    return /*#__PURE__*/React__default.createElement(node.tag, _objectSpread2({
      key: key
    }, normalizeAttrs(node.attrs)), (node.children || []).map(function (child, index) {
      return generate$1(child, "".concat(key, "-").concat(node.tag, "-").concat(index));
    }));
  }

  return /*#__PURE__*/React__default.createElement(node.tag, _objectSpread2(_objectSpread2({
    key: key
  }, normalizeAttrs(node.attrs)), rootProps), (node.children || []).map(function (child, index) {
    return generate$1(child, "".concat(key, "-").concat(node.tag, "-").concat(index));
  }));
}
function getSecondaryColor(primaryColor) {
  // choose the second color
  return generate(primaryColor)[0];
}
function normalizeTwoToneColors(twoToneColor) {
  if (!twoToneColor) {
    return [];
  }

  return Array.isArray(twoToneColor) ? twoToneColor : [twoToneColor];
} // These props make sure that the SVG behaviours like general text.
var iconStyles = "\n.anticon {\n  display: inline-block;\n  color: inherit;\n  font-style: normal;\n  line-height: 0;\n  text-align: center;\n  text-transform: none;\n  vertical-align: -0.125em;\n  text-rendering: optimizeLegibility;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\n.anticon > * {\n  line-height: 1;\n}\n\n.anticon svg {\n  display: inline-block;\n}\n\n.anticon::before {\n  display: none;\n}\n\n.anticon .anticon-icon {\n  display: block;\n}\n\n.anticon[tabindex] {\n  cursor: pointer;\n}\n\n.anticon-spin::before,\n.anticon-spin {\n  display: inline-block;\n  -webkit-animation: loadingCircle 1s infinite linear;\n  animation: loadingCircle 1s infinite linear;\n}\n\n@-webkit-keyframes loadingCircle {\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n\n@keyframes loadingCircle {\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n";
var cssInjectedFlag = false;
var useInsertStyles = function useInsertStyles() {
  var styleStr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : iconStyles;
  useEffect(function () {
    if (!cssInjectedFlag) {
      insertCss_2(styleStr, {
        prepend: true
      });
      cssInjectedFlag = true;
    }
  }, []);
};

var twoToneColorPalette = {
  primaryColor: '#333',
  secondaryColor: '#E6E6E6',
  calculated: false
};

function setTwoToneColors(_ref) {
  var primaryColor = _ref.primaryColor,
      secondaryColor = _ref.secondaryColor;
  twoToneColorPalette.primaryColor = primaryColor;
  twoToneColorPalette.secondaryColor = secondaryColor || getSecondaryColor(primaryColor);
  twoToneColorPalette.calculated = !!secondaryColor;
}

function getTwoToneColors() {
  return _objectSpread2({}, twoToneColorPalette);
}

var IconBase = function IconBase(props) {
  var icon = props.icon,
      className = props.className,
      onClick = props.onClick,
      style = props.style,
      primaryColor = props.primaryColor,
      secondaryColor = props.secondaryColor,
      restProps = _objectWithoutProperties(props, ["icon", "className", "onClick", "style", "primaryColor", "secondaryColor"]);

  var colors = twoToneColorPalette;

  if (primaryColor) {
    colors = {
      primaryColor: primaryColor,
      secondaryColor: secondaryColor || getSecondaryColor(primaryColor)
    };
  }

  useInsertStyles();
  warning$1(isIconDefinition(icon), "icon should be icon definiton, but got ".concat(icon));

  if (!isIconDefinition(icon)) {
    return null;
  }

  var target = icon;

  if (target && typeof target.icon === 'function') {
    target = _objectSpread2(_objectSpread2({}, target), {}, {
      icon: target.icon(colors.primaryColor, colors.secondaryColor)
    });
  }

  return generate$1(target.icon, "svg-".concat(target.name), _objectSpread2({
    className: className,
    onClick: onClick,
    style: style,
    'data-icon': target.name,
    width: '1em',
    height: '1em',
    fill: 'currentColor',
    'aria-hidden': 'true'
  }, restProps));
};

IconBase.displayName = 'IconReact';
IconBase.getTwoToneColors = getTwoToneColors;
IconBase.setTwoToneColors = setTwoToneColors;

function setTwoToneColor(twoToneColor) {
  var _normalizeTwoToneColo = normalizeTwoToneColors(twoToneColor),
      _normalizeTwoToneColo2 = _slicedToArray$1(_normalizeTwoToneColo, 2),
      primaryColor = _normalizeTwoToneColo2[0],
      secondaryColor = _normalizeTwoToneColo2[1];

  return IconBase.setTwoToneColors({
    primaryColor: primaryColor,
    secondaryColor: secondaryColor
  });
}
function getTwoToneColor() {
  var colors = IconBase.getTwoToneColors();

  if (!colors.calculated) {
    return colors.primaryColor;
  }

  return [colors.primaryColor, colors.secondaryColor];
}

// should move it to antd main repo?

setTwoToneColor('#1890ff');
var Icon = /*#__PURE__*/forwardRef(function (props, ref) {
  var className = props.className,
      icon = props.icon,
      spin = props.spin,
      rotate = props.rotate,
      tabIndex = props.tabIndex,
      onClick = props.onClick,
      twoToneColor = props.twoToneColor,
      restProps = _objectWithoutProperties(props, ["className", "icon", "spin", "rotate", "tabIndex", "onClick", "twoToneColor"]);

  var classString = classnames('anticon', _defineProperty$1({}, "anticon-".concat(icon.name), Boolean(icon.name)), {
    'anticon-spin': !!spin || icon.name === 'loading'
  }, className);
  var iconTabIndex = tabIndex;

  if (iconTabIndex === undefined && onClick) {
    iconTabIndex = -1;
  }

  var svgStyle = rotate ? {
    msTransform: "rotate(".concat(rotate, "deg)"),
    transform: "rotate(".concat(rotate, "deg)")
  } : undefined;

  var _normalizeTwoToneColo = normalizeTwoToneColors(twoToneColor),
      _normalizeTwoToneColo2 = _slicedToArray$1(_normalizeTwoToneColo, 2),
      primaryColor = _normalizeTwoToneColo2[0],
      secondaryColor = _normalizeTwoToneColo2[1];

  return /*#__PURE__*/createElement("span", Object.assign({
    role: "img",
    "aria-label": icon.name
  }, restProps, {
    ref: ref,
    tabIndex: iconTabIndex,
    onClick: onClick,
    className: classString
  }), /*#__PURE__*/createElement(IconBase, {
    icon: icon,
    primaryColor: primaryColor,
    secondaryColor: secondaryColor,
    style: svgStyle
  }));
});
Icon.displayName = 'AntdIcon';
Icon.getTwoToneColor = getTwoToneColor;
Icon.setTwoToneColor = setTwoToneColor;

// This icon file is generated automatically.
var DownloadOutlined = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M505.7 661a8 8 0 0012.6 0l112-141.7c4.1-5.2.4-12.9-6.3-12.9h-74.1V168c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v338.3H400c-6.7 0-10.4 7.7-6.3 12.9l112 141.8zM878 626h-60c-4.4 0-8 3.6-8 8v154H214V634c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v198c0 17.7 14.3 32 32 32h684c17.7 0 32-14.3 32-32V634c0-4.4-3.6-8-8-8z" } }] }, "name": "download", "theme": "outlined" };

// GENERATE BY ./scripts/generate.ts

var DownloadOutlined$1 = function DownloadOutlined$1(props, ref) {
  return /*#__PURE__*/createElement(Icon, Object.assign({}, props, {
    ref: ref,
    icon: DownloadOutlined
  }));
};

DownloadOutlined$1.displayName = 'DownloadOutlined';
var DownloadOutlined$2 = /*#__PURE__*/forwardRef(DownloadOutlined$1);

// This icon file is generated automatically.
var EnvironmentOutlined = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M854.6 289.1a362.49 362.49 0 00-79.9-115.7 370.83 370.83 0 00-118.2-77.8C610.7 76.6 562.1 67 512 67c-50.1 0-98.7 9.6-144.5 28.5-44.3 18.3-84 44.5-118.2 77.8A363.6 363.6 0 00169.4 289c-19.5 45-29.4 92.8-29.4 142 0 70.6 16.9 140.9 50.1 208.7 26.7 54.5 64 107.6 111 158.1 80.3 86.2 164.5 138.9 188.4 153a43.9 43.9 0 0022.4 6.1c7.8 0 15.5-2 22.4-6.1 23.9-14.1 108.1-66.8 188.4-153 47-50.4 84.3-103.6 111-158.1C867.1 572 884 501.8 884 431.1c0-49.2-9.9-97-29.4-142zM512 880.2c-65.9-41.9-300-207.8-300-449.1 0-77.9 31.1-151.1 87.6-206.3C356.3 169.5 431.7 139 512 139s155.7 30.5 212.4 85.9C780.9 280 812 353.2 812 431.1c0 241.3-234.1 407.2-300 449.1zm0-617.2c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm79.2 255.2A111.6 111.6 0 01512 551c-29.9 0-58-11.7-79.2-32.8A111.6 111.6 0 01400 439c0-29.9 11.7-58 32.8-79.2C454 338.6 482.1 327 512 327c29.9 0 58 11.6 79.2 32.8C612.4 381 624 409.1 624 439c0 29.9-11.6 58-32.8 79.2z" } }] }, "name": "environment", "theme": "outlined" };

// GENERATE BY ./scripts/generate.ts

var EnvironmentOutlined$1 = function EnvironmentOutlined$1(props, ref) {
  return /*#__PURE__*/createElement(Icon, Object.assign({}, props, {
    ref: ref,
    icon: EnvironmentOutlined
  }));
};

EnvironmentOutlined$1.displayName = 'EnvironmentOutlined';
var EnvironmentOutlined$2 = /*#__PURE__*/forwardRef(EnvironmentOutlined$1);

// This icon file is generated automatically.
var LeftOutlined = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z" } }] }, "name": "left", "theme": "outlined" };

// GENERATE BY ./scripts/generate.ts

var LeftOutlined$1 = function LeftOutlined$1(props, ref) {
  return /*#__PURE__*/createElement(Icon, Object.assign({}, props, {
    ref: ref,
    icon: LeftOutlined
  }));
};

LeftOutlined$1.displayName = 'LeftOutlined';
var LeftOutlined$2 = /*#__PURE__*/forwardRef(LeftOutlined$1);

// This icon file is generated automatically.
var PlusOutlined = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "defs", "attrs": {}, "children": [{ "tag": "style", "attrs": {} }] }, { "tag": "path", "attrs": { "d": "M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z" } }, { "tag": "path", "attrs": { "d": "M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z" } }] }, "name": "plus", "theme": "outlined" };

// GENERATE BY ./scripts/generate.ts

var PlusOutlined$1 = function PlusOutlined$1(props, ref) {
  return /*#__PURE__*/createElement(Icon, Object.assign({}, props, {
    ref: ref,
    icon: PlusOutlined
  }));
};

PlusOutlined$1.displayName = 'PlusOutlined';
var PlusOutlined$2 = /*#__PURE__*/forwardRef(PlusOutlined$1);

// This icon file is generated automatically.
var RollbackOutlined = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M793 242H366v-74c0-6.7-7.7-10.4-12.9-6.3l-142 112a8 8 0 000 12.6l142 112c5.2 4.1 12.9.4 12.9-6.3v-74h415v470H175c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h618c35.3 0 64-28.7 64-64V306c0-35.3-28.7-64-64-64z" } }] }, "name": "rollback", "theme": "outlined" };

// GENERATE BY ./scripts/generate.ts

var RollbackOutlined$1 = function RollbackOutlined$1(props, ref) {
  return /*#__PURE__*/createElement(Icon, Object.assign({}, props, {
    ref: ref,
    icon: RollbackOutlined
  }));
};

RollbackOutlined$1.displayName = 'RollbackOutlined';
var RollbackOutlined$2 = /*#__PURE__*/forwardRef(RollbackOutlined$1);

// This icon file is generated automatically.
var SearchOutlined = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z" } }] }, "name": "search", "theme": "outlined" };

// GENERATE BY ./scripts/generate.ts

var SearchOutlined$1 = function SearchOutlined$1(props, ref) {
  return /*#__PURE__*/createElement(Icon, Object.assign({}, props, {
    ref: ref,
    icon: SearchOutlined
  }));
};

SearchOutlined$1.displayName = 'SearchOutlined';
var SearchOutlined$2 = /*#__PURE__*/forwardRef(SearchOutlined$1);

function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) { return false; } if (Reflect.construct.sham) { return false; } if (typeof Proxy === "function") { return true; } try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var assign = require("object-assign");

var AttributesFillter = /*#__PURE__*/function (_Component) {
  inherits(AttributesFillter, _Component);

  var _super = _createSuper$1(AttributesFillter);

  function AttributesFillter() {
    var arguments$1 = arguments;

    var _this;

    classCallCheck(this, AttributesFillter);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments$1[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    defineProperty(assertThisInitialized(_this), "state", {
      filterlistshow: true,
      sel_filter_list: [],
      sel_filter_field: "",
      sel_filter_value: null,
      sel_filter_rel: {
        value: "equal",
        children: "等于"
      },
      sel_data_title: ""
    });

    defineProperty(assertThisInitialized(_this), "_renderFilterTags", function () {
      return _this.state.sel_filter_list.map(function (filter, index) {
        return /*#__PURE__*/React__default.createElement(Tag, {
          key: index,
          color: "#9cc177",
          closable: true,
          onClose: function onClose() {
            return _this.filterDelete(index);
          }
        }, filter.sel_filter_field, " ", filter.sel_filter_rel.children, " ", filter.sel_filter_value);
      });
    });

    defineProperty(assertThisInitialized(_this), "filterValueChange", function (value) {
      _this.setState({
        sel_filter_value: value
      });
    });

    defineProperty(assertThisInitialized(_this), "filterDelete", function (i) {
      var oldstate = assign({}, _this.state);
      var sel_filter_list = oldstate.sel_filter_list.filter(function (e, index) {
        return index !== i;
      });

      _this.setState({
        sel_filter_list: sel_filter_list
      }, _this.Update);
    });

    defineProperty(assertThisInitialized(_this), "onSelectFilterField", function (item) {
      _this.setState({
        sel_filter_field: item.name,
        sel_filter_field_type: item.type,
        filterlistshow: false
      });
    });

    defineProperty(assertThisInitialized(_this), "onAddFilter", function () {
      var oldstate = assign({}, _this.state);
      oldstate.sel_filter_list.push({
        sel_filter_field: oldstate.sel_filter_field,
        sel_filter_field_type: oldstate.sel_filter_field_type,
        sel_filter_rel: oldstate.sel_filter_rel,
        sel_filter_value: oldstate.sel_filter_value
      });

      _this.setState({
        sel_filter_field: null,
        sel_filter_field_type: null,
        sel_filter_rel: {
          value: "equal",
          children: "等于"
        },
        sel_filter_value: null,
        filterlistshow: true,
        sel_filter_list: oldstate.sel_filter_list
      }, _this.Update);
    });

    return _this;
  }

  createClass(AttributesFillter, [{
    key: "Update",

    /**
     *注册更新
     *
     * @memberof AttributesFillter
     */
    value: function Update() {
      var sel_filter_list = this.state.sel_filter_list;
      this.props.onChange({
        filterlist: sel_filter_list
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state = this.state,
          filterlistshow = _this$state.filterlistshow,
          sel_filter_list = _this$state.sel_filter_list,
          sel_filter_field = _this$state.sel_filter_field,
          sel_filter_field_type = _this$state.sel_filter_field_type,
          sel_filter_rel = _this$state.sel_filter_rel;
      return /*#__PURE__*/React__default.createElement("div", {
        className: "attr_filter"
      }, this._renderFilterTags(), sel_filter_list.length === 0 && /*#__PURE__*/React__default.createElement("span", {
        className: "itemlabel",
        style: {
          color: "#9cc177"
        }
      }, "\u6DFB\u52A0\u7B5B\u9009\u6761\u4EF6"), /*#__PURE__*/React__default.createElement(Popover, {
        placement: "bottom",
        overlayClassName: "querybuilder_popover",
        title: filterlistshow ? "" : /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement("a", {
          style: {
            margin: "0 2px 0 -10px"
          },
          onClick: function onClick() {
            _this2.setState({
              filterlistshow: true
            });
          }
        }, /*#__PURE__*/React__default.createElement(LeftOutlined$2, null)), sel_filter_field, sel_filter_field_type === "esriFieldTypeString" ? /*#__PURE__*/React__default.createElement(Select, {
          defaultValue: "equal",
          onChange: function onChange(value, option) {
            _this2.setState({
              sel_filter_rel: option.props
            });
          },
          style: {
            width: 100
          }
        }, /*#__PURE__*/React__default.createElement(Select.Option, {
          value: "equal"
        }, "\u7B49\u4E8E"), /*#__PURE__*/React__default.createElement(Select.Option, {
          value: "notequal"
        }, "\u4E0D\u7B49\u4E8E"), /*#__PURE__*/React__default.createElement(Select.Option, {
          value: "contain"
        }, "\u5305\u542B")) : /*#__PURE__*/React__default.createElement(Select, {
          defaultValue: "equal",
          onChange: function onChange(value, option) {
            _this2.setState({
              sel_filter_rel: option.props
            });
          },
          style: {
            width: 100
          }
        }, /*#__PURE__*/React__default.createElement(Select.Option, {
          value: "equal"
        }, "\u7B49\u4E8E"), /*#__PURE__*/React__default.createElement(Select.Option, {
          value: "notequal"
        }, "\u4E0D\u7B49\u4E8E"), /*#__PURE__*/React__default.createElement(Select.Option, {
          value: "bigger"
        }, "\u5927\u4E8E"), /*#__PURE__*/React__default.createElement(Select.Option, {
          value: "smaller"
        }, "\u5C0F\u4E8E"), /*#__PURE__*/React__default.createElement(Select.Option, {
          value: "between"
        }, "\u4ECB\u4E8E\u4E4B\u95F4"), /*#__PURE__*/React__default.createElement(Select.Option, {
          value: "null"
        }, "\u4E3A\u7A7A"), /*#__PURE__*/React__default.createElement(Select.Option, {
          value: "notnull"
        }, "\u4E0D\u4E3A\u7A7A"))),
        content: filterlistshow ? /*#__PURE__*/React__default.createElement(List, {
          className: "field_listitem",
          itemLayout: "horizontal",
          split: false,
          dataSource: this.props.fieldTypes ? this.props.fieldTypes.filter(function (e) {
            return e.type === "esriFieldTypeString";
          }) : [],
          renderItem: function renderItem(item) {
            return /*#__PURE__*/React__default.createElement(List.Item, {
              onClick: function onClick() {
                return _this2.onSelectFilterField(item);
              }
            }, /*#__PURE__*/React__default.createElement(List.Item.Meta, {
              avatar: /*#__PURE__*/React__default.createElement(Tag, {
                color: "rgb(156, 193, 119)"
              }, /*#__PURE__*/React__default.createElement("i", {
                className: "iconfont ".concat(item.type === "esriFieldTypeString" ? "icon-Abc1" : "icon-number")
              })),
              title: /*#__PURE__*/React__default.createElement("a", null, item.alias)
            }));
          }
        }) : /*#__PURE__*/React__default.createElement("div", null, sel_filter_field_type === "esriFieldTypeString" ? /*#__PURE__*/React__default.createElement(Input, {
          style: {
            width: "100%"
          },
          size: "large",
          onChange: function onChange(e) {
            return _this2.filterValueChange(e.target.value);
          },
          placeholder: "\u8F93\u5165\u503C"
        }) : sel_filter_rel.value === "between" ? /*#__PURE__*/React__default.createElement(Input.Group, {
          compact: true
        }, /*#__PURE__*/React__default.createElement(InputNumber, {
          style: {
            width: "auto",
            textAlign: "center"
          },
          placeholder: "\u6700\u5C0F\u503C"
        }), /*#__PURE__*/React__default.createElement(Input, {
          style: {
            width: 30,
            borderLeft: 0,
            pointerEvents: "none",
            backgroundColor: "#fff"
          },
          placeholder: "~",
          disabled: true
        }), /*#__PURE__*/React__default.createElement(InputNumber, {
          style: {
            width: "auto",
            textAlign: "center",
            borderLeft: 0
          },
          placeholder: "\u6700\u5927\u503C"
        })) : sel_filter_rel.value === "null" || sel_filter_rel.value === "notnull" ? null : /*#__PURE__*/React__default.createElement(InputNumber, {
          style: {
            width: "100%"
          },
          onChange: this.filterValueChange
        }), /*#__PURE__*/React__default.createElement(Button, {
          onClick: this.onAddFilter,
          type: "primary"
        }, "\u6DFB\u52A0\u7B5B\u9009")),
        trigger: "click"
      }, /*#__PURE__*/React__default.createElement(Button, {
        icon: /*#__PURE__*/React__default.createElement(PlusOutlined$2, null)
      })));
    }
  }]);

  return AttributesFillter;
}(Component);

var SpatialQueryPanel = function SpatialQueryPanel(props) {
  var renderLayerSelectPanel = function renderLayerSelectPanel() {
    return props.selthemlist.length ? /*#__PURE__*/React__default.createElement(Radio.Group, {
      onChange: props.onLayerChange,
      value: props.querylayerid,
      buttonStyle: "solid"
    }, props.selthemlist.map(function (el) {
      return /*#__PURE__*/React__default.createElement(Radio.Button, {
        key: el.id,
        value: el.id
      }, el.name);
    })) : "请在资源目录选择图层";
  };

  return /*#__PURE__*/React__default.createElement(Card, {
    className: "spatial_query_card",
    id: "toolbar_card",
    bordered: false
  }, props.queryloading && /*#__PURE__*/React__default.createElement(Spin, {
    className: "query_spin",
    tip: "\u67E5\u8BE2\u4E2D..."
  }), /*#__PURE__*/React__default.createElement(Divider, {
    orientation: "left"
  }, "\u56FE\u5C42\u9009\u62E9"), renderLayerSelectPanel(), /*#__PURE__*/React__default.createElement(Divider, {
    orientation: "left"
  }, "\u7A7A\u95F4\u7C7B\u578B"), /*#__PURE__*/React__default.createElement(Button.Group, {
    className: "toolbar"
  }, /*#__PURE__*/React__default.createElement(Button, {
    onClick: function onClick() {
      return props.onSpatialQuery("point");
    }
  }, "\u70B9"), /*#__PURE__*/React__default.createElement(Button, {
    onClick: function onClick() {
      return props.onSpatialQuery("polyline");
    }
  }, "\u7EBF"), /*#__PURE__*/React__default.createElement(Button, {
    onClick: function onClick() {
      return props.onSpatialQuery("polygon");
    }
  }, "\u9762"), /*#__PURE__*/React__default.createElement(Button, {
    onClick: function onClick() {
      return props.onSpatialQuery("rectangle");
    }
  }, "\u77E9\u5F62")), /*#__PURE__*/React__default.createElement(Row, {
    className: "buffercontain"
  }, /*#__PURE__*/React__default.createElement(Checkbox, {
    onChange: function onChange(e) {
      return props.onCheckBuffer(e);
    }
  }, " \u7F13\u51B2\u533A "), /*#__PURE__*/React__default.createElement(InputNumber, {
    min: 100,
    value: props.bufferdistance,
    onChange: function onChange(e) {
      return props.onBufferChange(e);
    }
  }), " ", "\u7C73"), /*#__PURE__*/React__default.createElement(Divider, {
    orientation: "left"
  }, "\u5C5E\u6027\u67E5\u8BE2"), props.metaData && /*#__PURE__*/React__default.createElement(AttributesFillter, {
    fieldTypes: props.metaData.fields,
    onChange: function onChange(e) {
      return props.onQueryChange(e);
    }
  }), /*#__PURE__*/React__default.createElement(Button, {
    onClick: props.onClose,
    style: {
      "float": "right"
    }
  }, "\u5173\u95ED"), /*#__PURE__*/React__default.createElement(Button, {
    onClick: props.onClear,
    style: {
      "float": "right",
      right: 10
    },
    type: "primary"
  }, "\u6E05\u9664"), /*#__PURE__*/React__default.createElement(Button, {
    onClick: props.onSearch,
    style: {
      "float": "right",
      right: 20
    },
    type: "primary"
  }, "\u67E5\u8BE2"));
};

function _createSuper$2(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$2(); return function _createSuperInternal() { var Super = getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$2() { if (typeof Reflect === "undefined" || !Reflect.construct) { return false; } if (Reflect.construct.sham) { return false; } if (typeof Proxy === "function") { return true; } try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var SpatialQuery = /*#__PURE__*/function (_Component) {
  inherits(SpatialQuery, _Component);

  var _super = _createSuper$2(SpatialQuery);

  function SpatialQuery() {
    var arguments$1 = arguments;

    var _this;

    classCallCheck(this, SpatialQuery);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments$1[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    defineProperty(assertThisInitialized(_this), "state", {
      wherestr: null
    });

    defineProperty(assertThisInitialized(_this), "onSpatialQuery", function (type) {
      _this.props.drawActions.changeDrawingStatus("start", type, "spatial", [], {});
    });

    defineProperty(assertThisInitialized(_this), "onCheckBuffer", function (e) {
      _this.props.thematicActions.setBufferDistance(e.target.checked ? 100 : 0);
    });

    defineProperty(assertThisInitialized(_this), "onBufferChange", function (value) {
      _this.props.thematicActions.setBufferDistance(value);
    });

    defineProperty(assertThisInitialized(_this), "onQueryChange", function (query) {
      var filters = [];

      if (query.filterlist) {
        query.filterlist.forEach(function (filter) {
          switch (filter.sel_filter_rel.value) {
            case "equal":
              filters.push(filter.sel_filter_field + " = '" + filter.sel_filter_value + "'");
              break;

            case "notequal":
              filters.push(filter.sel_filter_field + " != '" + filter.sel_filter_value + "'");
              break;

            case "contain":
              filters.push(filter.sel_filter_field + " like '%" + filter.sel_filter_value + "%'");
              break;
          }
        });

        _this.setState({
          wherestr: filters.join(" and ")
        });
      }
    });

    defineProperty(assertThisInitialized(_this), "onLayerChange", function (e) {
      _this.onClear();

      _this.props.thematicActions.setSelectedQueryLayer(e.target.value);

      _this.props.thematicActions.queryThematicMetaData({
        url: mapConfigJson.mapserverurl,
        layerid: e.target.value
      });
    });

    defineProperty(assertThisInitialized(_this), "onSearch", function () {
      var _this$props$draw = _this.props.draw,
          drawOwner = _this$props$draw.drawOwner,
          drawMethod = _this$props$draw.drawMethod,
          geometry = _this$props$draw.geometry;
      var _this$props$thematics = _this.props.thematics,
          querylayerid = _this$props$thematics.querylayerid,
          themlist = _this$props$thematics.themlist,
          bufferdistance = _this$props$thematics.bufferdistance;
      var selectedThematic = themlist.filter(function (e) {
        return e.id === querylayerid;
      }); //属性查询

      if (_this.state.wherestr) {
        _this.props.thematicActions.queryThematic(selectedThematic[0].url, selectedThematic[0].layers, null, null, _this.state.wherestr);
      } //缓冲查询
      else if (drawOwner === "spatial" && geometry && bufferdistance) {
          var buffergeometry = turfbuffer(geometry, bufferdistance / 1000).geometry;
          var arcgisgeo = geojsonToArcGIS(buffergeometry);

          _this.props.thematicActions.queryThematic(selectedThematic[0].url, selectedThematic[0].layers, JSON.stringify(arcgisgeo), "esriGeometryPolygon");
        }
    });

    defineProperty(assertThisInitialized(_this), "onClear", function () {
      _this.props.drawActions.changeDrawingStatus("clean", "", "measure", [], {});

      _this.props.thematicActions.queryThematicResponces(null, null);

      _this.props.thematicActions.setSelectedFeature(null);
    });

    defineProperty(assertThisInitialized(_this), "onClose", function () {
      _this.props.thematicActions.showSpatialQuery(false);

      _this.onClear();
    });

    return _this;
  }

  createClass(SpatialQuery, [{
    key: "render",
    value: function render() {
      var enable = this.props.draw.enable;
      var _this$props$thematics2 = this.props.thematics,
          spatialQueryShow = _this$props$thematics2.spatialQueryShow,
          bufferdistance = _this$props$thematics2.bufferdistance,
          metaData = _this$props$thematics2.metaData,
          queryloading = _this$props$thematics2.queryloading,
          themlist = _this$props$thematics2.themlist,
          querylayerid = _this$props$thematics2.querylayerid;
      return spatialQueryShow && enable && /*#__PURE__*/React__default.createElement(SpatialQueryPanel, {
        onLayerChange: this.onLayerChange,
        onSpatialQuery: this.onSpatialQuery,
        onCheckBuffer: this.onCheckBuffer,
        onBufferChange: this.onBufferChange,
        onQueryChange: this.onQueryChange,
        onClose: this.onClose,
        onClear: this.onClear,
        onSearch: this.onSearch,
        selthemlist: themlist.filter(function (e) {
          return e.visibility;
        }),
        querylayerid: querylayerid,
        queryloading: queryloading,
        metaData: metaData,
        bufferdistance: bufferdistance
      });
    }
  }]);

  return SpatialQuery;
}(Component);

function _createSuper$3(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$3(); return function _createSuperInternal() { var Super = getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$3() { if (typeof Reflect === "undefined" || !Reflect.construct) { return false; } if (Reflect.construct.sham) { return false; } if (typeof Proxy === "function") { return true; } try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var ResultList = /*#__PURE__*/function (_Component) {
  inherits(ResultList, _Component);

  var _super = _createSuper$3(ResultList);

  function ResultList() {
    var arguments$1 = arguments;

    var _this;

    classCallCheck(this, ResultList);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments$1[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    defineProperty(assertThisInitialized(_this), "state", {
      show: true
    });

    defineProperty(assertThisInitialized(_this), "downloadData", function () {
      var _this$props$thematics = _this.props.thematics,
          themresult = _this$props$thematics.themresult,
          metaData = _this$props$thematics.metaData;
      var csvKml = arcgisX.toCsvGeoJson(themresult).replace(/\|/g, ",");
      var aLink = document.createElement('a');
      aLink.download = (metaData.name || 'data') + '.csv';
      aLink.href = "data:text/csv;charset=UTF-8,\uFEFF" + encodeURIComponent(csvKml);
      var event = new MouseEvent('click');
      aLink.dispatchEvent(event);
    });

    defineProperty(assertThisInitialized(_this), "backMenu", function () {
      _this.props.thematicActions.queryThematicResponces(null, null);
    });

    defineProperty(assertThisInitialized(_this), "onSelectItem", function (e, item) {
      e.stopPropagation();

      _this.props.thematicActions.setSelectedFeature(arcgisToGeoJSON(item));
    });

    defineProperty(assertThisInitialized(_this), "onRelateQuery", function (e, item) {
      e.stopPropagation();

      _this.props.thematicActions.setRelateFeature(arcgisToGeoJSON(item));
    });

    defineProperty(assertThisInitialized(_this), "renderList", function (list, titlefield, fields) {
      return list.map(function (el, index) {
        return /*#__PURE__*/React__default.createElement(Collapse.Panel, {
          extra: [/*#__PURE__*/React__default.createElement("a", {
            title: "\u5B9A\u4F4D",
            style: {
              margin: '0 10px'
            },
            onClick: function onClick(e) {
              return _this.onSelectItem(e, el);
            }
          }, /*#__PURE__*/React__default.createElement(EnvironmentOutlined$2, null))],
          header: el.attributes[titlefield],
          key: index
        }, _this.renderThematicContent(el.attributes, fields));
      });
    });

    return _this;
  }

  createClass(ResultList, [{
    key: "renderThematicContent",
    value: function renderThematicContent(feas, fields) {
      var list = [];

      for (var key in feas) {
        if (key.indexOf('OBJECTID') == -1 && key.toUpperCase().indexOf('SHAPE') == -1 && key.toUpperCase().indexOf("IMAGES") == -1) {
          list.push( /*#__PURE__*/React__default.createElement("p", null, fields[key], ": ", feas[key] ? feas[key] : "空"));
        }
      }

      return list;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props$thematics2 = this.props.thematics,
          themresult = _this$props$thematics2.themresult,
          querygeometry = _this$props$thematics2.querygeometry;
      var show = this.state.show;

      if (themresult && themresult.features.length > 0) {
        return /*#__PURE__*/React__default.createElement(Card, {
          size: "small",
          title: "\u67E5\u8BE2\u7ED3\u679C",
          className: "spatial_result_card",
          bordered: false,
          extra: [/*#__PURE__*/React__default.createElement("a", {
            style: {
              marginRight: 10
            },
            onClick: this.backMenu
          }, /*#__PURE__*/React__default.createElement(RollbackOutlined$2, {
            title: "\u8FD4\u56DE\u76EE\u5F55"
          })), /*#__PURE__*/React__default.createElement("a", {
            onClick: this.downloadData
          }, /*#__PURE__*/React__default.createElement(DownloadOutlined$2, {
            title: "\u4E0B\u8F7D"
          }))]
        }, /*#__PURE__*/React__default.createElement(Collapse, {
          bordered: false,
          accordion: true
        }, this.renderList(themresult.features, themresult.displayFieldName, themresult.fieldAliases)));
      }

      return null;
    }
  }]);

  return ResultList;
}(Component);

var AreaLocationComponent = function AreaLocationComponent(props) {
  var menu = /*#__PURE__*/React__default.createElement("div", {
    className: "ant-dropdown-menu arealocation_list customscrollbar"
  }, /*#__PURE__*/React__default.createElement(Row, {
    type: "flex",
    justify: "start"
  }, /*#__PURE__*/React__default.createElement(Col, {
    span: 4
  }, /*#__PURE__*/React__default.createElement("a", {
    onClick: function onClick() {
      return props.onMenuClick("全市");
    },
    type: "dashed"
  }, "\u5168\u5E02")), props.areaNames.map(function (ele) {
    return /*#__PURE__*/React__default.createElement(Col, {
      key: ele,
      span: 4
    }, /*#__PURE__*/React__default.createElement("a", {
      onClick: function onClick() {
        return props.onMenuClick(ele);
      },
      type: "dashed"
    }, ele));
  })));
  return /*#__PURE__*/React__default.createElement(Dropdown, {
    overlay: menu
  }, /*#__PURE__*/React__default.createElement("button", {
    type: "button",
    className: "ant-btn toolbar_btn"
  }, props.currentArea || "全市"));
};

function _createSuper$4(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$4(); return function _createSuperInternal() { var Super = getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$4() { if (typeof Reflect === "undefined" || !Reflect.construct) { return false; } if (Reflect.construct.sham) { return false; } if (typeof Proxy === "function") { return true; } try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var AreaLocation = /*#__PURE__*/function (_Component) {
  inherits(AreaLocation, _Component);

  var _super = _createSuper$4(AreaLocation);

  function AreaLocation() {
    var arguments$1 = arguments;

    var _this;

    classCallCheck(this, AreaLocation);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments$1[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    defineProperty(assertThisInitialized(_this), "handleMenuClick", function (area) {
      var _this$props = _this.props,
          mapBoxActions = _this$props.mapBoxActions,
          mapConfig = _this$props.mapConfig,
          map3d = _this$props.map3d;

      if (area == "全市") {
        mapBoxActions.zoomToPoint3D({
          x: mapConfig.center.x,
          y: mapConfig.center.y
        }, mapConfig.zoom);
      }

      mapBoxActions.selectAreaLocation(area);
      mapBoxActions.updateLayer("arealocation-outline", {
        filter: ["all", ["==", "NAME", area]]
      });
      map3d.arearesult.features.forEach(function (ele) {
        if (ele.properties.NAME === area) {
          var center = centroid(ele.geometry);
          mapBoxActions.zoomToPoint3D({
            x: center.geometry.coordinates[0],
            y: center.geometry.coordinates[1]
          }, 11.5);
        }
      });
    });

    return _this;
  }

  createClass(AreaLocation, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var _this$props2 = this.props,
          mapBoxActions = _this$props2.mapBoxActions,
          quhuadata = _this$props2.quhuadata;
      mapBoxActions.setAreaLocation(quhuadata);
      mapBoxActions.updateSource("arealocation", {
        type: "geojson",
        data: quhuadata
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          quhuadata = _this$props3.quhuadata,
          map3d = _this$props3.map3d;
      var quhuaarray = quhuadata.features.map(function (e) {
        return e.properties.NAME;
      });
      return /*#__PURE__*/React__default.createElement("div", {
        style: {
          "float": "left"
        }
      }, /*#__PURE__*/React__default.createElement(AreaLocationComponent, {
        areaNames: quhuaarray,
        onMenuClick: this.handleMenuClick,
        currentArea: map3d.currentarea
      }));
    }
  }]);

  return AreaLocation;
}(Component);

function _createSuper$5(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$5(); return function _createSuperInternal() { var Super = getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$5() { if (typeof Reflect === "undefined" || !Reflect.construct) { return false; } if (Reflect.construct.sham) { return false; } if (typeof Proxy === "function") { return true; } try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var InputGroup = Input.Group;
var SetLocation = /*#__PURE__*/function (_Component) {
  inherits(SetLocation, _Component);

  var _super = _createSuper$5(SetLocation);

  function SetLocation() {
    var arguments$1 = arguments;

    var _this;

    classCallCheck(this, SetLocation);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments$1[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    defineProperty(assertThisInitialized(_this), "state", {
      lng: null,
      lat: null
    });

    defineProperty(assertThisInitialized(_this), "changeLng", function (e) {
      _this.setState({
        lng: Number(e)
      });
    });

    defineProperty(assertThisInitialized(_this), "changeLat", function (e) {
      _this.setState({
        lat: Number(e)
      });
    });

    defineProperty(assertThisInitialized(_this), "onClose", function () {
      _this.props.onClose();

      _this.props.mapBoxActions.highlightPoint(null);
    });

    defineProperty(assertThisInitialized(_this), "setView", function () {
      if (!_this.state.lng) {
        message.info('请输入经度');
      } else if (!_this.state.lat) {
        message.info('请输入维度');
      } else {
        _this.props.mapBoxActions.zoomToPoint3D({
          x: _this.state.lng,
          y: _this.state.lat
        }, 16);

        _this.props.mapBoxActions.highlightPoint({
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [_this.state.lng, _this.state.lat]
          },
          "properties": {}
        });
      }
    });

    return _this;
  }

  createClass(SetLocation, [{
    key: "componentDidMount",
    value: function componentDidMount() {}
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return /*#__PURE__*/React__default.createElement("div", {
        className: "viewtolocation"
      }, /*#__PURE__*/React__default.createElement(InputGroup, {
        compact: true
      }, /*#__PURE__*/React__default.createElement(InputNumber, {
        placeholder: "\u8BF7\u8F93\u5165\u7ECF\u5EA6",
        max: 180,
        min: -180,
        onChange: this.changeLng
      }), /*#__PURE__*/React__default.createElement(InputNumber, {
        placeholder: "\u8BF7\u8F93\u5165\u7EF4\u5EA6",
        max: 90,
        min: -90,
        onChange: this.changeLat
      }), /*#__PURE__*/React__default.createElement(Button, {
        type: "primary",
        onClick: function onClick() {
          return _this2.setView();
        }
      }, "\u5B9A\u4F4D"), /*#__PURE__*/React__default.createElement(Button, {
        onClick: this.onClose
      }, "\u5173\u95ED")));
    }
  }]);

  return SetLocation;
}(Component);

function _createSuper$6(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$6(); return function _createSuperInternal() { var Super = getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$6() { if (typeof Reflect === "undefined" || !Reflect.construct) { return false; } if (Reflect.construct.sham) { return false; } if (typeof Proxy === "function") { return true; } try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var Option = Select.Option;

var POISearch = /*#__PURE__*/function (_Component) {
  inherits(POISearch, _Component);

  var _super = _createSuper$6(POISearch);

  function POISearch() {
    var arguments$1 = arguments;

    var _this;

    classCallCheck(this, POISearch);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments$1[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    defineProperty(assertThisInitialized(_this), "state", {
      result: [],
      text: _this.props.query.key || "",
      searchtype: 'loc'
    });

    defineProperty(assertThisInitialized(_this), "handleSearch", function (value) {
      _this.props.queryActions.simpleQuery(value);
    });

    defineProperty(assertThisInitialized(_this), "handleSubmit", function (e) {
      if (e.trim().length > 0) {
        _this.props.queryActions.query();
      }
    });

    defineProperty(assertThisInitialized(_this), "handleSelect", function (e) {
      var text = e.trim().split(",")[0];

      _this.props.queryActions.query(text);
    });

    defineProperty(assertThisInitialized(_this), "handleChange", function (e) {
      var text = e ? e.trim().split(",")[0] : "";

      _this.props.queryActions.changeQueryKey(text, "name");
    });

    defineProperty(assertThisInitialized(_this), "clearKeys", function () {
      _this.props.queryActions.clearSimpleResult();
    });

    defineProperty(assertThisInitialized(_this), "handleTypeChange", function (searchtype) {
      _this.setState({
        searchtype: searchtype
      });
    });

    return _this;
  }

  createClass(POISearch, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var simpleresult = this.props.query.simpleresult;

      function renderOption(item) {
        return /*#__PURE__*/React__default.createElement(Option, {
          key: item.gbCode,
          value: item.name + "," + item.gbCode
        }, /*#__PURE__*/React__default.createElement(SearchOutlined$2, null), item.name, item.duplicate && /*#__PURE__*/React__default.createElement("span", {
          className: "search-item-class"
        }, item.midbclass + " " + item.district));
      }

      return /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement(AutoComplete, {
        className: "search_auto",
        defaultActiveFirstOption: false,
        dropdownClassName: "search_auto_dropdown",
        onFocus: function onFocus() {
          return _this2.props.queryActions.queryOnFocus(true);
        },
        onSearch: this.handleSearch,
        onChange: this.handleChange,
        onSelect: this.handleSelect,
        value: this.props.query.key,
        dataSource: simpleresult ? simpleresult.map(renderOption) : []
      }, /*#__PURE__*/React__default.createElement(Input.Search, {
        placeholder: "\u8BF7\u8F93\u5165\u5173\u952E\u5B57",
        value: this.props.query.key,
        onSearch: this.handleSubmit
      })));
    }
  }]);

  return POISearch;
}(Component);

function _createSuper$7(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$7(); return function _createSuperInternal() { var Super = getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$7() { if (typeof Reflect === "undefined" || !Reflect.construct) { return false; } if (Reflect.construct.sham) { return false; } if (typeof Proxy === "function") { return true; } try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var assign$1 = require("object-assign");

var POIList = /*#__PURE__*/function (_Component) {
  inherits(POIList, _Component);

  var _super = _createSuper$7(POIList);

  function POIList() {
    classCallCheck(this, POIList);

    return _super.apply(this, arguments);
  }

  createClass(POIList, [{
    key: "onItemClick",
    value: function onItemClick(item) {
      this.props.queryActions.onClickResult(item.id);
      this.props.queryActions.setSelectPOIItem(item);
      this.props.mapBoxActions.zoomToPoint3D({
        x: Number(item.lonlat.split(" ")[0]),
        y: Number(item.lonlat.split(" ")[1])
      }, 17);
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      var _this$props$query = this.props.query,
          result = _this$props$query.result,
          resultcount = _this$props$query.resultcount,
          responsetime = _this$props$query.responsetime,
          prompt = _this$props$query.prompt;
      var listData = [];

      if (!result) {
        return /*#__PURE__*/React__default.createElement("div", null);
      }

      result.forEach(function (item) {
        listData.push(assign$1({}, {
          title: item.name,
          id: item.hotPointID,
          address: item.address || "暂无",
          telephone: item.phone || "暂无"
        }, item));
      });
      return /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement(List, {
        ref: "query_resultlist",
        itemLayout: "vertical",
        size: "large",
        locale: {
          emptyText: /*#__PURE__*/React__default.createElement("div", {
            className: "no-data-text"
          }, /*#__PURE__*/React__default.createElement("p", null, "\u672A\u627E\u5230\u76F8\u5173\u5730\u70B9\u3002"), /*#__PURE__*/React__default.createElement("p", null, "\u60A8\u8FD8\u53EF\u4EE5\uFF1A"), /*#__PURE__*/React__default.createElement("ul", null, /*#__PURE__*/React__default.createElement("li", null, "\u68C0\u67E5\u8F93\u5165\u662F\u5426\u6B63\u786E\u6216\u8005\u8F93\u5165\u5176\u5B83\u8BCD"), /*#__PURE__*/React__default.createElement("li", null, "\u4F7F\u7528\u5206\u7C7B\u8FDB\u884C\u67E5\u627E"), /*#__PURE__*/React__default.createElement("li", null, "\u4F7F\u7528\u7EA0\u9519\u529F\u80FD\u5BF9\u5B58\u5728\u7684\u95EE\u9898\u8FDB\u884C\u4E0A\u62A5")))
        },
        className: "query_resultlist",
        pagination: {
          onChange: function onChange(page) {
            _this.props.queryActions.changeQueryPageIndex(page);
          },
          total: resultcount,
          pageSize: 10,
          showSizeChanger: false,
          size: "small"
        },
        dataSource: listData,
        renderItem: function renderItem(item, index) {
          return /*#__PURE__*/React__default.createElement(List.Item, {
            onClick: function onClick() {
              return _this.onItemClick(item);
            },
            onMouseOver: function onMouseOver() {
              return _this.props.queryActions.onHoverResult(item.id);
            },
            onMouseOut: function onMouseOut() {
              return _this.props.queryActions.onHoverResult(null);
            },
            key: item.id
          }, /*#__PURE__*/React__default.createElement(List.Item.Meta, {
            title: /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement("a", null, /*#__PURE__*/React__default.createElement("span", {
              className: "extra-marker"
            }, index + 1), item.title), /*#__PURE__*/React__default.createElement("span", {
              style: {
                fontSize: "small"
              }
            }, item.midbclass)),
            description: /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement("p", null, "地址:" + item.address), /*#__PURE__*/React__default.createElement("p", null, "电话:" + item.telephone))
          }));
        }
      }), /*#__PURE__*/React__default.createElement("span", {
        className: "resultcount_span"
      }, "\u5171\u627E\u5230", resultcount, "\u4E2A\u7ED3\u679C \u8017\u65F6", responsetime));
    }
  }]);

  return POIList;
}(Component);

var imageStyle = {
  version: 8,
  id: 'image',
  className: 'mapboximagestyle',
  title: '天地图影像',
  sources: {
    img_c: {
      type: "raster",
      tiles: ["http://t0.tianditu.gov.cn/DataServer?T=img_c&x={x}&y={y}&l={z}&tk=e90d56e5a09d1767899ad45846b0cefd"],
      tileSize: 256
    },
    cia_c: {
      type: "raster",
      tiles: ["http://t0.tianditu.gov.cn/DataServer?T=cia_c&x={x}&y={y}&l={z}&tk=e90d56e5a09d1767899ad45846b0cefd"],
      tileSize: 256
    },
    vec_c: {
      type: "raster",
      tiles: ["http://t0.tianditu.gov.cn/DataServer?T=vec_c&x={x}&y={y}&l={z}&tk=e90d56e5a09d1767899ad45846b0cefd"],
      tileSize: 256
    },
    cva_c: {
      type: "raster",
      tiles: ["http://t0.tianditu.gov.cn/DataServer?T=cva_c&x={x}&y={y}&l={z}&tk=e90d56e5a09d1767899ad45846b0cefd"],
      tileSize: 256
    },
    arealocation: {
      type: "geojson",
      data: {}
    },
    routinglocation: {
      type: "geojson",
      data: {}
    }
  },
  layers: [{
    id: "img_c",
    type: "raster",
    source: "img_c",
    minzoom: 0,
    maxzoom: 17.5
  }, {
    id: "cia_c",
    type: "raster",
    source: "cia_c",
    minzoom: 0,
    maxzoom: 17.5
  }, {
    id: "arealocation-outline",
    source: "arealocation",
    type: "fill",
    filter: ["all", ["==", "NAME", ""]],
    paint: {
      "fill-color": "rgba(97, 87, 204, 0.1)",
      "fill-opacity": 1,
      "fill-outline-color": "rgb(97, 87, 204)"
    }
  }]
};
var roadStyle = {
  version: 8,
  id: 'road',
  className: 'mapboxroadstyle',
  title: '天地图矢量',
  sources: {
    img_c: {
      type: "raster",
      tiles: ["http://t6.tianditu.gov.cn/DataServer?T=img_c&x={x}&y={y}&l={z}&tk=e90d56e5a09d1767899ad45846b0cefd"],
      tileSize: 256
    },
    cia_c: {
      type: "raster",
      tiles: ["http://t6.tianditu.gov.cn/DataServer?T=cia_c&x={x}&y={y}&l={z}&tk=e90d56e5a09d1767899ad45846b0cefd"],
      tileSize: 256
    },
    vec_c: {
      type: "raster",
      tiles: ["http://t0.tianditu.gov.cn/DataServer?T=vec_c&x={x}&y={y}&l={z}&tk=e90d56e5a09d1767899ad45846b0cefd", "http://t1.tianditu.gov.cn/DataServer?T=vec_c&x={x}&y={y}&l={z}&tk=e90d56e5a09d1767899ad45846b0cefd", "http://t2.tianditu.gov.cn/DataServer?T=vec_c&x={x}&y={y}&l={z}&tk=e90d56e5a09d1767899ad45846b0cefd", "http://t3.tianditu.gov.cn/DataServer?T=vec_c&x={x}&y={y}&l={z}&tk=e90d56e5a09d1767899ad45846b0cefd", "http://t4.tianditu.gov.cn/DataServer?T=vec_c&x={x}&y={y}&l={z}&tk=e90d56e5a09d1767899ad45846b0cefd", "http://t6.tianditu.gov.cn/DataServer?T=vec_c&x={x}&y={y}&l={z}&tk=e90d56e5a09d1767899ad45846b0cefd"],
      tileSize: 256
    },
    cva_c: {
      type: "raster",
      tiles: ["http://t0.tianditu.gov.cn/DataServer?T=cva_c&x={x}&y={y}&l={z}&tk=e90d56e5a09d1767899ad45846b0cefd", "http://t1.tianditu.gov.cn/DataServer?T=cva_c&x={x}&y={y}&l={z}&tk=e90d56e5a09d1767899ad45846b0cefd", "http://t2.tianditu.gov.cn/DataServer?T=cva_c&x={x}&y={y}&l={z}&tk=e90d56e5a09d1767899ad45846b0cefd", "http://t3.tianditu.gov.cn/DataServer?T=cva_c&x={x}&y={y}&l={z}&tk=e90d56e5a09d1767899ad45846b0cefd", "http://t4.tianditu.gov.cn/DataServer?T=cva_c&x={x}&y={y}&l={z}&tk=e90d56e5a09d1767899ad45846b0cefd", "http://t6.tianditu.gov.cn/DataServer?T=cva_c&x={x}&y={y}&l={z}&tk=e90d56e5a09d1767899ad45846b0cefd"],
      tileSize: 256
    },
    arealocation: {
      type: "geojson",
      data: {}
    },
    routinglocation: {
      type: "geojson",
      data: {}
    }
  },
  "sprite": "http://localhost:8080/mapbox/sprites/sprite",
  "glyphs": "http://localhost:8080/mapbox/glyphs/{fontstack}/{range}.pbf",
  layers: [{
    id: "vec_c",
    type: "raster",
    source: "vec_c",
    minzoom: 0,
    maxzoom: 18
  }, {
    id: "cva_c",
    type: "raster",
    source: "cva_c",
    minzoom: 0,
    maxzoom: 18
  }, {
    id: "arealocation-outline",
    source: "arealocation",
    type: "fill",
    filter: ["all", ["==", "NAME", ""]],
    paint: {
      "fill-color": "rgba(97, 87, 204, 0.1)",
      "fill-opacity": 1,
      "fill-outline-color": "rgb(97, 87, 204)"
    }
  }]
};
var mapstyles = [roadStyle, imageStyle];

function _createSuper$8(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$8(); return function _createSuperInternal() { var Super = getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$8() { if (typeof Reflect === "undefined" || !Reflect.construct) { return false; } if (Reflect.construct.sham) { return false; } if (typeof Proxy === "function") { return true; } try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var layerswitch = /*#__PURE__*/function (_Component) {
  inherits(layerswitch, _Component);

  var _super = _createSuper$8(layerswitch);

  function layerswitch() {
    var arguments$1 = arguments;

    var _this;

    classCallCheck(this, layerswitch);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments$1[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    defineProperty(assertThisInitialized(_this), "onSliderChange", function (e) {
      var style = mapstyles.find(function (s) {
        return s.id === e.target.value;
      });

      _this.props.mapBoxActions.changStyle(style);
    });

    defineProperty(assertThisInitialized(_this), "renderItems", function () {
      return mapstyles.map(function (style) {
        return /*#__PURE__*/React__default.createElement(Radio.Button, {
          value: style.id
        }, /*#__PURE__*/React__default.createElement("div", {
          className: "slide-item"
        }, /*#__PURE__*/React__default.createElement("div", {
          className: "item ".concat(style.className)
        }), /*#__PURE__*/React__default.createElement("div", {
          className: "text"
        }, style.title)));
      });
    });

    return _this;
  }

  createClass(layerswitch, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React__default.createElement("div", {
        className: "mapandlayer_change"
      }, /*#__PURE__*/React__default.createElement(Radio.Group, {
        defaultValue: "road",
        buttonStyle: "solid",
        onChange: this.onSliderChange
      }, this.renderItems()));
    }
  }]);

  return layerswitch;
}(Component);

export { AreaLocation, AttributesFillter, layerswitch as LayerSwitch, POIList, POISearch, ResourceCatalog, ResourcesList, SetLocation, SideBar, SpatialQuery, SpatialQueryPanel, ResultList as SpatialResultList };
