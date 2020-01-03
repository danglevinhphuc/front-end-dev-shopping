import * as ChatPageAction from "./ChatPageAction";
import _ from 'lodash'
var initialState = {
  searchRequestConversation: {
      description: '',
      currentPage: 1,
      pageSize: 5,
      sort: { field: "createdAt", sortOrder: -1 },
      total: 0,
  },
  conversations: [],
  chatList: {
    data: [],
    total: 0,
    account: ''
  }
};

const ChatPageReducer = (state = initialState, action) => {
  var { data } = action;
  switch (action.type) {
    case ChatPageAction.FETCH_CONVERSATION:
      state.searchRequestConversation.total = data.total;
      state.conversations = data.data;
      return {...state};
    case ChatPageAction.UPDATE_CONVERSATION:
      var conversationById = action.conversationById;
      var data = _.find(state.conversations,{"email":conversationById.email});
      if(data){
        data.profile.snippet= conversationById.message;
        data.profile.isUser= true;
        if(conversationById.email == state.chatList.account){
          state.chatList.total++;
          state.chatList.data.push({
            createdAt: new Date().getTime(),
            email: conversationById.email,
            from: "customer",
            id: Math.random(),
            isDelete: false,
            message: conversationById.message,
            to: null,
            updatedAt: new Date().getTime()
          })
        }
      }else{
        state.conversations.unshift({
          email: conversationById.email,
          profile:{
            snippet : conversationById.message,
            isUser: true
          }
        })
      }
      return {...state};
    case ChatPageAction.UPDATE_SNIPPET: 
      var message = _.find(state.conversations,{"_id":data._id});
      if(message){
        message.profile.snippet =  data.message ;
        message.profile.isUser = false;
        if(message.email == state.chatList.account){
          state.chatList.total++;
          state.chatList.data.push({
            createdAt: new Date().getTime(),
            email: message.owner,
            from: "admin",
            id: Math.random(),
            isDelete: false,
            message: data.message,
            to: null,
            updatedAt: new Date().getTime()
          })
        }
      }
      return {...state};
    case ChatPageAction.FETCH_CHAT:
      state.chatList.data = _.orderBy( data.data, ['createdAt'], ['asc']);
      state.chatList.total = data.total;
      state.chatList.account = data.account
      return {...state};
    default:
      return {...state};
  }
};

export { ChatPageReducer };
