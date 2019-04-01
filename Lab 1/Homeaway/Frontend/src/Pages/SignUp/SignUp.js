import React, { Component } from "react";
import LoginNav from "../../Modules/Navbar/LoginNav";
import SignUpHeader from "../../Modules/Headers/SignUpHeader"
class SignUp extends Component {
 
  render() {
    return (
      <div>
        <LoginNav />
       <SignUpHeader/>
      </div>
    );
  }
}

export default SignUp;
