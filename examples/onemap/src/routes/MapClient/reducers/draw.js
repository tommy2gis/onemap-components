/*
 * @Author: 史涛 
 * @Date: 2019-01-05 19:30:46 
 * @Last Modified by: 史涛
 * @Last Modified time: 2020-09-02 15:01:18
 */


const { CHANGE_DRAWING_STATUS, SET_CURRENT_STYLE,DRAW_ENABLE, GEOMETRY_CHANGED, END_DRAWING, DRAW_SUPPORT_STOPPED,UPDATE_FEATURE,ADD_FEATURE } = require('../actions/draw');

const assign = require('object-assign');

const initialState = {
    drawStatus: null,
    drawOwner: null,
    drawMethod: null,
    enable:false,
    options: {},
    features: [],
    geometry:null,
    drawfeatures: [],
};

function draw(state = initialState, action) {
    switch (action.type) {
        case CHANGE_DRAWING_STATUS:
            return assign({}, state, {
                drawStatus: action.status,
                drawOwner: action.owner,
                drawMethod: action.method,
                options: action.options,
                features: action.status==='clean'?[]:state.features.concat(action.features),
                geometry:action.status==='clean'?null:state.geometry,
                style: action.style
            });
        case SET_CURRENT_STYLE:
            return assign({}, state, {
                currentStyle: action.currentStyle
            });
        case UPDATE_FEATURE:
            return assign({}, state, {
                features: state.features.map((fea)=>fea.id===action.feature.id?action.feature:fea)
            });
        case ADD_FEATURE:
            return assign({}, state, {
                features: state.features.concat([action.feature])
            });
        case GEOMETRY_CHANGED:
            return assign({}, state, { drawfeatures: action.features });
        case DRAW_SUPPORT_STOPPED:
            return assign({}, state, { drawfeatures: [] });
        case END_DRAWING: {
            return assign({}, state, {
                geometry: action.geometry
            });

        }
        case DRAW_ENABLE:
            return assign({}, state, { enable: action.enable });
        default:
            return state;
    }
}

export default draw;
