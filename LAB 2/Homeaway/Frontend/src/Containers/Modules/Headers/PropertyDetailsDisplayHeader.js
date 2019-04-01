import React, { Component } from "react";
import "react-dates/initialize";
import { Carousel } from "react-bootstrap";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { withRouter } from "react-router-dom";
import { getProperty } from "../../../Actions/propertyActions";
import { checkValidity } from "../../../Actions/userActions";

import { connect } from "react-redux";
import { v4 } from "node-uuid";

class PropertyDetailsDisplayHeader extends Component {

  componentWillMount(){
    this.props.getProperty(this.props.pid);
      this.props.checkValidity();
    
  }
  render() {



    let imagesarray=null;
    if(this.props.propertyDisplay.property){
     imagesarray = this.props.propertyDisplay.property.photos.map(image => {
      let ImageUrl = "./uploads/" + this.props.propertyDisplay.property.email + "/" + image;
      return (
          <Carousel.Item key={v4()}>
            <img width={900} height={500} alt="900x500" src={ImageUrl} />
          </Carousel.Item>
        );  
   });
  }

    return (

      this.props.propertyDisplay.property ?  <div>
        <br />
        <br />


        <div className="card shadow-lg">
          <div className="card-header no-gutter">
            <Carousel>{imagesarray}</Carousel>
          </div>
          <div className="card-body">
            <h3>{this.props.propertyDisplay.property.headline}</h3>
            <h5>
              {this.props.propertyDisplay.property.addressline1}
              <br />
              {this.props.propertyDisplay.property.addressline2}
              <br />
              {this.props.propertyDisplay.property.city}
              <br />
              {this.props.propertyDisplay.property.state},{this.props.propertyDisplay.property.country} <br />
            </h5>
            Phone: {this.props.propertyDisplay.property.phone}
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
                <h3>{this.props.propertyDisplay.property.accomodates}</h3>
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
                <h3>{this.props.propertyDisplay.property.bedrooms}</h3>
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
                <h3>{this.props.propertyDisplay.property.bathrooms}</h3>
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
                <h3>{this.props.propertyDisplay.property.minimumstay}</h3>
              </div>
            </div>
            <hr />
            <br />
            <div className="row">
              <div className="col-12">
                <h3>Description</h3>
                {this.props.propertyDisplay.property.description}
                <br />
                <br />
                <br />
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
        <br /> <br />
        <br />
        <br />
      </div> : null
     
    );
  }
}

function mapStateToProps(state) {
  return {
    propertyDisplay: state.PropertyDisplay,
    isValidTokenState: state.TokenReducer.validity
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    { getProperty,checkValidity }
  )(PropertyDetailsDisplayHeader)
);
