import React, { Component } from "react";
import "react-dates/initialize";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class InternalNavTraveller extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
          LoginClicked: false,
          OwnerLoginClicked: false,
        };
      }

      onLogoutClickedListener = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("username");
        localStorage.removeItem("token_expiry");
        this.props.checkValidity();
      };
    
   
  render() {
    let email= localStorage.getItem("username");

    return (
      <nav
        className="navbar  navbar-expand-lg navbar-light fixed-top   bg-white "
        id="loginNav"
        style={{ background: "#ffffff" }}
      >
        <a className="navbar-brand" href="/">
          <img
            src={"./img/HomeAway_LogoBlue.svg"}
            className="img-fluid"
            alt=""
          />
        </a>
        <ul className="navbar-nav ml-auto">
        <li className="nav-item">
      </li>
        <li className="nav-item dropdown">
        
        <a
          className="nav-link dropdown-toggle "
          id="navbarDropdownMenuLink"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          href=""
        >
         {email}
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <a
            href=""
            onClick={this.onLogoutClickedListener}
            className="nav-link dropdown-item"
            style={{ color: "black" }}
          >
            Logout
          </a>
        </div>
      </li>
          <li className="nav-item">
          <br/>
          <Link to="/OwnerLogin">
                <button className="roundcornerbutton WhiteButtonTextBlue  navButtonCursor">
                  List Your Property
                </button>
              </Link>
          </li>

          <li className="nav-item">
        
            <a className="navbar-brand navButtonCursor smallNegetiveMarginUp">
              <img src={"./img/logoblue.svg"} className="img-fluid" alt="" />
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}


function mapStateToProps(state) {
  return { 
    tokenState:state.TokenReducer        
  };
}

export default connect(
  mapStateToProps,
)(InternalNavTraveller);
