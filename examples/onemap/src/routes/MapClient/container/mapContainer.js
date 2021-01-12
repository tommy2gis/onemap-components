import { connect } from "react-redux";
import {bindActionCreators} from 'redux';
import mapApp from "../components/mapApp";
import { createSelector } from "reselect";
import * as MapBoxActions from "../components/MapBoxGL/actions";
import * as DrawActions from "../actions/draw";
import * as LayersActions from "../actions/layers";
import * as QueryActions from "../actions/query";
import * as ConfigActions from "../actions/config";
import * as ThematicActions from "../actions/thematics";
import * as StatisticsActions from "../actions/statistics";

export default connect(mapStateToProps, makeMapDispatchToProps)(mapApp);

function mapStateToProps(state = {}, props) {
  return {
    ...props,
    mapConfig: state.mapConfig,
    map: state.map || (state.mapConfig && state.mapConfig.map),
    mapStateSource: state.map && state.map.mapStateSource,
    layers: state.layers,
    query: state.query,
    arealocation: state.arealocation,
    routing: state.routing,
    draw: state.draw,
    sidebar: state.sidebar,
    panoramic: state.panoramic,
    thematics: state.thematics,
    toolbar: state.toolbar,
    analysis: state.analysis,
    statistics: state.statistics,
    map3d: state.map3d,
  };
}

const defaultUserActions = {};
const getDispatch = (dispatch) => dispatch;
const getUserActions = (dispatch, props) => props.actions || defaultUserActions;

function makeGetActionCreators() {
  return createSelector(
    [getDispatch, getUserActions],
    (dispatch, userActions) => {
      const [
        thematicActions,
        statisticsActions,
        configActions,
        queryActions,
        layersActions,
        drawActions,
        mapBoxActions,
        mapActions,
      ] = [
        ThematicActions,
        StatisticsActions,
        ConfigActions,
        QueryActions,
        LayersActions,
        DrawActions,
        MapBoxActions,
      ].map((actions) =>
        bindActionCreators(mergeActions(actions, userActions), dispatch)
      );

      return {
        thematicActions,
        statisticsActions,
        configActions,
        queryActions,
        layersActions,
        drawActions,
        mapBoxActions,
        mapActions,
        dispatch,
      };
    }
  );
}

function makeMapDispatchToProps() {
  const getActionCreators = makeGetActionCreators();
  const mapDispatchToProps = (dispatch, ownProps) => {
    const groupedActionCreators = getActionCreators(dispatch, ownProps);

    return {
      ...groupedActionCreators,
      dispatch,
    };
  };

  return mapDispatchToProps;
}

/**
 * Override default kepler.gl actions with user defined actions using the same key
 */
function mergeActions(actions, userActions) {
  const overrides = {};
  for (const key in userActions) {
    if (userActions.hasOwnProperty(key) && actions.hasOwnProperty(key)) {
      overrides[key] = userActions[key];
    }
  }

  return { ...actions, ...overrides };
}
