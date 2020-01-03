import * as HistoryAction from "./HistoryAction";
import _ from "lodash";
import moment from "moment";
var initialState = {
  searchRequest: {
    description: "",
    currentPage: 1,
    pageSize: 5,
    sort: { field: "createdAt", sortOrder: -1 }
  },
  historyData: [],
  total: 0,
  loading: false
};

const HistoryReducer = (state = initialState, action) => {
  var { data } = action;
  switch (action.type) {
    case HistoryAction.FETCH_HISTORY:
      state.historyData = data.data;
      state.historyData = _.map(state.historyData, o => {
        o.createdAtConvert = moment(o.createdAt).format("DD/MM/YYYY hh:mm:ss");
        return o;
      });
      state.total = data.total;
      state.loading = true;
      return { ...state };
    case HistoryAction.PAGE_SIZE_HISTORY:
      state.searchRequest.currentPage = data;
      return { ...state };
    default:
      return { ...state };
  }
};

export { HistoryReducer };
