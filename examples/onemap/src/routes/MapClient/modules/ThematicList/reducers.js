
const {
    THEMATIC_RESULT,
    SHOW_THEMATICLAYER,
    QUERY_THEMATICRESULT,
    QUERY_THEMATIC_LOADING,
    CHNAGE_THEMATICOPACITY,
    SET_SELECTEDFEATURE,
    SET_SELECTEDQUERYLAYER,
    SHOW_SPATIALQUERY,
    SHOW_SPATIALANALYSIS,
    SET_BUFFERDISTANCE,
    QUERY_THEMATICMETA,
    SET_RELATEFEATURE,
    QUERY_CLUSTER_LOADING,
    QUERY_CLUSTERRESULT,
    LOAD_LEGEND,
    ADD_CHANGEINFO,
    DELETE_CHANGEINFO,
    CLEAR_CHANGEINFO,
    SHOW_CHANGEINFO,
    CHANGE_DATA_SHOW_MODEL,
    IDENTIFY_THEMATICRESULT,
    QUERY_ANNOTHEMATICRESULT,
    SELECT_THEMATICTYPE
} = require('./actions');

const assign = require('object-assign');

const initialState = {
    themlist: [],
    annothemlist:[],
    changelist:[],
    querylayerid:null,
    queryloading:false,
    clusterloading:false,
    themresult:null,
    identifyresult:null,
    spatialQueryShow:false,
    spatialAnaysisShow:false,
    bufferdistance:0,
    datashowmodel:'cluster'
}
function themtics(state = initialState, action) {
    switch (action.type) {

        case THEMATIC_RESULT: {
            return assign({}, state, {
                themlist: action.result,
                resultError: null
            });
        }

        case SELECT_THEMATICTYPE:{
            return assign({}, state, {
                selectedType: action.classify,
                resultError: null
            });
        }

        case QUERY_ANNOTHEMATICRESULT: {
            return assign({}, state, {
                annothemresult: action.response,
                querygeometry:action.geometry,
                queryloading:false,
                resultError: null
            });
        }

        case ADD_CHANGEINFO: {
            const item=state.changelist.find(e=>e.id===action.item.id)
            return assign({}, state, {
                changelist: item?state.changelist.map(
                    them =>
                    them.id === action.item.id ? action.item: them
                ):state.changelist.concat([action.item]),
                resultError: null
            });
        }

        case DELETE_CHANGEINFO: {
            return assign({}, state, {
                changelist: state.changelist.filter(e=>e.id!==action.id),
                resultError: null
            });
        }

        case CLEAR_CHANGEINFO: {
            return assign({}, state, {
                changelist: [],
                resultError: null
            });
        }

        case QUERY_CLUSTER_LOADING: {
            return assign({}, state, {
                clusterloading: action.loading
            });
        }

        case CHANGE_DATA_SHOW_MODEL: {
            return assign({}, state, {
                datashowmodel: action.model
            });
        }

        case QUERY_THEMATIC_LOADING: {
            return assign({}, state, {
                queryloading: action.queryloading
            });
        }
        case SET_SELECTEDQUERYLAYER: {
            return assign({}, state, {
                querylayerid: action.id,
                resultError: null
            });
        }

        case QUERY_THEMATICMETA: {
            return assign({}, state, {
                metaData: action.metaData,
            });
        }

        case SHOW_SPATIALQUERY: {
            return assign({}, state, {
                spatialQueryShow: action.show,
                resultError: null
            });
        }

        case SHOW_SPATIALANALYSIS: {
            return assign({}, state, {
                spatialAnaysisShow: action.show,
                resultError: null
            });
        }
        

        case SHOW_CHANGEINFO: {
            return assign({}, state, {
                changeInfoShow: action.show,
                resultError: null
            });
        }
        
        case SET_BUFFERDISTANCE:{
            return assign({}, state, {
                bufferdistance: action.bufferdistance,
                resultError: null
            });
        }

        case SET_SELECTEDFEATURE: {
            return assign({}, state, {
                selectedfeature: action.fea,
                resultError: null
            });
        }

        case LOAD_LEGEND:{
            return assign({},state,{
                themlist:state.themlist.map(
                    res=>
                        res.id===action.id?{...res,legend:action.legend}:res
                )
            })
        }

        case SET_RELATEFEATURE: {
            return assign({}, state, {
                relatefeature: action.fea,
                resultError: null
            });
        }

        case CHNAGE_THEMATICOPACITY: {
            return assign({}, state, {
                themlist: state.themlist.map(
                    them =>
                    them.id === action.id ? { ...them, opacity: action.value } : them
                ),
                resultError: null
            });
        }

        case QUERY_THEMATICRESULT:{

            return assign({}, state, {
                themresult: action.response,
                querygeometry:action.geometry,
                queryloading:false,
                resultError: null
            });
        }

        case IDENTIFY_THEMATICRESULT:{
            return assign({}, state, {
                identifyresult: action.response,
                resultError: null
            });
        }

        case QUERY_CLUSTERRESULT:{
            return assign({}, state, {
                clusterresult: action.response,
                clusterloading:false,
                resultError: null
            });
        }

        case SHOW_THEMATICLAYER:
            return assign({}, state, {
                themlist: state.themlist.map(
                    them =>
                    them.id === action.id ? { ...them, visibility: !them.visibility } : them
                ),
                resultError: null
            });

       
    default:
        return state;
    }
}

export default themtics;
