import React, { Component } from "react";
import "react-dates/initialize";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  getPropertiesWhere,
  searchParams
} from "../../../Actions/propertyActions";
import SearchPropertyForm from "../../../Components/SearchComponent";
import moment from "moment";
import { withRouter } from "react-router-dom";

class SearchNav extends Component {
  constructor(props) {
    super(props);

    this.onSearchClickedListener = this.onSearchClickedListener.bind(this);
  }

  onLogoutClickedListener = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("username");
    localStorage.removeItem("token_expiry");
    this.props.checkValidity();
  };

  onSearchClickedListener(values) {
    let data = {
      where: values.where,
      startDate: moment(values.when.startDate.toString()).format("L"),
      endDate: moment(values.when.endDate.toString()).format("L"),
      people: values.people
    };
    this.props.searchParams(data);
    this.props.getPropertiesWhere(data);
    this.props.history.push({
      pathname: "/Properties"
    });
  }

  render() {
    let email = localStorage.getItem("username");
    return (
      <div>
        <nav
          className="navbar  navbar-expand-lg navbar-light fixed-top   bg-white "
          id="loginNav"
          style={{ background: "#ffffff" }}>
          <a className="navbar-brand" href="/">
            <img
              src={"./img/HomeAway_LogoBlue.svg"}
              className="img-fluid"
              alt=""
            />
          </a>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item" />
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle "
                id="navbarDropdownMenuLink"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                href="">
                {email}
              </a>
              <div
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink">
                <a
                  href=""
                  onClick={this.onLogoutClickedListener}
                  className="nav-link dropdown-item"
                  style={{ color: "black" }}>
                  Logout
                </a>
              </div>
            </li>
            <li className="nav-item">
              <br />
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
        <br />
        <br />
        <br />
        <div className="card">
          <div className="container">
            <SearchPropertyForm onSubmit={this.onSearchClickedListener} />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    searchProperty: state.SearchPropertyReducer
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    { getPropertiesWhere, searchParams }
  )(SearchNav)
);
