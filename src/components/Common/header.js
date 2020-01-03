import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import _ from "lodash";
import "./common.css"
class Headers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCheckAll: false
    };
  }
  changeCheckAll = val => {
    this.setState({
      isCheckAll: !this.state.isCheckAll
    });
    this.props.checkAll(this.state.isCheckAll, "mutiple");
  };
  render() {
    const { headers, isHideDeleteAll } = this.props;
    var headerRender = _.map(headers, (item, i) => (
      <th key={i} className="header">{item.label}</th>
    ));
    if (isHideDeleteAll) {
      return (
        <tr>
          {headerRender}
        </tr>
      );
    }else{
      return (
        <tr>
          <th>
            <input
              type="checkbox"
              value={this.state.isCheckAll}
              onChange={this.changeCheckAll}
            />
          </th>
          {headerRender}
        </tr>
      );
    }
  }
}

export default Headers;
