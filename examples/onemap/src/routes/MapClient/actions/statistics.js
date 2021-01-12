const LOAD_STATISTICDATA = "LOAD_STATISTICDATA";
const LOAD_STATISTICLIST = "LOAD_STATISTICLIST";
import axios from "axios";

function loadStatisticData(result) {
  return {
    type: LOAD_STATISTICDATA,
    result,
  };
}

function getStatisticList(userid, page, size) {
  return (dispatch, getState) => {
    return axios
      .get(mapConfigJson.reportserverurl + "/themeconfig/list", {
        params: {
          userid,
          page,
          size,
        },
      })
      .then((response) => {
        dispatch({
            type: LOAD_STATISTICLIST,
            list:response.data.result
        })
      })
      .catch((e) => {});
  };
}

export { loadStatisticData,LOAD_STATISTICLIST, getStatisticList, LOAD_STATISTICDATA };
