import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import _ from 'lodash'
class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toogleNavBar: true,
      toogleMenu: {
        name: "",
        show: false
      },
      listMenuToggle: ['config']
    };
    this.showHideNavbar = this.showHideNavbar.bind(this);
  }
  componentWillMount(){
    let {toogleMenu,listMenuToggle} = this.state;
    let url = window.location.pathname;
    let menuName = _.find(listMenuToggle,(o) =>{
      return url.indexOf(o) > -1;
    });
    if(menuName){
      toogleMenu.name = menuName;
      toogleMenu.show = true;
    }
    this.setState({
      toogleMenu : toogleMenu
    })
  }
  showHideNavbar(val) {
    var _this = this;
    _this.setState({
      toogleNavBar: val
    });
  }
  toogleMenu = val => {
    let {toogleMenu} = this.state;
    if(toogleMenu.name == val){
      toogleMenu.show = !toogleMenu.show;
    }else{
      toogleMenu.show = true;
      toogleMenu.name = val;
    }
    this.setState({
      toogleMenu : toogleMenu
    })
  };
  render() {
    const { toogleNavBar,toogleMenu } = this.state;
    return (
      <div
        id="container"
        className="effect aside-float aside-bright mainnav-lg position-absolute"
      >
        <div className="boxed">
          <nav
            id="mainnav-container"
            className={toogleNavBar ? "show" : "hide"}
          >
            <div id="mainnav">
              <div id="mainnav-menu-wrap">
                <div className="nano has-scrollbar">
                  <div className="nano-content">
                    <ul id="mainnav-menu" className="list-group">
                      <li className="list-header">Menu</li>
                      <li onClick={() =>{this.toogleMenu('')}}>
                        <NavLink
                          to="/dashboard"
                          activeClassName="activeRoute"
                          activeStyle={{ color: "teal" }}
                        >
                          DashBoard
                        </NavLink>
                      </li>
                      <li onClick={() =>{this.toogleMenu('')}}>
                        <NavLink
                          to="/product-type"
                          activeClassName="activeRoute"
                          activeStyle={{ color: "teal" }}
                        >
                          Products Type
                        </NavLink>
                      </li>
                      <li onClick={() =>{this.toogleMenu('')}}>
                        <NavLink
                          to="/product-manager"
                          activeClassName="activeRoute"
                          activeStyle={{ color: "teal" }}
                        >
                          Products Manager
                        </NavLink>
                        <NavLink
                          to="/chat"
                          activeClassName="activeRoute"
                          activeStyle={{ color: "teal" }}
                        >
                          Chat Admin
                        </NavLink>
                        {/* <NavLink
                          to="/config-menu"
                          activeClassName="activeRoute"
                          activeStyle={{ color: "teal" }}
                        >
                          Config Menu
                        </NavLink> */}
                        <NavLink
                          to="/history"
                          activeClassName="activeRoute"
                          activeStyle={{ color: "teal" }}
                        >
                          Logs History
                        </NavLink>
                      </li>
                      <li >
                        <a className="pointer" onClick={() =>{this.toogleMenu('config')}}>
                          <span className="menu-title">Config Layout</span>
                          <i className={ toogleMenu.name == 'config' && toogleMenu.show ? 'fa fa-caret-down pull-right' : 'fa fa-caret-right pull-right'}></i>
                        </a>
                        <ul aria-expanded="true" className={toogleMenu.name == 'config' && toogleMenu.show ? `collapse in` : `collapse`}>
                          <li>
                            <NavLink
                              to="/config-menu"
                              activeClassName="activeRoute"
                              activeStyle={{ color: "teal" }}
                            >
                              Menu header
                            </NavLink>
                            <NavLink
                              to="/config-icon-header"
                              activeClassName="activeRoute"
                              activeStyle={{ color: "teal" }}
                            >
                              Icon header
                            </NavLink>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </nav>
          <div
            className={
              toogleNavBar ? "col-sm-10 col-sm-push-2 pr-50 mt-40" : "col-sm-12"
            }
          />
        </div>
      </div>
    );
  }
}

export default Menu;
