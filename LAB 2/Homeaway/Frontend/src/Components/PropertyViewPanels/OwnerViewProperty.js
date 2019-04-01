import React, { Component } from "react";
import "react-dates/initialize";
import moment from "moment";
import { DateRangePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

class OwnerPropertyPanel extends Component {
  render() {
    return this.props.propertyDisplay.property ? (
      <div>
        <br />
        <br />

    
        <div className="card">
          <div className="card-body shadow-lg">
            <h5 className="card-title">Booked Property</h5>
            <small>Dates This Property is available for</small>
            <DateRangePicker
              startDate={moment(
                new Date(this.props.propertyDisplay.property.availablefrom)
              )}
              endDate={moment(
                new Date(this.props.propertyDisplay.property.availableto)
              )}
              readOnly={true}
            />
            <br />
            <br />
            <a
              href="/OwnerDash"
              className="btn btn-primary btn-block text-white">
              See Other Properties
            </a>
          </div>
        </div>
      </div>
    ) : null;
  }
}

function mapStateToProps(state) {
  return {
    propertyDisplay: state.PropertyDisplay,
    tokenState: state.TokenReducer
  };
}

export default withRouter(
  connect(
    mapStateToProps
  )(OwnerPropertyPanel)
);
