/*
 * @Author: 史涛
 * @Date: 2019-01-05 19:33:28
 * @Last Modified by: 史涛
 * @Last Modified time: 2020-12-19 17:02:37
 */

const CHANGE_MAP3D_VIEW = "CHANGE_MAP3D_VIEW";
const ZOOM_TO_POINT3D = "ZOOM_TO_POINT3D";
const LOAD_STYLE="LOAD_STYLE";
const ADD_SOURCEANDLAYERS="ADD_SOURCEANDLAYERS";
const REMOVE_SOURCEANDLAYERS="REMOVE_SOURCEANDLAYERS";
const UPDATE_SOURCE="UPDATE_SOURCE";
const UPDATE_LAYER="UPDATE_LAYER";
const CHANGE_STYLE='CHANGE_STYLE';
const UPDATE_BOUNDS='UPDATE_BOUNDS';
const HIGHLIGHT_POINT='HIGHLIGHT_POINT';
const ADD_SOURCES='ADD_SOURCES';
const ADD_LAYERS='ADD_LAYERS';
const HIDE_ALL_THEMATIC_LAYERS='HIDE_ALL_THEMATIC_LAYERS';
const LOAD_SYMBOLSTYLE="LOAD_SYMBOLSTYLE";
const FILTER_OUTLET="FILTER_OUTLET";
const AREALOCATION_RESULT = 'AREALOCATION_RESULT';
const RESET_AREALOCATION = 'RESET_AREALOCATION';
const SELECTED_AREA = 'SELECTED_AREA';

function setAreaLocation(result) {
    return {
        type: AREALOCATION_RESULT,
        result
    };
}

function selectAreaLocation(currentarea) {
    return {
        type: SELECTED_AREA,
        currentarea
    };
}

function resetAreaLocation() {
    return {
        type: RESET_AREALOCATION
    };
}

function zoomToPoint3D(pos, zoom) {
  return {
    type: ZOOM_TO_POINT3D,
    pos,
    zoom
  };
}

function getLayerSymbolStyles(symbolstyles) {
  return {
    type: LOAD_SYMBOLSTYLE,
    symbolstyles
  };
}



function highlightPoint(pos) {
  return {
    type: HIGHLIGHT_POINT,
    pos
  };
}


function updateBounds(bounds) {
  return {
    type: UPDATE_BOUNDS,
    bounds
  };
}

function loadStyle(mapstyle) {
  return {
    type: LOAD_STYLE,
    mapstyle
  };
}

function changStyle(mapstyle){
  return {
    type: CHANGE_STYLE,
    mapstyle
  };
}

function updateSource(sourcename,source){
  
  return {
    type: UPDATE_SOURCE,
    sourcename,
    source
  };
}

function updateLayer(layerid,{filter,paint,layout}){
  
  return {
    type: UPDATE_LAYER,
    layerid,
    filter,
    paint,
    layout
  };
}

function filterOutlet(filter){
  
  return {
    type: FILTER_OUTLET,
    filter
  };
}

function hideAllThematicLayers(){
  
  return {
    type: HIDE_ALL_THEMATIC_LAYERS
  };
}


function addSources(results){
  return {
    type: ADD_SOURCES,
    results
  };
}


function addLayers(results){
  return {
    type: ADD_LAYERS,
    results
  };
}


function addSourceAndLayers(sourcename,source,layers){
  return {
    type: ADD_SOURCEANDLAYERS,
    sourcename,
    source,
    layers
  };
}


function removeSourceAndLayers(sourcename){
  return {
    type: REMOVE_SOURCEANDLAYERS,
    sourcename
  };
}




function changeMap3DView(latitude, longitude, zoom, maxZoom,minZoom, bearing, pitch,heading) {
  return {
    type: CHANGE_MAP3D_VIEW,
    latitude,
    longitude,
    center:[longitude,latitude],
    zoom,
    maxZoom,
    minZoom
  };
}



export {
  AREALOCATION_RESULT,
  SELECTED_AREA,
  setAreaLocation,
  selectAreaLocation,
  resetAreaLocation,
  CHANGE_MAP3D_VIEW,
  changeMap3DView,
  ZOOM_TO_POINT3D,
  zoomToPoint3D,
  loadStyle,
  ADD_SOURCEANDLAYERS,
  REMOVE_SOURCEANDLAYERS,
  removeSourceAndLayers,
  addSourceAndLayers,
  addSources,
  ADD_SOURCES,
  ADD_LAYERS,
  addLayers,
  UPDATE_SOURCE,
  updateSource,
  updateLayer,
  HIDE_ALL_THEMATIC_LAYERS,
  hideAllThematicLayers,
  HIGHLIGHT_POINT,
  highlightPoint,
  UPDATE_LAYER,
  CHANGE_STYLE,
  changStyle,
  LOAD_STYLE,
  updateBounds,
  UPDATE_BOUNDS,
  LOAD_SYMBOLSTYLE,
  getLayerSymbolStyles,
  FILTER_OUTLET,
  filterOutlet
};
