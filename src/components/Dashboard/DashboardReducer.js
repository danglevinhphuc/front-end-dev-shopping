import * as DashboardAction from "./DashboardAction";
import _ from 'lodash';
var initialState = {
    from: new Date(0).getTime(),
    to: new Date().getTime(),
    data: {}
};

const DashboardReducer = (state = initialState, action) => {
    var { data } = action;
    switch (action.type) {
        case DashboardAction.GET_STATISTIC:
            state.data = data;
            return {...state};
        case DashboardAction.SET_FROM_TO:
            state.from = data.from;
            state.to = data.to;
            return {...state};
    default:
        return {...state};
    }
}
  
export { DashboardReducer };