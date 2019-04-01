import React, { Component } from "react";
import LoginNav from "../../Modules/Navbar/LoginNav"; 
import LoginHeader from "../../Modules/Headers/LoginHeader";


class OwnerLogin extends Component {
  render() {
    return (
      <div>
      <LoginNav/>
      <LoginHeader isOwner={true} isTraveller={false}/>
      </div>
      
    );
  }
}

export default OwnerLogin;
