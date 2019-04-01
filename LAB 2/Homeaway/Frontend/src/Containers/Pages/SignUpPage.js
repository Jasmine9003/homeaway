import React, { Component } from "react";
import LoginNav from "../Modules/Navbar/LoginNav";
import SignUpHeader from "../Modules/Headers/SignUpHeader"
class SignUpPage extends Component {
 
  render() {
    return (
      <div>
        <LoginNav />
       <SignUpHeader/>
      </div>
    );
  }
}

export default SignUpPage;
