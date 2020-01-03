import React, { Component } from "react";
import $ from "jquery";
import { actionSignInRequest } from "../UserAction";
import { NotificationManager } from "react-notifications";
import { NavLink } from "react-router-dom";
import socket from '../../../configuration/socket'
class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      images: null
    };
    this.showUploadImage = this.showUploadImage.bind(this);
    this.onChangeImage = this.onChangeImage.bind(this);
  }
  componentWillMount() {
    var userStore = localStorage.getItem("USER");
    if (userStore) {
      var user = JSON.parse(userStore);
      this.setState({
        user
      });
    }
    socket.on("send-change-user-info",(data) =>{
      localStorage.setItem("USER", JSON.stringify(data[0]));
      this.setState({
        user: data[0]
      });
    })
  }
  showUploadImage() {
    $("#file").click();
  }
  async onChangeImage(e) {
    var _this = this;
    await _this.setState({ images: e.target.files[0] });
    const formData = new FormData();
    formData.append("images", _this.state.images);
    try {
      var response = await actionSignInRequest({
        id: _this.state.user.id,
        formData
      });
      if (response && response.data && response.data.length) {
        var data = response.data[0];
        localStorage.setItem("USER", JSON.stringify(data));
        _this.setState({
          user: data
        });
        NotificationManager.success("Upload images success");
      }
    } catch (error) {
      NotificationManager.error("Upload images failed");
    }
  }
  render() {
    const { user } = this.state;
    return (
      <div className="shadow-component ">
        <input
          type="file"
          name="file"
          id="file"
          onChange={this.onChangeImage}
          className="hide"
          accept="image/*"
        />
        <div className="panel pos-rel">
          <div className="pad-all text-center">
            <div className="widget-control">
              <div className="btn-group dropdown">
                <NavLink
                  to="/user/edit"
                  className="dropdown-toggle btn btn-trans"
                >
                  <i className="demo-pli-pen-5 icon-lg" />
                </NavLink>
              </div>
            </div>
            <a>
              <img
                alt="Profile Picture"
                className="img-lg img-circle mar-ver pointer"
                onClick={this.showUploadImage}
                src={user.images ? user.images : "img/profile-photos/10.png"}
              />
              <p className="text-lg text-semibold mar-no text-main">
                {user.emailAddress}
              </p>
              <br />
              <div className="text-sm">Username: {user.username}</div>
              <div className="text-sm">
                Full Name / Phone :{" "}
                {user.fullName ? user.fullName + "| " : "N/A |"}{" "}
                {user.phone ? user.phone : "N/A"}
              </div>
            </a>
            <div className="pad-top btn-groups">
              {user.linkFb ? (
                <a
                  href={user.linkFb}
                  className="btn btn-icon demo-pli-facebook icon-lg add-tooltip"
                  data-original-title="Facebook"
                  data-container="body"
                  target="_blank"
                />
              ) : (
                ""
              )}
              {user.linkTwitter ? (
                <a
                  href={user.linkTwitter}
                  className="btn btn-icon demo-pli-twitter icon-lg add-tooltip"
                  data-original-title="Twitter"
                  data-container="body"
                  target="_blank"
                />
              ) : (
                ""
              )}
              {user.linkGooglePlus ? (
                <a
                  href={user.linkGooglePlus}
                  className="btn btn-icon demo-pli-google-plus icon-lg add-tooltip"
                  data-original-title="Google+"
                  data-container="body"
                  target="_blank"
                />
              ) : (
                ""
              )}
              {user.linkInstagram ? (
                <a
                  href={user.linkInstagram}
                  className="btn btn-icon demo-pli-instagram icon-lg add-tooltip"
                  data-original-title="Instagram"
                  data-container="body"
                  target="_blank"
                />
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserPage;
