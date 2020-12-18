const THEMATIC_RESULT = "THEMATIC_RESULT";
const SHOW_THEMATICLAYER = "SHOW_THEMATICLAYER";
const SHOW_SPATIALQUERY = "SHOW_SPATIALQUERY";
const QUERY_THEMATICRESULT = "QUERY_THEMATICRESULT";
const QUERY_THEMATIC_LOADING = "QUERY_THEMATIC_LOADING";
const SET_SELECTEDFEATURE = "SET_SELECTEDFEATURE";
const SET_SELECTEDQUERYLAYER = "SET_SELECTEDQUERYLAYER";
const SET_BUFFERDISTANCE = "SET_BUFFERDISTANCE";
const SET_RELATEFEATURE = "SET_RELATEFEATURE";
const QUERY_THEMATICMETA = "QUERY_THEMATICMETA";
const CHNAGE_THEMATICOPACITY = "CHNAGE_THEMATICOPACITY";
const QUERY_CLUSTERRESULT="QUERY_CLUSTERRESULT";
const QUERY_CLUSTER_LOADING="QUERY_CLUSTER_LOADING";
const LOAD_LEGEND = "LOAD_LEGEND";
const CHANGE_DATA_SHOW_MODEL="CHANGE_DATA_SHOW_MODEL";
const SHOW_CHANGEINFO="SHOW_CHANGEINFO";
const ADD_CHANGEINFO='ADD_CHANGEINFO';
const DELETE_CHANGEINFO='DELETE_CHANGEINFO';
const CLEAR_CHANGEINFO='CLEAR_CHANGEINFO';
const IDENTIFY_THEMATICRESULT="IDENTIFY_THEMATICRESULT";
const QUERY_ANNOTHEMATICRESULT="QUERY_ANNOTHEMATICRESULT";
const SELECT_THEMATICTYPE='SELECT_THEMATICTYPE';
const SHOW_SPATIALANALYSIS='SHOW_SPATIALANALYSIS';
import axios from "axios";
import qs from "qs";
import {message} from "antd";

let CancelToken = axios.CancelToken;
let cancel;


function loadThematicsList(result) {
  return {
    type: THEMATIC_RESULT,
    result,
  };
}


function addChangeToList(item) {
  return {
    type: ADD_CHANGEINFO,
    item,
  };
}



function selectThematicType(classify) {
  return {
    type: SELECT_THEMATICTYPE,
    classify,
  };
}

function deleteChangeInfo(id) {
  return {
    type: DELETE_CHANGEINFO,
    id,
  };
}

// function clearChangeInfo(id) {
//   return {
//     type: CLEAR_CHANGEINFO,
//     id,
//   };
// }




function showChangeInfo(show) {
  return {
    type: SHOW_CHANGEINFO,
    show,
  };
}

function showSpatialQuery(show) {
  return {
    type: SHOW_SPATIALQUERY,
    show,
  };
}

function showSpatialAnalysis(show) {
  return {
    type: SHOW_SPATIALANALYSIS,
    show,
  };
}

function changeDataShowModel(model) {
  return {
    type: CHANGE_DATA_SHOW_MODEL,
    model,
  };
}


function changeThematicOpacity(id, value) {
  return {
    type: CHNAGE_THEMATICOPACITY,
    value,
    id,
  };
}

function LoadLegend(id, legend) {
  return {
    type: LOAD_LEGEND,
    id,
    legend,
  };
}

function loadLegendJson(record) {
    return (dispatch) => {
        return axios
        .get(record.url + "/legend?f=pjson")
        .then((response) => {
          const  layer=response.data.layers.find(e=>e.layerId===Number(record.layers));
          const legend=layer.legend.find(e=>e.label===record.code);

          dispatch(LoadLegend(record.id, legend));
        })
        .catch((e) => {});
    };

  
}

function showThematicLayer(id) {
  return {
    type: SHOW_THEMATICLAYER,
    id,
  };
}

function setSelectedFeature(fea) {
  return {
    type: SET_SELECTEDFEATURE,
    fea,
  };
}

function setRelateFeature(fea) {
  return {
    type: SET_RELATEFEATURE,
    fea,
  };
}

function setBufferDistance(bufferdistance) {
  return {
    type: SET_BUFFERDISTANCE,
    bufferdistance,
  };
}

function setSelectedQueryLayer(id) {
  return {
    type: SET_SELECTEDQUERYLAYER,
    id,
  };
}

function queryThematicResponces(response, geometry) {
  return {
    type: QUERY_THEMATICRESULT,
    response,
    geometry,
  };
}

function queryAnnoThematicResponces(response, geometry) {
  return {
    type: QUERY_ANNOTHEMATICRESULT,
    response,
    geometry,
  };
}

function identifyThematicResponces(response) {
  return {
    type: IDENTIFY_THEMATICRESULT,
    response
  };
}

function queryClusterResponces(response) {
  return {
    type: QUERY_CLUSTERRESULT,
    response
  };
}

function clearCluster() {
  return {
    type: QUERY_CLUSTERRESULT,
    response:null
  };
}


function queryThematicMetaData({ url, layerid }) {
  return (dispatch, getState) => {
    return axios
      .get(url + "/" + layerid, {
        params: {
          f: "json",
        },
      })
      .then((response) => {
        dispatch({
          type: QUERY_THEMATICMETA,
          metaData: response.data,
        });
      })
      .catch((e) => {
        // message.warning('数据查询失败,请稍后再试');
        // dispatch(queryError(e));
      });
  };
}

function queryCluster({url, layerid, geometry,where}) {
  return (dispatch, getState) => {
    const thematics = getState().thematics;
    if(thematics.datashowmodel!=='cluster'){
       return null;
    }
    dispatch({
      type: QUERY_CLUSTER_LOADING,
      loading: true,
    });
    return axios
      .post(
        url + "/" + layerid + "/query",
        qs.stringify({
          returnGeometry: true,
          where: where || "1=1",
          outSr: 4326,
          outFields: "*",
          inSr: 4326,
          geometry: geometry || "",
          geometryType: "esriGeometryEnvelope",
          spatialRel: "esriSpatialRelContains",
          f: "json",
        })
      )
      .then((response) => {
        if (!response.data.error) {
          dispatch(queryClusterResponces(response.data));
        } else {
          message.warning("数据查询失败,请稍后再试");
        }
        dispatch({
          type: QUERY_CLUSTER_LOADING,
          queryloading: false,
        });
      })
      .catch((e) => {
        dispatch({
          type: QUERY_CLUSTER_LOADING,
          queryloading: false,
        });
        // message.warning('数据查询失败,请稍后再试');
        // dispatch(queryError(e));
      });
  };
}

function identifyThematic({url,params}){
  return (dispatch, getState) => {
    return axios
    .post(
      url,
      qs.stringify(params)
    )
    .then((response) => {
      if (!response.data.error&&response.data.results.length>0) {
        dispatch(identifyThematicResponces(response.data.results));
      } else {
       // message.warning("数据查询失败,请稍后再试");
      }
    })
    .catch((e) => {
    });
  }
  
}


function queryAnnoThematic(url, layerid, geometry, geometryType, where,spatialRel) {
  return (dispatch, getState) => {
    const thematics = getState().thematics;
    dispatch({
      type: QUERY_THEMATIC_LOADING,
      queryloading: true,
    });
    return axios
      .post(
        url + "/" + layerid + "/query",
        qs.stringify({
          returnGeometry: true,
          where: where || "1=1",
          outSr: 4326,
          outFields: "*",
          inSr: 4326,
          geometry: geometry || "",
          geometryType: geometryType || "",
          spatialRel: spatialRel||"esriSpatialRelIntersects",
          f: "pjson",
        })
      )
      .then((response) => {
        if (!response.data.error&&response.data.features.length>0) {
          dispatch(queryAnnoThematicResponces(response.data, geometry));
        } else {
          message.warning("数据查询失败,请稍后再试");
        }
        dispatch({
          type: QUERY_THEMATIC_LOADING,
          queryloading: false,
        });
      })
      .catch((e) => {
        dispatch({
          type: QUERY_THEMATIC_LOADING,
          queryloading: false,
        });
        // message.warning('数据查询失败,请稍后再试');
        // dispatch(queryError(e));
      });
  };
}


function queryThematic(url, layerid, geometry, geometryType, where,spatialRel) {
  return (dispatch, getState) => {
    const thematics = getState().thematics;
    dispatch({
      type: QUERY_THEMATIC_LOADING,
      queryloading: true,
    });
    if (cancel != undefined) {
      cancel();
    }
    return axios
      .post(
        url + "/" + layerid + "/query",
        qs.stringify({
          returnGeometry: true,
          where: where || "1=1",
          outSr: 4326,
          outFields: "*",
          inSr: 4326,
          geometry: geometry || "",
          geometryType: geometryType || "",
          spatialRel: spatialRel||"esriSpatialRelIntersects",
          f: "pjson",
        }),{cancelToken: new CancelToken(function executor(c) {
          cancel = c;
      })}
      )
      .then((response) => {
        if (!response.data.error&&response.data.features.length>0) {
          dispatch(queryThematicResponces(response.data, geometry));
        }else if(response.data.features.length==0){
          message.info("未查询到相应记录");
        } else {
          message.warning("数据查询失败,请稍后再试");
        }
        dispatch({
          type: QUERY_THEMATIC_LOADING,
          queryloading: false,
        });
      })
      .catch((e) => {
        dispatch({
          type: QUERY_THEMATIC_LOADING,
          queryloading: false,
        });
        // message.warning('数据查询失败,请稍后再试');
        // dispatch(queryError(e));
      });
  };
}

export {
  loadThematicsList,
  setSelectedFeature,
  changeDataShowModel,
  CHANGE_DATA_SHOW_MODEL,
  SET_RELATEFEATURE,
  setRelateFeature,
  SET_SELECTEDFEATURE,
  THEMATIC_RESULT,
  SHOW_THEMATICLAYER,
  showThematicLayer,
  setBufferDistance,
  SET_BUFFERDISTANCE,
  QUERY_THEMATICMETA,
  LOAD_LEGEND,
  loadLegendJson,
  addChangeToList,
  queryThematicMetaData,
  setSelectedQueryLayer,
  SET_SELECTEDQUERYLAYER,
  SHOW_SPATIALQUERY,
  showSpatialQuery,
  queryThematic,
  queryAnnoThematic,
  QUERY_ANNOTHEMATICRESULT,
  QUERY_THEMATIC_LOADING,
  QUERY_CLUSTER_LOADING,
  QUERY_CLUSTERRESULT,
  queryCluster,
  queryClusterResponces,
  queryAnnoThematicResponces,
  clearCluster,
  QUERY_THEMATICRESULT,
  queryThematicResponces,
  CHNAGE_THEMATICOPACITY,
  changeThematicOpacity,
  SHOW_CHANGEINFO,
  showChangeInfo,
  ADD_CHANGEINFO,
  deleteChangeInfo,
  DELETE_CHANGEINFO,
  CLEAR_CHANGEINFO,
  identifyThematic,
  IDENTIFY_THEMATICRESULT,
  identifyThematicResponces,
  selectThematicType,
  SELECT_THEMATICTYPE,
  showSpatialAnalysis,
  SHOW_SPATIALANALYSIS
};
