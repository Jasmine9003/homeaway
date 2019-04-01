import React, { Component } from "react";
import "react-dates/initialize";
import BookingsHeader from "../Modules/Headers/BookingsHeader";
import Tabs from "../../Components/TabList";
import ProfileHeader from "../Modules/Headers/ProfileHeader";
import InternalNavTraveller from "../Modules/Navbar/InternalNavTraveller";
import { connect } from "react-redux";
import { checkValidity } from "../../Actions/userActions";
import { withRouter } from "react-router-dom";

class TravelDashboardPage extends Component {
  componentWillMount() {
    this.props.checkValidity();
  }

  render() {
    if (this.props.isValidTokenState !== undefined) {
      if (!this.props.isValidTokenState) {
        this.props.history.push({
          pathname: "/Login"
        });
      }
    }
    let redirectVar = null;
    let tabOne = <BookingsHeader />;
    let tabTwo = <ProfileHeader />;

    return (
      <div>
        {redirectVar}
        <InternalNavTraveller />
        <Tabs
          oneTab={tabOne}
          twoTab={tabTwo}
          oneTabName={"Bookings"}
          twoTabName={"Profile"}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isValidTokenState: state.TokenReducer.validity
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    { checkValidity }
  )(TravelDashboardPage)
);
