import * as HomePageAction from "./HomePageAction";

var initialState = {
    token: '',
    notify: {
      show :false,
      value: ''
    },
    routeLink : [
      {name : "DashBoard",isActive : true,link : '/dashboard'}
    ]
};

const HomePageReducer = (state = initialState, action) => {
  var { data } = action;
  switch (action.type) {
    case HomePageAction.SIGNIN:
      state.token = action.token;
      return {...state};
    case HomePageAction.CHANGE_TITLE :
      state.routeLink = data;
      return {...state};
    default:
      return {...state};
  }
};

export { HomePageReducer };
