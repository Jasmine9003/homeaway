import React, { Component } from "react";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { renderFieldSharp } from "./renderField";
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
var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const email = value => (value && re.test(value) ?   undefined:"Invalid Email");

class SignUpForm extends Component {
  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-6">
            <div className="form-group ">
              <Field
                name="fname"
                type="text"
                component={renderFieldSharp}
                label="First Name"
                validate={[required, maxLength20, minLength2]}
              />
            </div>
          </div>
          <div className="col-6">
            <div className="form-group ">
              <Field
                name="lname"
                type="text"
                component={renderFieldSharp}
                label="Last Name"
                validate={[required, maxLength20, minLength2]}
              />
            </div>
          </div>
        </div>
        <div className="form-group ">
          <Field
            name="email"
            type="email"
            component={renderFieldSharp}
            label="Email"
            validate={[email,required]}
          />
        </div>
        <div className="form-group">
          <Field
            name="password"
            type="password"
            component={renderFieldSharp}
            label="Password"
            validate={[required]}
          />
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          className="btn btn-primary LoginButton">
          Sign Me Up
        </button>
        <br />
        <br />
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    searchProperty: state.SearchPropertyReducer
  };
}

SignUpForm = reduxForm({
  form: "signUpForm"
})(SignUpForm);

export default connect(mapStateToProps)(SignUpForm);
