import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import cookie from 'react-cookies';

class ReviewForm extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      adl1: this.props.adl1,
      adl2: this.props.adl2,
      city: this.props.city,
      state: this.props.state,
      zip: this.props.zip,
      country: this.props.country,
      phone: this.props.phone,
      headline: this.props.headline,
      description: this.props.description,
      placetype: this.props.placetype,
      bedrooms: this.props.bedrooms,
      bathrooms: this.props.bathrooms,
      accomdates: this.props.accomdates,
      images: this.props.images,
      startDate: this.props.startDate,
      endDate: this.props.endDate,
      currency: this.props.currency,
      pricepernight: this.props.pricepernight,
      minimumstay: this.props.minimumstay,
      imagefiles: this.props.imagefiles,
      isuploading: false,
      errorState: false,
      errorMessage: [],
      propertyAddedSucessfully: false,
      email:cookie.load("email")
    };
  }

  getFieldMapping(key) {
    switch (key) {
      case "adl1":
        return "Address Line 1";
      case "adl2":
        return "Address Line 2";
      case "city":
        return "City";
      case "state":
        return "State";
      case "zip":
        return "Zip";
      case "country":
        return "Country";
      case "phone":
        return "Phone";
      case "headline":
        return "Headline";
      case "description":
        return "Description";
      case "placetype":
        return "Place Type";
      case "bedrooms":
        return "Bedrooms";
      case "bathrooms":
        return "Bathrooms";
      case "accomdates":
        return "Accomodates";
      case "images":
        return "Images";
      case "startDate":
        return "Start Date";
      case "endDate":
        return "End Date";
      case "currency":
        return "Currency";
      case "pricepernight":
        return "Price per Night";
      case "minimumstay":
        return "Minimum Stay";
      default:
        return "Invalid";
    }
  }

  checkValidation = data => {
    return new Promise(function(resolve, reject) {
      let ErrorLog = [];
      Object.keys(data).forEach(k => {
        if (data[k] === undefined) {
          ErrorLog.push({ errorinfield: k, errorType: "Field Data Undefined" });
        } else {
          if (data[k].toString().replace(/\s/g, "") === "") {
            ErrorLog.push({ errorinfield: k, errorType: "Field left Blank" });
          } else if (data[k].toString() === "0") {
            ErrorLog.push({ errorinfield: k, errorType: "Cannot be 0" });
          }
        }
      });
      if (ErrorLog.length > 0) {
        reject(ErrorLog);
      } else {
        resolve(true);
      }
    });
  };

  componentWillReceiveProps(nextProps) {
    let startDate = this.props.getStartDate();
    let endDate = this.props.getEndDate();
    this.setState({
      adl1: nextProps.adl1,
      adl2: nextProps.adl2,
      city: nextProps.city,
      state: nextProps.state,
      zip: nextProps.zip,
      country: nextProps.country,
      phone: nextProps.phone,
      headline: nextProps.headline,
      description: nextProps.description,
      placetype: nextProps.placetype,
      bedrooms: nextProps.bedrooms,
      bathrooms: nextProps.bathrooms,
      accomdates: nextProps.accomdates,
      images: nextProps.images,
      startDate: startDate,
      endDate: endDate,
      currency: nextProps.currency,
      pricepernight: nextProps.pricepernight,
      minimumstay: nextProps.minimumstay,
      imagefiles: nextProps.imagefiles
    });
  }

  submitProperty = e => {
    console.log(this.state.startDate);
    e.preventDefault();
    let startDate = this.props.getStartDate();
    let endDate = this.props.getEndDate();

    const data = {
      adl1: this.state.adl1,
      adl2: this.state.adl2,
      city: this.state.city,
      state: this.state.state,
      zip: this.state.zip,
      country: this.state.country,
      phone: this.state.phone,
      headline: this.state.headline,
      description: this.state.description,
      placetype: this.state.placetype,
      bedrooms: this.state.bedrooms,
      bathrooms: this.state.bathrooms,
      accomdates: this.state.accomdates,
      currency: this.state.currency,
      pricepernight: this.state.pricepernight,
      minimumstay: this.state.minimumstay,
      startDate: startDate,
      endDate: endDate,
      email:cookie.load("email")
    };

    this.checkValidation(data)
      .then(go => {
        let imagecount = this.state.imagefiles.length;

        if (go && imagecount >= 2) {
          let formData = new FormData();
          Object.keys(data).forEach(function(key) {
            formData.append(key, data[key]);
          });
          this.state.imagefiles.forEach(element => {
            formData.append("photos", element);
          });

          axios.defaults.withCredentials = true;
          axios
            .post("http://localhost:8000/addProperty", formData)
            .then(response => {
              console.log("Status Code : ", response.status);
              if (response.status === 200) {
                this.setState({
                  propertyAddedSucessfully: true
                });
              }
            });
        } else {
          let imgErr = [
            { errorinfield: "images", errorType: "Need Minimum 2 Images" }
          ];
          this.setState({
            errorState: true,
            errorMessage: imgErr
          });
        }
      })
      .catch(ErrorLog => {
        this.setState({
          errorState: true,
          errorMessage: ErrorLog
        });
        console.log(this.state.errorMessage);
      });
  };

  render() {
    let errors = this.state.errorMessage.map(ere => {
      return (
        <div>
          <span className="text-danger">
            {this.getFieldMapping(ere.errorinfield)} : {ere.errorType}{" "}
          </span>
          <br />
        </div>
      );
    });

    let thumbnails = this.state.images.map(image => {
      return (
        <li>
          <img
            data-toggle="modal"
            data-target={"#imagemodal" + image.imgCount}
            src={image.imgSrc}
            alt="..."
            className="img-thumbnail resize"
          />
        </li>
      );
    });

    let modals = this.state.images.map(image => {
      return (
        <div
          className="modal fade bd-example-modal-lg"
          id={"imagemodal" + image.imgCount}
          yabIndex="-1"
          role="dialog"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <img
                data-toggle="modal"
                data-target={"#imagemodal" + image.imgCount}
                src={image.imgSrc}
                alt="..."
                className="img resizeModal"
              />
            </div>
          </div>
        </div>
      );
    });
    let redirectVar = null;

    if (this.state.propertyAddedSucessfully) {
      redirectVar = <Redirect to="/OwnerDash" />;
    }

    return (
      <div className="col-9">
        {redirectVar}
        <div className="card sharpEdges shadow-lg">
          <div className="card-body">
            <h5 className="card-title">Review</h5>
            <hr />
            <address>
              <br />
              Address Line 1: {this.state.adl1} <br />
              Address Line 2: {this.state.adl2} <br />
              City: {this.state.city}
              <br />
              State: {this.state.state}
              <br />
              ZIP: {this.state.zip}
              <br />
              Country:
              {this.state.country}
              <br />
              <abbr title="Phone">P:</abbr> {this.state.phone}
            </address>
            <hr />
            <h4>{this.state.headline}</h4>
            <p>{this.state.description}</p>
            Bedrooms: {this.state.bedrooms}
            <br />
            Bathrooms: {this.state.bathrooms} <br />
            Accomodates: {this.state.accomdates}
            <br />
            <hr />
            <h4>Images</h4>
            {thumbnails}
            <br />
            <br />
            <hr />
            Currency: {this.state.currency}
            <br />
            Price per Night: {this.state.pricepernight}
            <br />
            Minimum Stay: {this.state.minimumstay}
            <br />
            <hr />
            <div className="row">
              <div className="col-2 offset-2">
                <button
                  type="button"
                  className="viewProfileButton roundcornerbutton somePaddingforButtons btn-lg btn btn-primary"
                  onClick={this.props.OnBackPressed}
                >
                  Back
                </button>
              </div>
              <div className="col-2 offset-4">
                <button
                  type="button"
                  className="viewProfileButton roundcornerbutton somePaddingforButtons btn-lg btn btn-primary"
                  onClick={this.submitProperty}
                >
                  Submit
                </button>
              </div>
            </div>
            <br />
            {errors}
          </div>
        </div>

        {modals}
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    );
  }
}

export default ReviewForm;
