import React, { Component } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { checkValidity } from "../../../Actions/userActions";
import { connect } from "react-redux";

class LandingNav extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      LoginClicked: false,
      OwnerLoginClicked: false,
    };
  }

   onListPropertiesClicked (e) {
    e.preventDefault();
  }
  componentWillMount(){
    this.props.checkValidity();
  }



  render() {
    let Listing1 = "";
    let Listing2 = "";
    if (!this.props.tokenState.validity) {
      Listing1 = "Traveller Login";
      Listing2 = "Owner Login";
    } else {
      Listing1 = "Traveller Dashboard";
      Listing2 = "Owner Dashboard";
    }

    let redirectVar =null;
    if(this.state.LoginClicked){
    redirectVar = <Redirect to= "/Login"/>
    }else if(this.state.OwnerLoginClicked){
    redirectVar = <Redirect to= "/OwnerLogin"/>
    }
    let loginsitem = (
      <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle smallNegetiveMarginUp"
          id="navbarDropdownMenuLink"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          href=""
        >
          Login
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <a
            href="/Login"
            className="nav-link dropdown-item"
            style={{ color: "black" }}
          >
            {Listing1}
          </a>
          <a 
            className="nav-link dropdown-item"
            href="/OwnerLogin"
            style={{ color: "black" }}
          >
            {Listing2}
          </a>
        </div>
      </li>
    );

    return (
      <nav
        className="navbar navbar-expand-lg navbar-light fixed-top"
        id="mainNav"
      > {redirectVar}
        <a className="navbar-brand" >
          <img src={"./img/HomeAway_Logo.svg"} className="img-fluid navButtonCursor" alt="" />
        </a>
        
        
        <button
          className="navbar-toggler navbar-toggler-right"
          type="button"
          data-toggle="collapse"
          data-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          Menu
          <i className="fas fa-bars" />
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav ml-auto">
          <a
          className="nav-link  smallNegetiveMarginUp"
          role="button"

          href="/Login"
        >
          Trip Boards
        </a>
            {loginsitem}
            <li className="nav-item">
            <br/>
            <Link to='/OwnerLogin'>

              <button          
              className="roundcornerbutton WhiteButtonTextBlue smallNegetiveMarginUp navButtonCursor"
              >

                List Your Property
              </button>
              </Link>
            </li>
            <li className="nav-item">
            <br/>
            <a className="navbar-brand navButtonCursor" >
             <img src={"./img/logowhite.svg"} className="img-fluid" alt="" />
             </a>
            </li>
          </ul>
        </div>
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
  {  checkValidity }
)(LandingNav);
