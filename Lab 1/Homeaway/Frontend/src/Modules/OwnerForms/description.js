import React, { Component } from "react";


class DescriptionForm extends Component {
  constructor(props, context) {
    super(props, context);
    let l = this.props.description.length;
    this.state = {
      headline: this.props.headline,
      description: this.props.description,
      placetype: this.props.placetype,
      bedrooms: this.props.bedrooms,
      bathrooms: this.props.bathrooms,
      cahrsleft: 200-l,
      accomdates: this.props.accomdates
    };
  
    this.headlineChangeHandler = this.headlineChangeHandler.bind(this);
    this.descriptionChangeHandler = this.descriptionChangeHandler.bind(this);
    this.placetypeChangeHandler = this.placetypeChangeHandler.bind(this);
    this.bedroomChangeHandler = this.bedroomChangeHandler.bind(this);
    this.bathroomChangeHandler = this.bathroomChangeHandler.bind(this);
    this.accomdatesChangeHandler = this.accomdatesChangeHandler.bind(this);
  }

  

  headlineChangeHandler = e => {
    this.setState({
      headline: e.target.value
    });
    this.props.onHeadlineChange(e.target.value);
  };

  descriptionChangeHandler = e => {
    let l = e.target.value.length;
    let leftl = 200 - l;
    this.setState({
      description: e.target.value,
      cahrsleft: leftl
    });
    this.props.onDescriptionChange(e.target.value);
  };

  placetypeChangeHandler = e => {
    this.setState({
      placetype: e.target.value
    });
    this.props.onPlaceTypeChange(e.target.value);
  };

  bedroomChangeHandler = e => {
    let bedroomVal = e.target.value;
    if (e.target.value > 2) {
      bedroomVal = bedroomVal.slice(0, 2);
    }
    this.setState({
      bedrooms: bedroomVal
    });
    this.props.onBedroomChange(e.target.value);
  };

  bathroomChangeHandler = e => {
    let bathroomVal = e.target.value;
    if (e.target.value > 2) {
      bathroomVal = bathroomVal.slice(0, 2);
    }
    this.setState({
      bathrooms: bathroomVal
    });
    this.props.onBathroomChange(e.target.value);

  };

  accomdatesChangeHandler = e => {
    let accomodatesVal = e.target.value;
    if (e.target.value > 2) {
        accomodatesVal = accomodatesVal.slice(0, 2);
    }
    this.setState({
      accomdates: accomodatesVal
    });
    this.props.onAccomodatesChange(e.target.value);

  };

  render() {
    return (
      <div className="col-9">
        <div className="card sharpEdges shadow-lg">
          <div className="card-body">
            <h5 className="card-title">Describe your property</h5>
            <hr />
            <div className="card-text">
              <span>
                Start out with a descriptive headline and a detailed summary of
                your property.
              </span>
              <br />
              <br />
              <input
                className="form-control form-control-md"
                type="text"
                value={this.state.headline}
                onChange={this.headlineChangeHandler}
                placeholder="Headline"
                maxLength="40"
              />
              <br />
              <br />
              <div className="row">
                <div className="col-12  ">
                  <textarea
                    className="form-control form-control-md"
                    rows="6"
                    value={this.state.description}
                    onChange={this.descriptionChangeHandler}
                    placeholder="Description"
                    maxLength="200"
                  />
                  <small className="text-danger">
                    {this.state.cahrsleft}
                    /200 characters left
                  </small>
                  <br />
                  <br />
                  <div className="col-6">
                    <select
                      value={this.state.placetype}
                      onChange={this.placetypeChangeHandler}
                      className="form-control form-control-md"
                    >
                      <option value="apartment">Apartment</option>
                      <option value="barn">Barn</option>
                      <option value="bed &amp; breakfast">
                        Bed &amp; Breakfast
                      </option>
                      <option value="boat">Boat</option>
                      <option value="bungalow">Bungalow</option>
                      <option value="cabin">Cabin</option>
                      <option value="campground">Campground</option>
                      <option value="castle">Castle</option>
                      <option value="chalet">Chalet</option>
                      <option value="country house / chateau">
                        Chateau / Country House
                      </option>
                      <option value="condo">Condo</option>
                      <option value="corporate apartment">
                        Corporate Apartment
                      </option>
                      <option value="cottage">Cottage</option>
                      <option value="estate">Estate</option>
                      <option value="farmhouse">Farmhouse</option>
                      <option value="guest house/pension">Guest House</option>
                      <option value="hostel">Hostel</option>
                      <option value="hotel">Hotel</option>
                      <option value="hotel suites">Hotel Suites</option>
                      <option value="house">House</option>
                      <option value="house boat">House Boat</option>
                      <option value="lodge">Lodge</option>
                      <option value="Mill">Mill</option>
                      <option value="mobile home">Mobile Home</option>
                      <option value="Recreational Vehicle">
                        Recreational Vehicle
                      </option>
                      <option value="resort">Resort</option>
                      <option value="studio">Studio</option>
                      <option value="Tower">Tower</option>
                      <option value="townhome">Townhome</option>
                      <option value="villa">Villa</option>
                      <option value="yacht">Yacht</option>
                    </select>
                    <br />
                  </div>
                  <div className="col-6">
                    <label htmlFor="bedrooms">Bedrooms</label>
                    <input
                      className="form-control form-control-md"
                      type="text"
                      id="bedrooms"
                      value={this.state.bedrooms}
                      onChange={this.bedroomChangeHandler}
                      placeholder="Bedrooms"
                    />
                    <br />
                  </div>
                  <div className="col-6">
                    <label htmlFor="accomodates">Accomodates</label>
                    <input
                      className="form-control form-control-md"
                      type="text"
                      value={this.state.accomdates}
                      onChange={this.accomdatesChangeHandler}
                      id="accomodates"
                      placeholder="Accomodates"
                    />
                    <br />
                  </div>
                  <div className="col-6">
                    <label htmlFor="bathrooms">Bathrooms</label>
                    <input
                      className="form-control form-control-md"
                      type="text"
                      value={this.state.bathrooms}
                      onChange={this.bathroomChangeHandler}
                      id="bathrooms"
                      placeholder="Bathrooms"
                    />
                    <br />
                  </div>
                  <br />
                  <br />
                  <br />
                  <hr />
                </div>
              </div>
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
                    onClick={this.props.OnNextPressed}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
        <br /> <br />
        <br />
        <br />
      </div>
    );
  }
}

export default DescriptionForm;
