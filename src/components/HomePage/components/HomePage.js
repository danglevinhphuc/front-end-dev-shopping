import React, { Component } from "react";
import { actionSignInSocial,setCustomClaimUser,actionSignInRequest } from "../HomePageAction";
import { NotificationManager} from 'react-notifications';
import SimpleReactValidator from 'simple-react-validator';
import { Base64 } from 'js-base64';
import _ from 'lodash'
import firebase from 'firebase'
import { actionSignUpRequest } from "../HomePageAction";
import {URL_ROOT} from "../../../constants/Config"
import {firebaseApp} from '../../../configuration/fireAuth'
class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
    this.onHandleChangeInput = this.onHandleChangeInput.bind(this);
    this.onSubmitLogin = _.debounce(this.onSubmitLogin.bind(this),200);
    this.redirectTo = this.redirectTo.bind(this);
    this.validator = new SimpleReactValidator();
  }
  redirectTo(path){
    if(path){
        this.props.history.push(path);
    }else{
        this.props.history.goBack();
    }
  };
  onHandleChangeInput = event => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value
    });
  };
  onSubmitLogin = async () => {
    if(this.validator.allValid()){
      try {
        var response = await actionSignInRequest(this.state);
        this.redirectToDashboard(response);
      } catch (error) {
        console.log(error);
      }
    }else{
      this.validator.showMessages();
      this.forceUpdate();
    }
  };
  redirectToDashboard = (response) =>{
    if (response) {
      if (response.success) {
        var user = Base64.encode(JSON.stringify(response.user));
        // window.location.href= `http://${response.user.username}.shoppingcart:3000/account/access-token?token=${response.token}&user=${user}`
        window.location.href= `${URL_ROOT}/account/access-token?token=${response.token}&user=${user}`
      } else {
        NotificationManager.error(response.error);
      }
    }
  }
  onSubmitFirebaseGoogle = async ()=>{
    var _this = this;
    try {
      var providerGoogle = new firebase.auth.GoogleAuthProvider();
      var response = await firebaseApp.auth().signInWithPopup(providerGoogle);
      await _this.accessLoginSocial(response);
    } catch (error) {
      console.log(error);
      NotificationManager.error('Login some thing wrong');
    }
  };
  onSubmitFirebaseFacebook = async e =>{
    var providerFacebook = new firebase.auth.FacebookAuthProvider();
    try {
      var response = await firebaseApp.auth().signInWithPopup(providerFacebook);
      await this.accessLoginSocial(response);
    } catch (error) {
      console.log(error);
      NotificationManager.error('Login some thing wrong');
    }
  };
  accessLoginSocial = async (response)=>{
    var _this =this;
    if(response && response.additionalUserInfo && response.additionalUserInfo.profile){
      var splitEmail = response.additionalUserInfo.profile.email.split("@");
      var username = splitEmail[0];
      var email = response.additionalUserInfo.profile.email;
      var password = Math.random().toString(36).substring(7);
      var token = response.credential.idToken || response.user.ma;
      var isNewUser = response.additionalUserInfo.isNewUser;
      // var userF = firebaseApp.auth().currentUser;
      // localStorage.setItem("FIREBASE_CURRENT_USER",JSON.stringify(userF));
      // await setCustomClaimUser(dataCustomClaim);
      if(isNewUser){
        // register
        await _this.loginOrRegisterSocial({email,password,username},'register');
      }else{
        // login 
        await _this.loginOrRegisterSocial({username,token,email},'login');
      }
    }else{
      NotificationManager.error("Login something wrong");
    }
  }
  loginOrRegisterSocial= async (data,type) =>{
    var _this = this;
    try {
      if(type == 'register'){
        // register
        let response = await actionSignUpRequest({
          email: data.email,
          username: data.username,
          password: data.password
        })
        if(response){
          if (response.success) {
            this.props.history.push("/active/account/"+response.data.username);
          } else {
            NotificationManager.error(response.error);
          }
        }
      }else{
        // login
        let response  =await actionSignInSocial({
          username: data.username,
          token : data.token,
          email: data.email
        });
        if(response){
          _this.redirectToDashboard(response);
        }
      }
    } catch (error) {
      console.log(error);
      NotificationManager.error('Login some thing wrong');
    }
  }
  enterSubmitForm = (event) =>{
    event.preventDefault();
  }
  render() {
    return (
      <div id="container" className="cls-container">
        <div id="bg-overlay" />
        <div className="cls-content">
          <div className="cls-content-sm panel">
            <div className="panel-body">
              <div className="mar-ver pad-btm">
                <h1 className="h3">Account Login</h1>
                <p>Sign In to your account</p>
              </div>
              <form onSubmit={(e) =>{this.enterSubmitForm(e)}}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Username"
                    name="username"
                    value={this.state.username}
                    onChange={this.onHandleChangeInput}
                    required
                  />
                  <span className="text-left red-text">{this.validator.message('username', this.state.username, 'required')}</span>
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onHandleChangeInput}
                    required
                  />
                  <span className="text-left red-text">{this.validator.message('password', this.state.password, 'required')}</span>
                </div>
                <button
                  className="btn btn-primary btn-lg btn-block"
                  type="submit"
                  onClick={this.onSubmitLogin}
                >
                  Sign In
                </button>
                <button
                  className="btn btn-danger btn-lg btn-block"
                  type="button"
                  onClick={this.onSubmitFirebaseGoogle}
                >
                <i className="fa fa-google mr-4"></i>
                  Login with Gmail
                </button>
                <button
                  className="btn btn-info btn-lg btn-block"
                  type="button"
                  onClick={this.onSubmitFirebaseFacebook}
                >
                <i className="fa fa-facebook-square mr-4"></i>
                  Login with Facebook
                </button>
              </form>
            </div>

            <div className="pad-all">
              <a onClick={() =>{this.redirectTo('/sign-up')}} className="btn-link mar-lft pointer">
                Create a new account
              </a>
              <a onClick={() =>{this.redirectTo('/forgot-password')}} className="btn-link mar-lft pointer">
                Forgot password
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage