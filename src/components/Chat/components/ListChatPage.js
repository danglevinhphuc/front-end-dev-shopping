import React, { Component } from "react";
import "../Chat.css"
import _ from 'lodash'
class ListChatPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }
  render() {
    const {data} = this.props;
    let listChat = [];
    if(data.data){
      listChat = _.map(data.data,(o,key) =>{
        return (
          <div key={key}>
            {o.from == 'admin' ? 'You': <b>{o.email}</b>}: {o.message}
          </div>
        )
      });
    } 
    return (
      <div className="chat-content mb-3">
        {
          listChat
        }
      </div>
    );
  }
}


export default ListChatPage
