import React, { Component } from "react";
import { actionEditRequest } from "../UserAction";
import { NotificationManager } from "react-notifications";
import _ from 'lodash'
class EditUserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
    this.redirectTo = this.redirectTo.bind(this);
    this.submitUpdateInfoUser =  this.submitUpdateInfoUser.bind(this);
  }
  componentWillMount() {
    var userStore = localStorage.getItem("USER");
    if (userStore) {
      var user = JSON.parse(userStore);
      this.setState({
        user
      });
    }
  }
  onChange = e => {
    if (e) {
      var target = e.target;
      var name = target.name;
      var value = target.value;
      const { user } = this.state;
      user[name] = value;
      this.setState({
        user
      });
    }
  };
  redirectTo(path){
    if(path){
        this.props.history.push(path);
    }else{
        this.props.history.goBack();
    }
  };
  submitUpdateInfoUser = _.debounce(async function(){
    var _this = this;
    try {
        var response = await actionEditRequest(this.state.user);
        if(response && response.data && response.data.length){
            var data = response.data[0];
            localStorage.setItem("USER", JSON.stringify(data));
            _this.setState({
                user: data
            });
            NotificationManager.success("Update info success");
        }else{
            NotificationManager.error("Update info failed");    
        }
    } catch (error) {
        NotificationManager.error("Update info failed");
    }
  },200)
  render() {
    const { user } = this.state;
    return (
      <div className="panel">
        <div className="panel-body">
          <div className="row">
            <div className="col-md-4">
              <h3 className="panel-title pd-0">Update User Info</h3>
            </div>
            <div className="col-md-8 text-right">
              <button className="btn btn-default mr-2" onClick={() =>{this.redirectTo()}}>Back</button>
              <button type="button" className="btn btn-success"  onClick={this.submitUpdateInfoUser}>Save</button>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <div className="form-group">
                <label className="control-label">Full name</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Press full name"
                  name="fullName"
                  onChange={this.onChange}
                  value={user.fullName}
                />
              </div>
            </div>
            <div className="col-sm-12">
              <div className="form-group">
                <label className="control-label">Phone</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Ex: 090..."
                  name="phone"
                  onChange={this.onChange}
                  value={user.phone}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <div className="form-group">
                <label className="control-label">Link Facebook</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Ex: https://www.facebook.com/profile.php"
                  name="linkFb"
                  onChange={this.onChange}
                  value={user.linkFb}
                />
              </div>
            </div>
            <div className="col-sm-12">
              <div className="form-group">
                <label className="control-label">Link Twitter</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Ex: https://twitter.com/?lang=vi"
                  name="linkTwitter"
                  onChange={this.onChange}
                  value={user.linkTwitter}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <div className="form-group">
                <label className="control-label">Link Google+</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Ex: https://aboutme.google.com/u/0/?referer=gplus"
                  name="linkGooglePlus"
                  onChange={this.onChange}
                  value={user.linkGooglePlus}
                />
              </div>
            </div>
            <div className="col-sm-12">
              <div className="form-group">
                <label className="control-label">Link Instagram</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Ex: https://www.instagram.com/"
                  name="linkInstagram"
                  onChange={this.onChange}
                  value={user.linkInstagram}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="panel-footer text-right">
          <button className="btn btn-default mr-2" onClick={() =>{this.redirectTo()}}>Back</button>
          <button type="button" className="btn btn-success" onClick={this.submitUpdateInfoUser}>Save</button>
        </div>
      </div>
    );
  }
}

export default EditUserPage;
