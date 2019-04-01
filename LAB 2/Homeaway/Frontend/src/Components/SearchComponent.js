import React, { Component } from "react";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { renderFieldLarge } from "./renderField";
import { DateRangePickerField } from "./DateRangePickerWrapper";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";

//Validations
const required = value =>
  value || typeof value === "number" ? undefined : "Required";
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;
const maxLength20 = maxLength(20);
const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined;
const minLength2 = minLength(2);
const number = value =>
  value && isNaN(Number(value)) ? "Must be a number" : undefined;
const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined;
const maxValue = max => value =>
  value && value > max ? `Cannot Exceed ${max}` : undefined;
const maxValue20 = maxValue(20);
const minValue1 = minValue(1);
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

class SearchPropertyForm extends Component {
  render() {
    const { handleSubmit, color } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div className="card-body ">
          <div className="row">
            <div
              className={
                color === "white"
                  ? "col-4 text-left text-white"
                  : "col-4 text-left  "
              }>
              <small>Where do you want to go?</small>
              <Field
                name="where"
                type="text"
                component={renderFieldLarge}
                label="Where?"
                validate={[required, maxLength20, minLength2, alphabets]}
                warn={alphabets}
              />
            </div>
            <div
              className={
                color === "white"
                  ? "col-4 text-left text-white"
                  : "col-4 text-left  "
              }>
              <small>When?</small>

              <Field
                component={DateRangePickerField}
                name="when"
                validate={[startGtEnd, required]}
              />
            </div>
            <div
              className={
                color === "white"
                  ? "col-2 text-left text-white"
                  : "col-2 text-left  "
              }>
              <small>No. of People</small>

              <Field
                name="people"
                type="number"
                component={renderFieldLarge}
                label="People"
                validate={[required, number, minValue1, maxValue20]}
              />
            </div>
            <div
              className={
                color === "white"
                  ? "col-2 text-left text-white"
                  : "col-2 text-left  "
              }>
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

SearchPropertyForm = reduxForm({
  form: "searchPropertyForm"
})(SearchPropertyForm);

export default connect(state => ({}))(SearchPropertyForm);
