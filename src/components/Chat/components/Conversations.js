import React, { Component } from "react";
import Pagination from "react-js-pagination";
import { Modal, Button } from "react-bootstrap";
import { connect } from "react-redux";
import {replyChat,actFetchChatList} from '../ChatPageAction'
import ListChatPage from './ListChatPage'
class ConversationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      currentPage: 1,
      pageSize: 5,
      sort: { field: "createdAt", sortOrder: 1 },
      total: 0,
      show: false,
      messages: '',
      messageItem:{}
    };
  }
  async componentWillReceiveProps() {
    var { searchRequestConversation } = this.props.chat;
    this.setState({
      currentPage: searchRequestConversation.currentPage,
      description: searchRequestConversation.description,
      pageSize: searchRequestConversation.pageSize,
      sort: searchRequestConversation.sort,
      total: searchRequestConversation.total
    });
  }
  handleClose = ()=>{
    this.setState({
      show: false
    })
  }
  handleShow = async (item)=>{
    await this.props.actFetchChatList(item.email)
    this.setState({
      show: true,
      messageItem: item
    })
  }
  onHandleChangeInput = event => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value
    });
  };
  sendChat = (e) =>{
    e.preventDefault();
    const  {messageItem,messages} = this.state;
    let formData = {
      message: messages,
      from:'admin',
      to: messageItem.email,
      idConversation: messageItem._id
    }
    this.props.replyChat(formData);
    this.setState({
      messages: ""
    })
  }
  render() {
    const { conversations,chatList } = this.props.chat;
    const { show,messages } = this.state;
    var conversationsList = conversations.map((item, k) => {
      return (
        <div className="col-lg-3 col-sm-12" key={k}>
          <div className="panel">
            <div className="panel-body text-center">
              <img
                className="img-lg img-circle mar-btm"
                src={` ${
                  item.profile.isUser
                    ? `img/profile-photos/5.png`
                    : `img/profile-photos/1.png`
                }`}
                alt="Profile Picture"
              />
              <p className="text-lg text-semibold mar-no text-main">
                {item.email}
              </p>
              <p className="text-muted">Snippet: {item.profile.snippet}</p>
              <div className="mar-top">
                <button
                  className={`btn ${
                    item.profile.isUser ? `btn-warning` : `btn-default`
                  }`}
                  onClick={()=>{this.handleShow(item)}}
                  
                >
                  Reply
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    });
    return (
      <div>
        {conversationsList}
        <div className="col-lg-12">
          <Pagination
            activePage={this.state.currentPage}
            itemsCountPerPage={this.state.pageSize}
            totalItemsCount={this.state.total}
            onChange={this.handlePageChange}
          />
        </div>
        <Modal show={show} onHide={() =>{this.handleClose()}} animation={false} aria-labelledby="contained-modal-title-vcenter">
          <form onSubmit={e => {
                  this.sendChat(e);
                }}>
          <Modal.Header closeButton>
            <Modal.Title>Reply</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <ListChatPage data={chatList} />
          <input
            className="form-control"
            placeholder="Press messages..."
            type="text"
            name="messages"
            value={messages ? messages: ""}
            onChange={(e) =>{this.onHandleChangeInput(e)}}
            /> 
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() =>{this.handleClose()}}>
              Close
            </Button>
            <Button variant="primary" type="submit" disabled={!messages ?true: false} >
              Send
            </Button>
          </Modal.Footer>
          </form>
        </Modal>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    chatList :state.chat.chatList
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    replyChat: (data) =>{
      dispatch(replyChat(data));
    },
    actFetchChatList : async (data) =>{
      await dispatch(actFetchChatList(data));
    }
  };
};

export default connect(mapStateToProps,mapDispatchToProps
)(ConversationPage);
