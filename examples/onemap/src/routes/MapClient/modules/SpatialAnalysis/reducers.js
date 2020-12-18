
const {
    ANALYSIS_LIST,
    BUFFER_LIST,
    INTERSECT_LIST,
    CLEAR_LIST
} = require('./actions');

const assign = require('object-assign');


const initialState = {
    analysislist: null,
    bufferdistance:0
};

function analysis(state = initialState, action) {
    switch (action.type) {

    case ANALYSIS_LIST: {
        return assign({}, state, {
            analysislist: action.result,
            geotype:action.geotype,
            resultError: null
        });
    }
    case BUFFER_LIST: {
        return assign({}, state, {
            bufferlist: action.result,
            resultError: null
        });
    }
    case INTERSECT_LIST: {
        return assign({}, state, {
            intersectlist: action.result,
            resultError: null
        });
    }

    case CLEAR_LIST:{
        return assign({}, state, {
            intersectlist: null,
            bufferlist:null,
            analysislist:null,
            resultError: null
        });
    }

    default:
        return state;
    }
}

export default analysis;
