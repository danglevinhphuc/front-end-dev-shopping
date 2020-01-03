import React, { Component } from "react";
import { changeTitleBar } from "../../HomePage/HomePageAction";
// import {actFetchConversationRequest} from '../ChatPageAction'
import { connect } from "react-redux";
import ConversationPage from './Conversations'
class ChatPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }
  async componentWillMount() {
    var { match } = this.props;
    var titleBar = [{ name: "Chat", isActive: true, link: "/chat" }];
    this.props.changeTitleBar(titleBar);
    // await this.props.getConversation();
  }
  render() {
    const  chat = this.props.chat;
    return (
      <div><ConversationPage chat={chat} /></div>
    );
  }
}
const mapStateToProps = state => {
  return {
    chat: state.chat
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    changeTitleBar: val => {
      dispatch(changeTitleBar(val));
    },
    // getConversation: () =>{
    //   dispatch(actFetchConversationRequest());
    // }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatPage);
