const { LOAD_STATISTICDATA, LOAD_STATISTICLIST } = require("../actions/statistics");

const assign = require("object-assign");

const initialState = {
  statisticlist: {
    fields: [],
    features: [],
  },
  mystatisticlist: { count: 1, list: [], pages: 1 },
};
function statistics(state = initialState, action) {
  switch (action.type) {
    case LOAD_STATISTICDATA: {
      return assign({}, state, {
        statisticlist: action.result,
        resultError: null,
      });
    }
    case LOAD_STATISTICLIST: {
      return assign({}, state, {
        mystatisticlist: action.list,
        resultError: null,
      });
    }
    default:
      return state;
  }
}

export default statistics;
