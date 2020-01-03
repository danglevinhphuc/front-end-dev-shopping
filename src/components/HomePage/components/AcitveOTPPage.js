import React, { Component } from "react";
import { NotificationManager} from 'react-notifications';
import { activeAccountOTP,resendCodeOTP } from "../HomePageAction";
import _ from 'lodash'
class VerifyPage extends Component {
  constructor(props) {
    super(props);    
    this.state = {
        otp: '',
        username: ''
    }
    this.onSubmitOTP = _.debounce(this.onSubmitOTP.bind(this),200);
    this.resendOTP = _.debounce(this.resendOTP.bind(this),200);
    this.onHandleChangeInput = this.onHandleChangeInput.bind(this);
    this.redirectTo = this.redirectTo.bind(this);
  };
  componentWillMount(){
    var { match } = this.props;
    if (match && match.params.username) { // update
        this.setState({
            username : match.params.username
        })
    }
  }
  onHandleChangeInput = event => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value
    });
  };
  onSubmitOTP =async () =>{
    var _this =this;
    try {
        var response = await activeAccountOTP(this.state);
        if(response && response.success){
            NotificationManager.success(`Active account success`);
            this.props.history.push("/sign-in");
        }else{
            NotificationManager.error(`Active account error `);     
        }
    } catch (error) {
        console.log(error);
        NotificationManager.error(`Active account error `);
    }
  };
  resendOTP =async () =>{
    var _this = this;
    await resendCodeOTP({username: _this.state.username});
    NotificationManager.success(`Resend code success`);
  }
  redirectTo(path){
    if(path){
        this.props.history.push(path);
    }else{
        this.props.history.goBack();
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
                <h1 className="h3">Active Account</h1>
                <p>You will have code in your email and enter your code below</p>
              </div>
              <div>
              <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Code: 7529"
                    name="otp"
                    value={this.state.otp}
                    onChange={this.onHandleChangeInput}
                  />
                </div>
                <button
                  className="btn btn-primary btn-lg btn-block"
                  type="button"
                  onClick={this.onSubmitOTP}
                  disabled={this.state.otp == '' ? true: false}
                >
                  Submit
                </button>
              </div>
            </div>

            <div className="pad-all">
              <a onClick={this.resendOTP} className="btn-link mar-lft pointer">
                Resend Code
              </a>
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

export default VerifyPage