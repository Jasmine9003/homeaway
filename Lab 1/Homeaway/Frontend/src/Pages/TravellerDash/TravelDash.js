import React, { Component } from "react";
import "react-dates/initialize";
import Profile from "../../Modules/Headers/ProfileHeader";
import cookie from 'react-cookies';
import { Redirect } from "react-router";
import Bookings from "../../Modules/Headers/Bookings";
import OtherNav from "../../Modules/Navbar/OtherNav";
import Tabs from "../../Components/TabList";

class TravelDash extends Component {

  render() {
    let redirectVar = null;
    if(!cookie.load('email')){
      redirectVar = <Redirect to= "/Login"/>
  }
  let tabOne= <Bookings /> ;
  let tabTwo= <Profile /> ;

    return (
      <div>
        {redirectVar}  
        <OtherNav/>
        <Tabs
        oneTab={tabOne}
        twoTab={tabTwo}
        oneTabName={"My Trips"}
        twoTabName={"Profile"}
        />
      </div>
    );
  }
}

export default TravelDash;
