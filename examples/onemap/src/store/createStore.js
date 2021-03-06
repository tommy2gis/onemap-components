/*
 * @Author: 史涛 
 * @Date: 2019-01-05 19:31:21 
 * @Last Modified by: 史涛
 * @Last Modified time: 2021-01-12 14:01:44
 */
import { createStore, applyMiddleware, combineReducers,compose } from 'redux';
import mapConfig from '../routes/MapClient/reducers/config';
import query from '../routes/MapClient/reducers/query';
import draw from '../routes/MapClient/reducers/draw';
import map3d from '../routes/MapClient/components/MapBoxGL/reducers';
import thematics from '../routes/MapClient/reducers/thematics';
import analysis from '../routes/MapClient/modules/SpatialAnalysis/reducers';
import statistics from '../routes/MapClient/reducers/statistics';
import { routerReducer } from 'react-router-redux';
import {default as thunkMiddleware } from 'redux-thunk';
const { logger } = require(`redux-logger`);
const middlewares = [thunkMiddleware];

if (process.env.NODE_ENV === `development`) {
  middlewares.push(logger);
}


const reducers = combineReducers({
  routerReducer,mapConfig,query,map3d,draw,thematics,analysis,statistics
});

export default createStore(reducers, applyMiddleware(...middlewares));

