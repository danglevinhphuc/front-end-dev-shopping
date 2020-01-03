import React, { Component } from "react";
import { NotificationManager} from 'react-notifications';
import { sendForgotPass,restPass } from "../HomePageAction";
import SimpleReactValidator from 'simple-react-validator';
import _ from 'lodash'
class ForgotPage extends Component {
  constructor(props) {
    super(props);    
    this.state = {
        email: '',
        username: '',
        otp: '',
        password: '',
        show: false
    }
    this.validator = new SimpleReactValidator();
    this.onSubmitForgot = _.debounce(this.onSubmitForgot.bind(this),200);
    this.onSubmitResetPass = _.debounce(this.onSubmitResetPass.bind(this),200);
  };
  componentWillMount(){
    
  }
  onHandleChangeInput = event => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value
    });
  };
  redirectTo(path){
    if(path){
        this.props.history.push(path);
    }else{
        this.props.history.goBack();
    }
  };
  onSubmitForgot = async () => {
    var _this =this;
    if(_this.validator.allValid()){
      try {
        var response = await sendForgotPass({email: _this.state.email,username: _this.state.username});
        if(response){
          if (response.success) {
            _this.setState({show: true})
            NotificationManager.success('Check your email');
          } else {
            NotificationManager.error(response.error);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }else{
        _this.validator.showMessages();
        _this.forceUpdate();
    }
  };
  onSubmitResetPass = async () => {
    var _this =this;
    if(_this.validator.allValid()){
      try {
        var response = await restPass(_this.state);
        if(response){
          if (response.success) {
            _this.redirectTo('/sign-in');
            NotificationManager.success('Reset password success');
          } else {
            NotificationManager.error(response.error);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }else{
        _this.validator.showMessages();
        _this.forceUpdate();
    }
  };
  render() {
    return (
        <div id="container" className="cls-container">
        <div id="bg-overlay" />
        <div className="cls-content">
          <div className="cls-content-sm panel">
            <div className="panel-body">
              <div className="mar-ver pad-btm">
                <h1 className="h3">Forgot password</h1>
                <p>You will have code in your email and enter your email, username below</p>
              </div>
              <div>
              <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    name="email"
                    value={this.state.email}
                    onChange={this.onHandleChangeInput}
                  />
                  <span className="text-left red-text">{this.validator.message('email', this.state.email, 'required')}</span>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Username"
                    name="username"
                    value={this.state.username}
                    onChange={this.onHandleChangeInput}
                  />
                  <span className="text-left red-text">{this.validator.message('username', this.state.username, 'required')}</span>
                </div>
                {this.state.show ? (<div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="OTP"
                      name="otp"
                      value={this.state.otp}
                      onChange={this.onHandleChangeInput}
                    />
                    <span className="text-left red-text">{this.validator.message('otp', this.state.otp, 'required')}</span>
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="New password"
                      name="password"
                      value={this.state.password}
                      onChange={this.onHandleChangeInput}
                    />
                    <span className="text-left red-text">{this.validator.message('password', this.state.password, 'required')}</span>
                  </div>
                </div>) : ''}
                {this.state.show ? 
                <button
                  className="btn btn-primary btn-lg btn-block"
                  type="button"
                  onClick={this.onSubmitResetPass}
                >
                  Send
                </button>
                : 
                <button
                  className="btn btn-primary btn-lg btn-block"
                  type="button"
                  onClick={this.onSubmitForgot}
                >
                  Send
                </button> }
              </div>
            </div>

            <div className="pad-all">
              <a onClick={() =>{this.redirectTo('/sign-in')}} className="btn-link mar-lft pointer">
                Go back Login
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ForgotPage