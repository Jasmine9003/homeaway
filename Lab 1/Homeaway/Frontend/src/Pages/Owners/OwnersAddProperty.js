import React, { Component } from "react";
import { Redirect } from "react-router";
import cookie from "react-cookies";
import "react-dates/initialize";
import AddressForm from "../../Modules/OwnerForms/address";
import DescriptionForm from "../../Modules/OwnerForms/description";
import ImagesForm from "../../Modules/OwnerForms/images";
import LoginNav from "../../Modules/Navbar/LoginNav";
import RatesForm from "../../Modules/OwnerForms/rates";
import AvailabilityForm from "../../Modules/OwnerForms/availability";
import ReviewForm from "../../Modules/OwnerForms/review";

class OwnerPropertyAdd extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      showAddressState: false,
      showDescriptionState: false,
      showImagesState: false,
      showPricingList: false,
      showRatesState: false,
      showAvailability: false,
      //-------------------//
      //    Address        //
      //-------------------//
      adl1: "",
      adl2: "",
      city: "",
      state: "",
      zip: 0,
      country: "",
      phone: 0,
      //-------------------//
      //    Description    //
      //-------------------//
      headline: "",
      description: "",
      placetype: "apartment",
      bedrooms: 0,
      bathrooms: 0,
      accomdates: 0,
      //-------------------//
      //    Images          //
      //-------------------//
      images: [],
      imagefiles: [],
      //-------------------//
      //    Availability    //
      //-------------------//
      startDate: null,
      endDate: null,
      //-------------------//
      //    Rates          //
      //-------------------//
      currency: "AUD",
      pricepernight: 0,
      minimumstay: 0,
      showReview: false
    };
    //---------------------------//
    //    Description Handlers   //
    //---------------------------//
    this.headlineChangeHandler = this.headlineChangeHandler.bind(this);
    this.descriptionChangeHandler = this.descriptionChangeHandler.bind(this);
    this.placetypeChangeHandler = this.placetypeChangeHandler.bind(this);
    this.bedroomChangeHandler = this.bedroomChangeHandler.bind(this);
    this.bathroomChangeHandler = this.bathroomChangeHandler.bind(this);
    this.accomdatesChangeHandler = this.accomdatesChangeHandler.bind(this);
    //---------------------------//
    //    Address Handlers       //
    //---------------------------//
    this.addressLine1ChangeHandler = this.addressLine1ChangeHandler.bind(this);
    this.addressLine2ChangeHandler = this.addressLine2ChangeHandler.bind(this);
    this.cityChangeHandler = this.cityChangeHandler.bind(this);
    this.stateChangeHandler = this.stateChangeHandler.bind(this);
    this.zipChangeHandler = this.zipChangeHandler.bind(this);
    this.countryChangeHandler = this.countryChangeHandler.bind(this);

    //---------------------------//
    //    Image    Handlers      //
    //---------------------------//
    this.ImageAddedHandler = this.ImageAddedHandler.bind(this);
    this.ImageFilesAddedHandler = this.ImageFilesAddedHandler.bind(this);

    //----------------------------//
    //  Availability  Handlers   //
    //--------------------------//
    this.datesChageHandler = this.datesChageHandler.bind(this);
    this.getStartDate = this.getStartDate.bind(this);
    this.getEndDate = this.getEndDate.bind(this);

    //----------------------------//
    //    Rates    Handlers      //
    //--------------------------//
    this.currencyChangeHandler = this.currencyChangeHandler.bind(this);
    this.pricepernightChangeHandler = this.pricepernightChangeHandler.bind(this);
    this.minstayChangeHandler = this.minstayChangeHandler.bind(this);

    //----------------------------//
    //    Other    Handlers      //
    //--------------------------//
    this.addressClickHandler = this.addressClickHandler.bind(this);
    this.descriptionClickHandler = this.descriptionClickHandler.bind(this);
    this.imageClickHandler = this.imageClickHandler.bind(this);
    this.ratesClickHandler = this.ratesClickHandler.bind(this);
    this.pricingClickHandler = this.pricingClickHandler.bind(this);
    this.reviewClickHandler = this.reviewClickHandler.bind(this);
  }

  //---------------------------//
  //    Description Handlers   //
  //---------------------------//
  headlineChangeHandler = head => {
    this.setState({
      headline: head
    });
  };

  descriptionChangeHandler = des => {
    this.setState({
      description: des
    });
  };

  placetypeChangeHandler = placet => {
    this.setState({
      placetype: placet
    });
  };

  bedroomChangeHandler = beds => {
    this.setState({
      bedrooms: beds
    });
  };

  bathroomChangeHandler = baths => {
    this.setState({
      bathrooms: baths
    });
  };

  accomdatesChangeHandler = acmdts => {
    this.setState({
      accomdates: acmdts
    });
  };
  //---------------------------//
  //    Address    Handlers   //
  //---------------------------//
  addressLine1ChangeHandler = e => {
    this.setState({
      adl1: e
    });
  };

  addressLine2ChangeHandler = e => {
    this.setState({
      adl2: e
    });
  };

  cityChangeHandler = e => {
    this.setState({
      city: e
    });
  };

  stateChangeHandler = e => {
    this.setState({
      state: e
    });
  };

  zipChangeHandler = e => {
    this.setState({
      zip: e
    });
  };

  countryChangeHandler = e => {
    this.setState({
      country: e
    });
  };

  phoneChangeHandler = e => {
    this.setState({
      phone: e
    });
  };

  //---------------------------//
  //    Image    Handlers      //
  //---------------------------//
  ImageAddedHandler = e => {
    this.setState({
      images: this.state.images.concat(e)
    });
  };
  ImageFilesAddedHandler = e => {
    this.setState({
      imagefiles: this.state.imagefiles.concat(e)
    });
    console.log(e);
  };

  //---------------------------//
  //  Availability Handlers    //
  //---------------------------//
  datesChageHandler = ({ startDate, endDate }) => {
    this.setState({ startDate, endDate });
  };

  getStartDate = () => {
    return this.state.startDate;
  };

  getEndDate = () => {
    return this.state.endDate;
  };

  //----------------------------//
  //    Rates    Handlers      //
  //--------------------------//
  currencyChangeHandler = e => {
    this.setState({
      currency: e
    });
  };

  pricepernightChangeHandler = e => {
    this.setState({
      pricepernight: e
    });
  };

  minstayChangeHandler = e => {
    this.setState({
      minimumstay: e
    });
  };

  addressClickHandler = e => {
    this.setState({
      showAddressState: true,
      showDescriptionState: false,
      showImagesState: false,
      showRatesState: false,
      showAvailability: false,
      showReview: false
    });
  };

  descriptionClickHandler = e => {
    this.setState({
      showAddressState: false,
      showDescriptionState: true,
      showImagesState: false,
      showRatesState: false,
      showAvailability: false,
      showReview: false
    });
  };

  imageClickHandler = e => {
    this.setState({
      showAddressState: false,
      showDescriptionState: false,
      showImagesState: true,
      showRatesState: false,
      showAvailability: false,
      showReview: false
    });
  };
  ratesClickHandler = e => {
    this.setState({
      showAddressState: false,
      showDescriptionState: false,
      showImagesState: false,
      showRatesState: true,
      showAvailability: false,
      showPricingList: true,
      showReview: false
    });
  };

  availabilityClickHandler = e => {
    this.setState({
      showAddressState: false,
      showDescriptionState: false,
      showImagesState: false,
      showRatesState: false,
      showAvailability: true,
      showPricingList: true,
      showReview: false
    });
  };

  reviewClickHandler = e => {
    this.setState({
      showAddressState: false,
      showDescriptionState: false,
      showImagesState: false,
      showRatesState: false,
      showAvailability: false,
      showReview: true
    });
  };

  pricingClickHandler = e => {
    this.setState({
      showPricingList: !this.state.showPricingList
    });
  };

  render() {
    let formshow = (
      <AddressForm
        onAddressLineOneChange={this.addressLine1ChangeHandler}
        onAddressLineTwoChange={this.addressLine2ChangeHandler}
        onCityChange={this.cityChangeHandler}
        onStateChange={this.stateChangeHandler}
        onZipChange={this.zipChangeHandler}
        onCountryChange={this.countryChangeHandler}
        onPhoneChange={this.phoneChangeHandler}
        adl1={this.state.adl1}
        adl2={this.state.adl2}
        city={this.state.city}
        state={this.state.state}
        zip={this.state.zip}
        country={this.state.country}
        phone={this.state.phone}
        OnNextPressed={this.descriptionClickHandler}
      />
    );
    if (this.state.showAddressState) {
      formshow = (
        <AddressForm
          onAddressLineOneChange={this.addressLine1ChangeHandler}
          onAddressLineTwoChange={this.addressLine2ChangeHandler}
          onCityChange={this.cityChangeHandler}
          onStateChange={this.stateChangeHandler}
          onZipChange={this.zipChangeHandler}
          onCountryChange={this.countryChangeHandler}
          onPhoneChange={this.phoneChangeHandler}
          adl1={this.state.adl1}
          adl2={this.state.adl2}
          city={this.state.city}
          state={this.state.state}
          zip={this.state.zip}
          country={this.state.country}
          phone={this.state.phone}
          OnNextPressed={this.descriptionClickHandler}
        />
      );
    } else if (this.state.showDescriptionState) {
      formshow = (
        <DescriptionForm
          onHeadlineChange={this.headlineChangeHandler}
          onDescriptionChange={this.descriptionChangeHandler}
          onPlaceTypeChange={this.placetypeChangeHandler}
          onBedroomChange={this.bedroomChangeHandler}
          onBathroomChange={this.bathroomChangeHandler}
          onAccomodatesChange={this.accomdatesChangeHandler}
          headline={this.state.headline}
          description={this.state.description}
          placetype={this.state.placetype}
          bedrooms={this.state.bedrooms}
          bathrooms={this.state.bathrooms}
          accomdates={this.state.accomdates}
          OnNextPressed={this.imageClickHandler}
          OnBackPressed={this.addressClickHandler}
        />
      );
    } else if (this.state.showImagesState) {
      formshow = (
        <ImagesForm
          OnImagesAdded={this.ImageAddedHandler}
          OnImageFilesChanged={this.ImageFilesAddedHandler}
          images={this.state.images}
          imagefiles={this.state.imagefiles}
          OnNextPressed={this.availabilityClickHandler}
          OnBackPressed={this.descriptionClickHandler}
        />
      );
    } else if (this.state.showRatesState) {
      formshow = (
        <RatesForm
          onCurrencyChange={this.currencyChangeHandler}
          onPricePerNightChange={this.pricepernightChangeHandler}
          onMinimumStayChange={this.minstayChangeHandler}
          currency={this.state.currency}
          pricepernight={this.state.pricepernight}
          minimumstay={this.state.minimumstay}
          OnBackPressed={this.availabilityClickHandler}
          OnNextPressed={this.reviewClickHandler}
        />
      );
    } else if (this.state.showAvailability) {
      formshow = (
        <AvailabilityForm
          WhenDateChanged={this.datesChageHandler}
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          OnNextPressed={this.ratesClickHandler}
          OnBackPressed={this.imageClickHandler}
        />
      );
    } else if (this.state.showReview) {
      formshow = (
        <ReviewForm
          adl1={this.state.adl1}
          adl2={this.state.adl2}
          city={this.state.city}
          state={this.state.state}
          zip={this.state.zip}
          country={this.state.country}
          phone={this.state.phone}
          headline={this.state.headline}
          description={this.state.description}
          placetype={this.state.placetype}
          bedrooms={this.state.bedrooms}
          bathrooms={this.state.bathrooms}
          accomdates={this.state.accomdates}
          images={this.state.images}
          currency={this.state.currency}
          pricepernight={this.state.pricepernight}
          minimumstay={this.state.minimumstay}
          OnBackPressed={this.ratesClickHandler}
          imagefiles={this.state.imagefiles}
          getStartDate={this.getStartDate}
          getEndDate={this.getEndDate}
        />
      );
    }

    let listshow = null;
    if (this.state.showPricingList) {
      listshow = (
        <div>
          <li onClick={this.availabilityClickHandler}>
            <span className="btn">Availability</span>
          </li>
          <li>
            <span onClick={this.ratesClickHandler} className="btn">
              Rental Rates
            </span>
          </li>
        </div>
      );
    } else {
      listshow = null;
    }

    // Check Cookie Redirect to Owner Login if not Logged In
    let redirectVar = null;
    if (!cookie.load("email")) {
      redirectVar = <Redirect to="/OwnerLogin" />;
    }
    return (
      <div>
        {redirectVar}
        <LoginNav />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <div className="container">
          <div className="row">
            <div className="col-3">
              <br />
              <br />
              <br />
              <ul className="OwnerBulletless">
                <li onClick={this.addressClickHandler}>
                  <span className="oi oi-circle-check bulletIncreaseSize " />
                  <span className="btn">Location</span>
                </li>
                <li onClick={this.descriptionClickHandler}>
                  <span className="oi oi-circle-check bulletIncreaseSize " />
                  <span className="btn">Details</span>
                </li>
                <li onClick={this.imageClickHandler}>
                  <span className="oi oi-circle-check bulletIncreaseSize " />
                  <span className="btn">Photos</span>
                </li>
                <li onClick={this.pricingClickHandler}>
                  <span className="oi oi-circle-check bulletIncreaseSize " />
                  <span className="btn">Pricing</span>
                </li>
                {listshow}
                <li onClick={this.reviewClickHandler}>
                  <span className="oi oi-circle-check bulletIncreaseSize " />
                  <span className="btn">Review</span>
                </li>
              </ul>
            </div>
            {formshow}
          </div>
        </div>
      </div>
    );
  }
}

export default OwnerPropertyAdd;
