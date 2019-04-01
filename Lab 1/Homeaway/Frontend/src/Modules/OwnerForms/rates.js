import React, { Component } from "react";
import "react-dates/initialize";

class RatesForm extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
        currency:this.props.currency,
        pricepernight:this.props.pricepernight,
        minimumstay:this.props.minimumstay
    };
  }

  currencyChangeHandler = e =>{
      this.setState({
          currency:e.target.value
      })
      this.props.onCurrencyChange(e.target.value);
  }

  pricepernightChangeHandler = e => {
    let ppn =e.target.value;
  if (e.target.value > 3) {
    ppn = ppn.slice(0, 3);
  }
  this.setState({
    pricepernight: ppn
  });
  this.props.onPricePerNightChange(ppn);
};

minstayChangeHandler = e => {
    let ms =e.target.value;
  if (e.target.value > 2) {
      ms = ms.slice(0, 2);
  }
  this.setState({
    minimumstay: ms
  });
  this.props.onMinimumStayChange(ms);
};

  render() {
    return (
      <div className="col-9">
        <div className="card sharpEdges shadow-lg">
          <div className="card-body">
            <h5 className="card-title">How much do you want to charge</h5>
            <hr />
            <div className="card-text">
              <br />

              <span>
                We recommend starting with a low price to get a few bookings and
                earn some initial guest reviews. You can update your rates at
                any time.
              </span>
              <br />
              <br />
              <br />
              <hr />
              <br />

              <div className="row">
                <div className="col-6  ">
                  <div className="form-group">
                    <label htmlFor="currency">Currency</label>

                    <select  value={this.state.currency}
                      onChange={this.currencyChangeHandler}
                      className="form-control" id="currency">
                      <option value="AUD">Australian Dollar (AUD)</option>
                      <option value="EUR">Euros (EUR)</option>
                      <option value="GBP">Great British Pound (GBP)</option>
                      <option value="USD">US Dollar (USD)</option>
                      <option value="CAD">Canadian Dollar (CAD)</option>
                      <option value="NZD">New Zealand Dollar (NZD)</option>
                      <option value="BRL">Brazil Real (BRL)</option>
                    </select>
                  </div>
                </div>
              </div>
              <br />

              <hr />
              <div className="row">
                <div className="col-6  ">
                  <div className="form-group">
                    <label >Nightly Base Rate</label>
                    <input
                      type="number"
                      value={this.state.pricepernight}
                      onChange={this.pricepernightChangeHandler}
                      className="form-control"
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-6  ">
                  <div className="form-group">
                    <label >Minimum Stay</label>
                    <input
                      type="number"
                      className="form-control"
                      value={this.state.minimumstay}
                      onChange={this.minstayChangeHandler}
                    />
                  </div>
                </div>
              </div>

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

export default RatesForm;
