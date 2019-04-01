import LoginNav from "../Modules/Navbar/LoginNav";
import React, { Component } from "react";
import AddressForm from "../Modules/Headers/OwnerForms/address";
import DescriptionForm from "../Modules/Headers/OwnerForms/description";
import ImagesForm from "../Modules/Headers/OwnerForms/images";
import AvailabilityForm from "../Modules/Headers/OwnerForms/availability";
import RatesForm from "../Modules/Headers/OwnerForms/rates";
import { createNewProperty } from "../../Actions/propertyActions";
import { checkValidity } from "../../Actions/userActions";

import { connect } from "react-redux";
import { withRouter } from "react-router";

class OwnerAddPropertyPage extends Component {
  constructor(props) {
    super(props);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      page: 1
    };
  }

  componentWillMount(){
    this.props.checkValidity();
  }

  nextPage() {
    this.setState({ page: this.state.page + 1 });
  }
  previousPage() {
    this.setState({ page: this.state.page - 1 });
  }
  onSubmit(values) {
    if (
      window.confirm(
        "Are you sure all the information provided is correct? Hit OK to continue"
      )
    ) {
      this.props.createNewProperty(values);
    }
  }

  render() {

    if (this.props.isValidTokenState !== undefined) {
      if (!this.props.isValidTokenState) {
        this.props.history.push({
          pathname: "/OwnerLogin"
        });
      }
    }


    if (this.props.propertyState.propertyadded) {
      alert("Property added sucessfully!");
      this.props.history.push("/OwnerDash");
    }
    const { page } = this.state;
    return (
      <div>
        <LoginNav />
        <br />
        <br />
        <br />
        <div className="container">
          <div className="row">
            <div className="col-3">
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <ul className="OwnerBulletless">
                <li>
                  <span className="oi oi-circle-check bulletIncreaseSize " />
                  {this.state.page === 1 ? (
                    <span className=" text-primary font-weight-bold btn">
                      Location
                    </span>
                  ) : (
                    <span className="btn">Location</span>
                  )}
                </li>
                <li>
                  <span className="oi oi-circle-check bulletIncreaseSize " />
                  {this.state.page === 2 ? (
                    <span className=" text-primary font-weight-bold btn">
                      Details
                    </span>
                  ) : (
                    <span className="btn">Details</span>
                  )}
                </li>
                <li>
                  <span className="oi oi-circle-check bulletIncreaseSize " />
                  {this.state.page === 3 ? (
                    <span className=" text-primary font-weight-bold btn">
                      Photos
                    </span>
                  ) : (
                    <span className="btn">Photos</span>
                  )}
                </li>
                <li>
                  <span className="oi oi-circle-check bulletIncreaseSize " />
                  {this.state.page === 4 ? (
                    <span className=" text-primary font-weight-bold btn">
                      Availability
                    </span>
                  ) : (
                    <span className="btn">Availability</span>
                  )}
                </li>
                <li>
                  <span className="oi oi-circle-check bulletIncreaseSize " />
                  {this.state.page === 5 ? (
                    <span className=" text-primary font-weight-bold btn">
                      Pricing
                    </span>
                  ) : (
                    <span className="btn">Pricing</span>
                  )}
                </li>
              </ul>
            </div>
            <div className="col-9">
              <br />
              <br />
              <br />
              <div>
                {page === 1 && (
                  <AddressForm
                    previousPage={this.previousPage}
                    onSubmit={this.nextPage}
                  />
                )}
                {page === 2 && (
                  <DescriptionForm
                    previousPage={this.previousPage}
                    onSubmit={this.nextPage}
                  />
                )}
                {page === 3 && (
                  <ImagesForm
                    previousPage={this.previousPage}
                    nextPage={this.nextPage}
                  />
                )}
                {page === 4 && (
                  <AvailabilityForm
                    previousPage={this.previousPage}
                    nextPage={this.nextPage}
                  />
                )}
                {page === 5 && (
                  <RatesForm
                    previousPage={this.previousPage}
                    onSubmit={this.onSubmit}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    propertyState: state.AddPropertyReducer,
    isValidTokenState: state.TokenReducer.validity

  };
}

export default withRouter(
  connect(
    mapStateToProps,
    { createNewProperty, checkValidity }
  )(OwnerAddPropertyPage)
);
