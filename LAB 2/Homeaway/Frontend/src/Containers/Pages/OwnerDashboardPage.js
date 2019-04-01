import React, { Component } from "react";
import "react-dates/initialize";
import Tabs from "../../Components/TabList";
import PropertiesHeader from "../Modules/Headers/PropertiesHeader";
import OwnerBookingsHeader from "../Modules/Headers/OwnerBookingsHeader";
import OwnerMessagingHeader from "../Modules/Headers/OwnerMessagingHeader";
import { connect } from "react-redux";
import { checkValidity } from "../../Actions/userActions";
import { withRouter } from "react-router-dom";
import InternalNavTraveller from "../Modules/Navbar/InternalNavTraveller";
class OwnerDashboardPage extends Component {
  componentWillMount() {
    this.props.checkValidity();
  }
  render() {
    if (this.props.isValidTokenState !== undefined) {
      if (!this.props.isValidTokenState) {
        this.props.history.push({
          pathname: "/OwnerLogin"
        });
      }
    }
    let tabOne = <OwnerMessagingHeader />;
    let tabTwo = <PropertiesHeader />;
    let tabThree = <OwnerBookingsHeader />;

    return (
      <div>
        <InternalNavTraveller />

        <Tabs
          oneTab={tabOne}
          twoTab={tabTwo}
          threeTab={tabThree}
          oneTabName={"Messages"}
          twoTabName={"Properties"}
          threeTabName={"Bookings"}
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
  )(OwnerDashboardPage)
);
