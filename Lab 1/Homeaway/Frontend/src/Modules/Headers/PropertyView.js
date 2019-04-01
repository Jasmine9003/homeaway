import React, { Component } from "react";
import "react-dates/initialize";
import axios from "axios";
import { Redirect } from "react-router";
import PropertyDetailsDisplay from "./PropertyDetailsDisplay";
import PropertyBookingPanel from "../../Components/PropertyViewPanels/BookingPanel.js";
import PropertyBookedPanel from "../../Components/PropertyViewPanels/ViewBookingPanel";
import OwnerPropertyPanel from "../../Components/PropertyViewPanels/OwnerViewProperty";

import LoginNav from "../Navbar/LoginNav";
import cookie from "react-cookies";
import OwnerBookingPanel from "../../Components/PropertyViewPanels/OwnerViewBookings";

class PropertyView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      adl1: "",
      adl2: "",
      city: "",
      state: "",
      zip: 0,
      owneremail:"",
      country: "",
      phone: 0,
      headline: "",
      description: "",
      placetype: "",
      bedrooms: 0,
      bathrooms: 0,
      accomdates: 0,
      images: "",
      startDate: null,
      endDate: null,
      currency: "",
      pricepernight: 0,
      minimumstay: 0,
      index: 0,
      direction: null,
      callfrom: "Customer",
      pid: 18,
      bookStart: null,
      bookEnd: null,
      availablefrom:null,
      availableto:null,
      booker:""
    };
  }

  componentWillMount() {
    if (this.props.location.state.callfrom === "Customer") {
      this.setState({
        callfrom: "Customer",
        pid: this.props.location.state.pid
      });
    } else if (this.props.location.state.callfrom === "BookedCustomer") {
      console.log("Booked Cutomer");
      this.setState({
        callfrom: "BookedCustomer",
        pid: this.props.location.state.pid,
        bookStart: this.props.location.state.startDate,
        bookEnd: this.props.location.state.endDate
      });
    }else if (this.props.location.state.callfrom === "Owner") {
      this.setState({
        callfrom: "Owner",
        pid: this.props.location.state.pid,
      
      });
    }else if (this.props.location.state.callfrom === "OwnerBooking") {
      this.setState({
        callfrom: "OwnerBooking",
        pid: this.props.location.state.pid,
        bookStart: this.props.location.state.startDate,
        bookEnd: this.props.location.state.endDate,
        cost:this.props.location.state.cost,
        currency:this.props.location.state.currency,
        booker:this.props.location.state.booker
      
      });
    }
    var data = {
      pid: this.props.location.state.pid
    };
    //Get All Property Information
    axios.defaults.withCredentials = true;
    axios
      .post("http://localhost:8000/getPropertyInformation", data)
      .then(response => {
        if (response.status === 200) {
          if (response.data.success) {
            console.log(response.data.prop);
            this.setState({
              adl1: response.data.prop.adl1,
              adl2: response.data.prop.adl2,
              city: response.data.prop.city,
              state: response.data.prop.state,
              zip: response.data.prop.zip,
              country: response.data.prop.country,
              phone: response.data.prop.phone,
              headline: response.data.prop.headline,
              description: response.data.prop.description,
              placetype: response.data.prop.type,
              bedrooms: response.data.prop.bedrooms,
              bathrooms: response.data.prop.bathrooms,
              accomdates: response.data.prop.accomodates,
              images: response.data.prop.photos,
              minimumstay: response.data.prop.minimumstay,
              startDate: response.data.prop.availablefrom,
              endDate: response.data.prop.availableto,
              pricepernight: response.data.prop.baserent,
              currency: response.data.prop.currency,
             
              owneremail:response.data.prop.uemail
            });
          }
        }
      });
  }

  render() {
    //Sidepanel Changes Based on Weather its Travellere or Owner of Said Property

    let sidepanel = null;
    if (this.state.callfrom === "Customer") {
      //Customer is Viewing Property
      sidepanel = (
        <PropertyBookingPanel
          currency={this.state.currency}
          pricepernight={this.state.pricepernight}
          availablefrom={this.state.availablefrom}
          availableto={this.state.availableto}
          pid={this.state.pid}
          city={this.state.city}
          owneremail={this.state.owneremail}
        />
      );
    } else if (this.state.callfrom === "Owner") {
      sidepanel = (
        <OwnerPropertyPanel
        currency={this.state.currency}
        pricepernight={this.state.pricepernight}
        startDate={this.state.startDate}
        endDate={this.state.endDate}
        pid={this.state.pid}
      />
      );
     
    } else if (this.state.callfrom === "BookedCustomer") {
      sidepanel = (
        <PropertyBookedPanel
          currency={this.state.currency}
          pricepernight={this.state.pricepernight}
          startDate={this.state.bookStart}
          endDate={this.state.bookEnd}
          pid={this.state.pid}
        />
      );
    }    if (this.state.callfrom === "OwnerBooking") {
      //Customer is Viewing Property
      sidepanel = (
        <OwnerBookingPanel
          currency={this.state.currency}
          pricepernight={this.state.pricepernight}
          bookingfrom={this.state.bookStart}
          bookingto={this.state.bookEnd}
          cost={this.state.cost}
          pid={this.state.pid}
          booker={this.state.booker}
          owneremail={this.state.owneremail}
        />
      );
    } 
    let redirectVar = null;

    if (this.state.BookingAddedSucessfully) {
      redirectVar = <Redirect to="/TravelDash" />;
    }
    if (this.state.traveldashshow) {
      redirectVar = <Redirect to="/TravelDash" />;
    }
    if (!cookie.load("email")) {
      redirectVar = <Redirect to="/Login" />;
    }

    return (
      <div>
        <LoginNav />
        <div className="container">
          {redirectVar}
          <div className="row">
            <div className="col-8">
              <PropertyDetailsDisplay
                adl1={this.state.adl1}
                adl2={this.state.adl2}
                city={this.state.city}
                state={this.state.state}
                zip={this.state.zip}
                country={this.state.country}
                phone={this.state.phone}
                headline={this.state.headline}
                description={this.state.description}
                placetype={this.state.type}
                bedrooms={this.state.bedrooms}
                bathrooms={this.state.bathrooms}
                accomdates={this.state.accomdates}
                images={this.state.images}
                minimumstay={this.state.minimumstay}
                email={this.state.owneremail}

              />
            </div>

            <div className="col-4">{sidepanel}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default PropertyView;
