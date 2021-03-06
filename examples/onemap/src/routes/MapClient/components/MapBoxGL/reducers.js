/*
 * @Author: 史涛
 * @Date: 2019-01-05 19:31:08
 * @Last Modified by: 史涛
 * @Last Modified time: 2020-12-19 17:04:33
 */

var {
  CHANGE_MAP3D_VIEW,
  ADD_SOURCEANDLAYERS,
  REMOVE_SOURCEANDLAYERS,
  ZOOM_TO_POINT3D,
  LOAD_STYLE,
  UPDATE_SOURCE,
  CHANGE_STYLE,
  UPDATE_LAYER,
  UPDATE_BOUNDS,
  ADD_SOURCES,
  ADD_LAYERS,
  HIDE_ALL_THEMATIC_LAYERS,
  HIGHLIGHT_POINT,
  LOAD_SYMBOLSTYLE,
  FILTER_OUTLET,
  AREALOCATION_RESULT,
  RESET_AREALOCATION,
  SELECTED_AREA
} = require("./actions");

var assign = require("object-assign");

const initialState = {
  result: '',
  currentarea:'',
  resultError: null
};

function mapboxgl(state = initialState, action) {
  switch (action.type) {
    case CHANGE_MAP3D_VIEW:
      const { type, ...params } = action;
      return assign({}, state, params);
    case LOAD_SYMBOLSTYLE:
    return assign({}, state, {
      symbolstyles: action.symbolstyles,
    });
    case LOAD_STYLE:
      return assign({}, state, {
        mapstyle: action.mapstyle,
      });
    case CHANGE_STYLE:
      return assign({}, state, {
        mapstyle: {
          ...state.mapstyle,
          layers: action.mapstyle.layers,
        },
      });
    case UPDATE_BOUNDS:
      return assign({}, state, {
        bounds: action.bounds,
      });
    case FILTER_OUTLET:
      return assign({}, state, {
        outletfilter: action.filter,
      });
    case UPDATE_SOURCE:
      let sources = state.mapstyle.sources;
      sources[action.sourcename] = action.source;
      return assign({}, state, {
        mapstyle: {
          ...state.mapstyle,
          sources: sources,
        },
      });
    case HIDE_ALL_THEMATIC_LAYERS:
      return assign({}, state, {
        mapstyle: {
          ...state.mapstyle,
          layers: state.mapstyle.layers.map((layer) => {
            if (layer.id.includes("thematic_")) {
              return Object.assign({}, layer, {
                layout: { visibility: "none" },
              });
            } else {
              return layer;
            }
          }),
        },
      });
    case UPDATE_LAYER:
      return assign({}, state, {
        mapstyle: {
          ...state.mapstyle,
          layers: state.mapstyle.layers.map((layer) => {
            if (layer.id === action.layerid) {
              return Object.assign(
                {},
                layer,
                action.filter && {
                  filter: action.filter,
                },
                action.paint && {
                  paint: action.paint,
                },
                action.layout && {
                  layout: action.layout,
                }
              );
            } else {
              return layer;
            }
          }),
        },
      });
    case ADD_SOURCEANDLAYERS:
      sources = state.mapstyle.sources;
      sources[action.sourcename] = action.source;
      return assign({}, state, {
        mapstyle: {
          ...state.mapstyle,
          sources: sources,
          layers: [...state.mapstyle.layers.concat(action.layers)],
        },
      });
    case ADD_LAYERS:
      let layers = action.results.map((item) => {
        return {
          id: "thematic_" + item.id,
          type: "raster",
          layout: {
            visibility: "none",
          },
          source: "thematic_" + item.id,
          paint: {
            "raster-opacity": 0.8,
          },
        };
      });

      return assign({}, state, {
        mapstyle: {
          ...state.mapstyle,
          layers: [...state.mapstyle.layers.concat(layers)],
        },
      });
    case ADD_SOURCES:
      sources = state.mapstyle.sources;
      action.results.forEach((item) => {
        sources["thematic_" + item.id] = {
          type: "raster",
          arcgisDynamic: true,
          tiles: [item.url +
              "/export?bbox={bbox-epsg-4490}&size=256%2C256&dpi=96&format=png24&transparent=true&bboxSR=4490&imageSR=4490&f=image&layers=show:" +
              item.layers,
          ],
          tileSize: 256,
        };
      });
      return assign({}, state, {
        mapstyle: {
          ...state.mapstyle,
          sources: sources,
        },
      });

    case REMOVE_SOURCEANDLAYERS:
      sources = state.mapstyle.sources;
      delete sources[action.sourcename];
      return assign({}, state, {
        mapstyle: {
          ...state.mapstyle,
          sources: sources,
          layers: [
            ...state.mapstyle.layers.filter((e) => e.id !== action.sourcename),
          ],
        },
      });
    case HIGHLIGHT_POINT: {
      return assign({}, state, {
        highlightpoint: action.pos,
      });
    }
    case AREALOCATION_RESULT: {
      return assign({}, state, {
        arearesult: action.result,
          resultError: null
      });
  }

  case RESET_AREALOCATION: {
      return assign({}, state, {
          arearesult: '',
          resultError: null
      });
  }
  case SELECTED_AREA: {
      return assign({}, state, {
          currentarea: action.currentarea,
      });
  }
    case ZOOM_TO_POINT3D: {
      return assign({}, state, {
        latitude: action.pos.y,
        longitude: action.pos.x,
        center: [action.pos.x, action.pos.y],
        zoom: action.zoom,
      });
    }
    default:
      return state;
  }
}

export default mapboxgl;
