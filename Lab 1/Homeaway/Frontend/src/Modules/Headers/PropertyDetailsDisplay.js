import React, { Component } from "react";
import "react-dates/initialize";
import { Carousel } from "react-bootstrap";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import cookie from "react-cookies";

class PropertyView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      adl1: props.adl1,
      adl2: props.adl2,
      city: props.city,
      state: props.state,
      zip: props.zip,
      country: props.country,
      phone: props.phone,
      headline: props.headline,
      description: props.description,
      placetype: props.placetype,
      bedrooms: props.bedrooms,
      bathrooms: props.bathrooms,
      accomdates: props.accomdates,
      images: props.images,
      minimumstay: props.minimumstay
    };
  }


  
  render() {
    let email = this.props.email;
    var images = this.props.images.split(",");
    let imagesarray = images.map(image => {
    let ImageUrl = "./uploads/" + email + "/" + image;
    images = images.filter(Boolean);

    return (
        <Carousel.Item key={image}>
          <img width={900} height={500} alt="900x500" src={ImageUrl} />
        </Carousel.Item>
      );  
 });
  

    return (
      <div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <div className="card shadow-lg">
          <div className="card-header">
            <Carousel >{imagesarray}</Carousel>
          </div>
          <div className="card-body">
            <h3>{this.props.headline}</h3>
            <h5>
              {this.props.adl1}
              <br />
              {this.props.adl2}
              <br />
              {this.props.city}
              <br />
              {this.props.state},{this.props.country} <br />
            </h5>
            Phone: {this.props.phone}
            <br />
            <br />
            <hr />
            <div className="row ">
              <div className="col-2 ">
                <img
                  src={"./img/sleeps.png"}
                  className="img-fluid fillgrey"
                  alt=""
                />
                <br />
                Sleeps
                <br />
                <h3>{this.props.accomdates}</h3>
              </div>
              <div className="col-2 ">
                <img
                  src={"./img/beds.png"}
                  className="img-fluid fillgrey"
                  alt=""
                />
                <br />
                Beds
                <br />
                <h3>{this.props.bedrooms}</h3>
              </div>
              <div className="col-2 ">
                <img
                  src={"./img/showers.png"}
                  className="img-fluid fillgrey "
                  alt=""
                />
                <br />
                Bathrooms
                <br />
                <h3>{this.props.bathrooms}</h3>
              </div>
              <div className="col-2 ">
                <img
                  src={"./img/nights.png"}
                  className="img-fluid fillgrey"
                  alt=""
                />
                <br />
                Nights
                <br />
                <h3>{this.props.minimumstay}</h3>
              </div>
            </div>
            <hr />
            <br />
            <div className="row">
              <div className="col-6">
                <h3>Description</h3>
                {this.props.description}
                <br />
                <br />
                <br />
              </div>
            </div>
          </div>
        </div>
        <br />
                <br />
                <br />            <br />
                <br />
                <br />
      </div>
      
    );
  }
}

export default PropertyView;
