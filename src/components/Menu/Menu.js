import React, { Component } from 'react';
// import { Link, Route } from 'react-router-dom';
import Dashboard from '../Dashboard/components/index';
import _ from 'lodash'
class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
          show : false
        };
      }
    componentDidMount(){
        var _this =this;
        var routerHide = ['/sign-in','/sign-up'];
        var exited = _.indexOf(routerHide,window.location.pathname) == -1 ? true : false;
        _this.setState({
            show : exited
        });
    }
    render() {
        const {show} =  this.state;
        return (
            // <nav className="navbar navbar-default">
            //     <ul className="nav navbar-nav">
            //         {this.showMenus(menus)}
            //     </ul>
            // </nav>
            <div>
                {show ? <Dashboard /> : '' }
                
            </div>
        );
    }

}

export default Menu;
