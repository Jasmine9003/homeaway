import React, { Component } from "react";
import LandingHeader from "../../Modules/Headers/LandingHeader";
import LandingNav from "../../Modules/Navbar/LandingNav";

class LandingPage extends Component {
  render() {
    return (
      <div>
        <LandingNav/>
        <LandingHeader />
      </div>
    );
  }
}
export default LandingPage;
