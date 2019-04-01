import React, { Component } from "react";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { renderFieldLarge } from "./renderField";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { DateRangePickerField } from "./DateRangePickerWrapper";


const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;
const maxLength20 = maxLength(20);
const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined;
const minLength2 = minLength(2);

const alphabets = value =>
  value && /[^a-zA-Z ]/i.test(value) ? "Only alphabet characters" : undefined;
const startGtEnd = value => {
  if (value !== undefined) {
    if (value.startDate !== null && value.endDate !== null) {
      return undefined;
    } else {
      return "Both Required";
    }
  }
};

class BookingFilterForm extends Component {
  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div className="card-body ">
          <div className="row">
         
            <div className="col-6 text-left">
              <small>Property</small>

              <Field
                name="property"
                type="text"
                component={renderFieldLarge}
                label="Search"
                validate={[maxLength20,minLength2]}
                warn={[alphabets]}
              />
                            <small>Search by City or Property Name</small>

            </div>
            <div className="col-6 text-left">
              <small>Date Range</small>

       <Field
                component={DateRangePickerField}
                name="when"
                validate={[startGtEnd]}
              />
            </div>
        

            <div className="col-4 text-left">
              <br />
              <button
                type="button"
                onClick={handleSubmit}
                className=" roundcornerbutton btn btn-primary btn-lg ">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Search&nbsp;&nbsp;&nbsp;&nbsp;
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

BookingFilterForm = reduxForm({
  form: "bookingFilterForm"
})(BookingFilterForm);

export default connect(state => ({}))(BookingFilterForm);
