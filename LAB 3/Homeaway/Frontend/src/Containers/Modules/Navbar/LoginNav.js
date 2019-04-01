import React, { Component } from "react";
import "react-dates/initialize";

class LoginNav extends Component {
  render() {
    return (
      <nav
        className="navbar navbar-expand-lg navbar-light fixed-top shadow-sm p-3 mb-5 bg-white"
        id="loginNav"
        style={{ background: "#ffffff" }}
      >
        <div className="container">
          <a className="navbar-brand" href="/">
            <img
              src={"./img/HomeAway_LogoBlue.svg"}
              className="img-fluid"
              alt=""
            />
          </a>
        </div>
      </nav>
    );
  }
}

export default LoginNav;

