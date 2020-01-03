import React, { Component } from "react";
import { Base64 } from 'js-base64';
class AccessTokenPage extends Component {
  constructor(props) {
    super(props);    
  };
  async componentWillMount() {
    const { history } = this.props;
    try {
        const urlParams = new URLSearchParams(history.location.search);
        const user = Base64.decode(urlParams.get('user'));
        localStorage.setItem("TOKEN", urlParams.get('token'));
        localStorage.setItem("USER", user);
    } catch (error) {
        console.log(error);
    }
    window.location.href = `${window.location.origin}`;
  }
  render() {
    return (
      <div id="container" className="cls-container">
        
      </div>
    );
  }
}

export default AccessTokenPage