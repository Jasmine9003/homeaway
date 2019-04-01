import React, { Component } from "react";
import "react-dates/initialize";
import Properties from "../../Modules/Headers/PropertiesHeader";
import { Redirect } from "react-router";
import OwnerBookings from "../../Modules/Headers/OwnerBookings";
import cookie from 'react-cookies';
import Tabs from "../../Components/TabList";
import OtherNav from "../../Modules/Navbar/OtherNav";


class OwnerDash extends Component {

  render() {
    let redirectVar = null;
    if(!cookie.load('email')){
      redirectVar = <Redirect to= "/OwnerLogin"/>
  }
  let tabOne= <Properties /> ;
  let tabTwo= <OwnerBookings /> ;

    return (
      <div>
        {redirectVar}  
        <OtherNav/>
        <Tabs
        oneTab={tabOne}
        twoTab={tabTwo}
        oneTabName={"Properties"}
        twoTabName={"Bookings"}
        />
      </div>
    );
  }
}

export default OwnerDash;
