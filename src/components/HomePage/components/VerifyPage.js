import React, { Component } from "react";
import { NotificationManager} from 'react-notifications';
import { activeAccount } from "../HomePageAction";
class VerifyPage extends Component {
  constructor(props) {
    super(props);    
  };
  async componentWillMount() {
    var { match } = this.props;
    if (match && match.params.id) { // update
        try {
            var response = await activeAccount(match.params.id);
            if(response && response.success){
                NotificationManager.success(`Active account success`);
            }else{
                NotificationManager.error(`Active account error `);      
            }
        } catch (error) {
          console.log(error)
          NotificationManager.error(`Active account error `);
        }
    }else{
        NotificationManager.error(`Active account error `);
    }
    this.props.history.push("/sign-in");
  }
  render() {
    return (
      <div id="container" className="cls-container">
        
      </div>
    );
  }
}

export default VerifyPage