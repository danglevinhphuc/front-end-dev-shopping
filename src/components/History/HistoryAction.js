import utilsCallApi from "./../../utils/apiCaller";
export const FETCH_HISTORY = "FETCH_HISTORY";
export const PAGE_SIZE_HISTORY = "PAGE_SIZE_HISTORY";
export const actFetchHistoryRequest = () => {
  return async (dispatch, getState) => {
    var query = utilsCallApi.filterMongo(
      null,
      getState().history.searchRequest
    );
    var response = await utilsCallApi.callApi("/history/get-by-query", "POST", query);
    await dispatch(actFetchHistory(response.data));
  };
};
export const actFetchHistory = data => {
  return {
    type: FETCH_HISTORY,
    data
  };
};
export const pageSizeHistoryRequest = data => {
  return {
    type: PAGE_SIZE_HISTORY,
    data
  };
};