import React, { Component } from "react";
import { connect } from "react-redux";
import { actionSignUpRequest } from "../HomePageAction";
import { NotificationManager} from 'react-notifications';
import SimpleReactValidator from 'simple-react-validator';
import _ from 'lodash'
class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email : "",
      username: "",
      password: ""
    };
    this.onHandleChangeInput = this.onHandleChangeInput.bind(this);
    this.onSubmitSignUp = _.debounce(this.onSubmitSignUp.bind(this),200);
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
  onSubmitSignUp = async () => {
    if(this.validator.allValid()){
      try {
        var response = await actionSignUpRequest(this.state);
        if(response){
          if (response.success) {
            this.props.history.push("/active/account/"+this.state.username);
          } else {
            NotificationManager.error(response.error);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }else{
      this.validator.showMessages();
      this.forceUpdate();
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
                <h1 className="h3">Create a New Account</h1>
                <p>Come join the dashboard shopping cart community! Let's set up your account.</p>
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
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onHandleChangeInput}
                  />
                  <span className="text-left red-text">{this.validator.message('password', this.state.password, 'required')}</span>
                </div>
                <button
                  className="btn btn-primary btn-lg btn-block"
                  type="button"
                  onClick={this.onSubmitSignUp}
                >
                  Sign Up
                </button>
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

export default connect(
  null,
  null
)(SignUp);
