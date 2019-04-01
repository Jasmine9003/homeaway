import React, { Component } from "react";

class AddressForm extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      adl1: this.props.adl1,
      adl2: this.props.adl2,
      city: this.props.city,
      state: this.props.state,
      zip: this.props.zip,
      country: this.props.country,
      phone: this.props.phone
    };

    this.addressLine1ChangeHandler = this.addressLine1ChangeHandler.bind(this);
    this.addressLine2ChangeHandler = this.addressLine2ChangeHandler.bind(this);
    this.cityChangeHandler = this.cityChangeHandler.bind(this);
    this.stateChangeHandler = this.stateChangeHandler.bind(this);
    this.zipChangeHandler = this.zipChangeHandler.bind(this);
    this.countryChangeHandler = this.countryChangeHandler.bind(this);
  }

  addressLine1ChangeHandler = e => {
    this.setState({
      adl1: e.target.value
    });
    this.props.onAddressLineOneChange(e.target.value);
  };

  addressLine2ChangeHandler = e => {
    this.setState({
      adl2: e.target.value
    });
    this.props.onAddressLineTwoChange(e.target.value);
  };

  cityChangeHandler = e => {
    this.setState({
      city: e.target.value
    });
    this.props.onCityChange(e.target.value);
  };

  stateChangeHandler = e => {
    this.setState({
      state: e.target.value
    });
    this.props.onStateChange(e.target.value);
  };

  zipChangeHandler = e => {
    let zipval = e.target.value;
    if (e.target.value > 10) {
      zipval = zipval.slice(0, 10);
    }
    this.setState({
      zip: zipval
    });
    this.props.onZipChange(zipval);
  };

  countryChangeHandler = e => {
    this.setState({
      country: e.target.value
    });
    this.props.onCountryChange(e.target.value);
  };

  phoneChangeHandler = e => {
    let pval = e.target.value;
    if (e.target.value > 10) {
      pval = pval.slice(0, 10);
    }
    this.setState({
      phone: pval
    });
    this.props.onPhoneChange(pval);
  };

  render() {
    return (
      <div className="col-9">
        <div className="card sharpEdges shadow-lg">
          <div className="card-body">
            <h5 className="card-title">Verify the Location</h5>
            <hr />
            <div className="card-text">
              <br />
              <br />
              <br />
              <br />
              <br />
              <div className="row">
                <div className="col-12  ">
                  <div className="form-group">
                    <label htmlFor="inputAddress">Address</label>
                    <input
                      type="text"
                      value={this.state.adl1}
                      onChange={this.addressLine1ChangeHandler}
                      className="form-control"
                      id="inputAddress"
                      placeholder="1234 Main St"
                      maxLength="40"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputAddress2">Address 2</label>
                    <input
                      type="text"
                      value={this.state.adl2}
                      onChange={this.addressLine2ChangeHandler}
                      className="form-control"
                      id="inputAddress2"
                      placeholder="Apartment, studio, or floor"
                      maxLength="20"
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="inputCity">City</label>
                      <input
                        type="text"
                        className="form-control"
                        value={this.state.city}
                        onChange={this.cityChangeHandler}
                        placeholder="San Jose"
                        id="inputCity"
                        maxLength="20"
                      />
                    </div>
                    <div className="form-group col-md-4">
                      <label htmlFor="inputState">State/Province</label>
                      <input
                        type="text"
                        value={this.state.state}
                        onChange={this.stateChangeHandler}
                        className="form-control"
                        id="inputState"
                        placeholder="California"
                        maxLength="20"
                      />
                    </div>
                    <div className="form-group col-md-2">
                      <label htmlFor="inputZip">Zip</label>
                      <input
                        type="number"
                        value={this.state.zip}
                        onChange={this.zipChangeHandler}
                        className="form-control"
                        id="inputZip"
                        maxLength="10"
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="inputCountry">Country</label>
                      <input
                        type="text"
                        className="form-control"
                        value={this.state.country}
                        onChange={this.countryChangeHandler}
                        placeholder="United States of America"
                        id="inputCountry"
                        maxLength="30"
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="inputCountry">Phone</label>
                      <input
                        className="form-control form-control-md"
                        type="number"
                        value={this.state.phone}
                        onChange={this.phoneChangeHandler}
                        placeholder="Phone Number"
                      />
                    </div>
                  </div>
                  <br />
                  <br />
                  <br />
                  <hr />
                </div>
              </div>
              <div className="row">
                <div className="col-2 offset-2" />
                <div className="col-2 offset-4">
                  <button
                    type="button"
                    className="viewProfileButton roundcornerbutton somePaddingforButtons btn-lg btn btn-primary"
                    onClick={this.props.OnNextPressed}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddressForm;
