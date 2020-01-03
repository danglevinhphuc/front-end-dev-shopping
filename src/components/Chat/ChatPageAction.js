import utilsCallApi from "./../../utils/apiCaller";
export const FETCH_CONVERSATION = "FETCH_CONVERSATION";
export const UPDATE_CONVERSATION = "UPDATE_CONVERSATION";
export const UPDATE_SNIPPET = "UPDATE_SNIPPET";
export const FETCH_CHAT = "FETCH_CHAT";
export const actFetchConversationRequest = () => {
  return async (dispatch, getState) => {
    var query = utilsCallApi.filterMongo(
      null,
      getState().chat.searchRequestConversation
    );
    var user = localStorage.getItem("USER");
    if (user) {
      user = JSON.parse(user);
      query.query["owner"] = user.username;
    }
    var response = await utilsCallApi.callApi(
      "/conversation/query",
      "POST",
      query
    );
    await dispatch(actFetchConversation(response.data));
  };
};
export const actFetchChatList = (account) => {
  return async (dispatch, getState) => {
    var query = utilsCallApi.filterMongo(null, {
      description: "",
      currentPage: 1,
      pageSize: 50,
      sort: { field: "createdAt", sortOrder: -1 }
    });
    if(account){
      query.query['$and'] = [
        { 
          "$or" : [ 
                  {"email" : account},
                  {"to" : account}
                ]
        }
      ]
    }
    var response = await utilsCallApi.callApi(
      "/chat-admin/get-by-query",
      "POST",
      query
    );
    await dispatch({
      type: FETCH_CHAT,
      data: {data:response.data.data, total: response.data.total, account}
    })
  };
};
export const actFetchConversation = data => {
  return {
    type: FETCH_CONVERSATION,
    data
  };
};
export const actUpdateConversation = data => {
  return async (dispatch, getState) => {
    var user = localStorage.getItem("USER");
    if (user) {
      user = JSON.parse(user);
      if (user.username == data.to) {
        data.isUser = data.to == user.emailAddress ? true : false;
        await dispatch(updateConversation(data));
      }
    }
  };
};
export const replyChat = data => {
  return async (dispatch, getState) => {
    try {
      await utilsCallApi.callApi("/chat-admin/edit", "POST", data);
      await dispatch({
        type: UPDATE_SNIPPET,
        data: { message: data.message, _id: data.idConversation }
      });
    } catch (error) {
      console.log(error);
    }
  };
};
export const updateConversation = conversationById => {
  return {
    type: UPDATE_CONVERSATION,
    conversationById
  };
};
