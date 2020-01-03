import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { URL_ROOT,PUBLIC_WEBSITE } from "../../constants/Config";
class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false
    };
    this.logout = this.logout.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
  }
  logout() {
    localStorage.removeItem("TOKEN");
    localStorage.removeItem("USER");
    localStorage.removeItem("FIREBASE_CURRENT_USER");
    window.location.href = `${URL_ROOT}/sign-in`;
  }
  toggleMenu() {
    let _this = this;
    _this.setState({
      toggle: !_this.state.toggle
    });
    _this.props.showHideMenu(_this.state.toggle);
  }
  publicWebSite = () => {
    let token = localStorage.getItem("TOKEN");
    let user = localStorage.getItem("USER");
    window.open(
      `${PUBLIC_WEBSITE}?token=${token}&user=${user}`,
      "_blank"
    );
  };
  render() {
    const {totalUserChatUnReply} = this.props;
    let renderCountUserReply = <div>
      {totalUserChatUnReply ? (<span className="badge badge-header badge-danger">{totalUserChatUnReply > 99 ? '99+' : totalUserChatUnReply }</span>) : ''}
    </div>;
    return (
      <div className="shadow-component ">
        <div id="navbar-container" className="boxed">
          <div className="navbar-content">
            <ul className="nav navbar-top-links">
              <li className="tgl-menu-btn">
                <a className=" pointer" onClick={this.toggleMenu}>
                  <i className="demo-pli-list-view" />
                </a>
              </li>
            </ul>
            <ul className="nav navbar-top-links">
              <li id="dropdown-user" className="dropdown">
                <NavLink to="/chat"
                  className="dropdown-toggle pointer"
                >
                  <i className="demo-pli-bell"></i>
                  {renderCountUserReply}
                </NavLink>
                <a
                  data-toggle="dropdown"
                  className="dropdown-toggle text-right pointer"
                >
                  <span className="ic-user pull-right">
                    <i className="demo-pli-male" />
                  </span>
                </a>
                <div className="dropdown-menu dropdown-menu-sm dropdown-menu-right panel-default">
                  <ul className="head-list">
                    <li>
                      <NavLink to="/user-info" className="pointer">
                        <i className="demo-pli-male icon-lg icon-fw" /> Profile
                      </NavLink>
                    </li>
                    <li>
                      <a
                        className="pointer"
                        onClick={() => {
                          this.publicWebSite();
                        }}
                      >
                        <i className="demo-pli-split-vertical-2 icon-lg icon-fw" />{" "}
                        Go to website
                      </a>
                    </li>
                    <li>
                      <a className="pointer" onClick={this.logout}>
                        <i className="demo-pli-unlock icon-lg icon-fw" /> Logout
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default NavBar;
