import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { actionAuthourizeRequest } from "./components/HomePage/HomePageAction";
import routes from "./routes";
import _ from "lodash";
import { NotificationContainer } from "react-notifications";
import NavBar from "./components/Common/navBar";
import Menu from "./components/Common/menu";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import commonData from './utils/common-data'
import * as Config from './constants/Config'
import socket from './configuration/socket';
import {actUpdateConversation} from './components/Chat/ChatPageAction'
import {URL_ROOT} from "./constants/Config"
import {actFetchConversationRequest} from './components/Chat/ChatPageAction'
// import socketIOClient from "socket.io-client";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      toggleMenu: true,
      loadingSuccess: false,
      totalUserChatUnReply : 0
    };
    this.showHideMenu = this.showHideMenu.bind(this);
  }
  async componentWillMount() {
    var _this = this;
    var token = localStorage.getItem("TOKEN");
    var user = localStorage.getItem("USER");
    var exited =
      _.find(commonData.routeHideAction, (o) =>{return window.location.pathname.indexOf(o) != -1}) ? true : false;
    if (token) {
      var response = await actionAuthourizeRequest(token);
      if (!response || (response && !response.success)) {
        window.location.href = `${URL_ROOT}/sign-in`;
        localStorage.removeItem("TOKEN");
      } else {
        // set header
        axios.defaults.headers.common["Authorization"] = token;
        axios.defaults.headers.common["username"] = JSON.parse(user).username;
        _this.loadSocket();
        this.props.getConversation();
      }
    } else {
      if (!exited) {
        window.location.href = `${URL_ROOT}/sign-in`;
      }
    }
    _this.setState({
      show: exited,
      loadingSuccess: true
    });
  };
  componentWillReceiveProps(nextProps){
    const {chat} = nextProps;
    if(chat && chat.conversations){
      let countUserChat = _.countBy(chat.conversations,(o)=>{return o.profile.isUser == true});
      let totalUserChatUnReply = countUserChat && countUserChat['true'] ? countUserChat['true']  : 0;
      this.setState({
        totalUserChatUnReply
      })
    }    
  }
  loadSocket(){
    var _this  =this;
    socket.on('new-message',data =>{
      _this.props.actUpdateConversation(data.data);
    })
  }
  showHideMenu(val) {
    this.setState({
      toggleMenu: val
    });
  }
  render() {
    const { loadingSuccess, show, toggleMenu,totalUserChatUnReply } = this.state;
    const {routeLink} = this.props.homeState;
    var titleBarLink = _.map(routeLink,(o,i)=>{
      return (
        <li key={i}>
          <Link to={o.link} className={o.isActive ? 'active' : ''}>{o.name}</Link>
        </li>
      )
    })
    return (
      <Router>
        <div className="App">
          <NotificationContainer />
          {!show ? <NavBar totalUserChatUnReply={totalUserChatUnReply} showHideMenu={this.showHideMenu} /> : ""}
          {!show && toggleMenu ? <Menu /> : ""}
          <div
            className={
              !show
                ? `${
                    toggleMenu
                      ? "col-sm-10  col-sm-push-2 pr-50 mt-4"
                      : "pd-0 col-sm-12 mt-4"
                  }`
                : ``
            }
          >
           {!show ?
            <ol className="breadcrumb pd-0 mb-5">
              <li><Link to="/"><i className="demo-pli-home"></i></Link></li>
              {titleBarLink}
            </ol> : ``}
            {loadingSuccess ? this.showContentMenus(routes) : ""}
          </div>
        </div>
      </Router>
    );
  }

  showContentMenus = routes => {
    var result = null;
    if (routes.length > 0) {
      result = routes.map((route, index) => {
        return (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.main}
          />
        );
      });
    }
    return <Switch>{result}</Switch>;
  };
}

const mapStateToProps = state => {
  return {
    homeState : state.home,
    chat: state.chat
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    actUpdateConversation: (data)=>{
      dispatch(actUpdateConversation(data));
    },
    getConversation: () =>{
      dispatch(actFetchConversationRequest());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

