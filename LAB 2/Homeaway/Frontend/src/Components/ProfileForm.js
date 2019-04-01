import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { renderFieldMediumForProfile ,renderTextAreaForProfile} from "./renderField";
import { renderGenderSelector } from "./renderSelector";


const required = value =>
  value || typeof value === "number" ? undefined : "Required";
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;
const maxLength20 = maxLength(20);
const maxLength200 = maxLength(200);
const maxLength50 = maxLength(50);

const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined;
const minLength2 = minLength(2);
const minLength50 = minLength(50);

class ProfileForm extends Component {


  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-6">
              <Field
                name="fname"
                component={renderFieldMediumForProfile}
                type="text"
                placeholder="First Name"
                validate={[required,maxLength20,minLength2]}
              />
              <br />
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <Field
                name="lname"
                component={renderFieldMediumForProfile}
                type="text"
                placeholder="Last Name"
                validate={[required,maxLength20,minLength2]}

              />
              <br />
            </div>
          </div>
          <div className="row">
            <div className="col-12  ">
              <Field
                name="aboutme"
                component={renderTextAreaForProfile}
                type="text"
                placeholder="About Me"
                validate={[maxLength200,minLength50]}

              />

              <br />
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <Field
                name="city"
                component={renderFieldMediumForProfile}
                type="text"
                placeholder="City, Country"
                validate={[maxLength50,minLength2]}

              />

              <br />
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <Field
                name="school"
                component={renderFieldMediumForProfile}
                type="text"
                placeholder="School"
                validate={[maxLength50,minLength2]}

              />

              <br />
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <Field
                name="hometown"
                component={renderFieldMediumForProfile}
                type="text"
                placeholder="Hometown"
                validate={[maxLength50,minLength2]}

              />

              <br />
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <Field
                name="languages"
                component={renderFieldMediumForProfile}
                type="text"
                placeholder="Languages"
                validate={[maxLength50,minLength2]}

              />
              <br />
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <Field
                name="gender"
                label="Gender"
                component={renderGenderSelector}
              />
              <br />
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <Field
                name="phone"
                component={renderFieldMediumForProfile}
                type="number"
                placeholder="Phone"
                validate={[maxLength50,minLength2]}

              />
              <br />
            </div>
          </div>
        </form>

        <button
          type="button"
          onClick={handleSubmit}

          className="roundcornerbutton btn btn-primary btn-lg">
          Save Changes
        </button>
      </div>
    );
  }
}


ProfileForm = reduxForm({
  form: "profileForm",
  enableReinitialize:true,
  keepDirtyOnReinitialize:true
})(ProfileForm);

export default connect(  
    state => ({
        initialValues: state.ProfileReducer.profile, // pull initial values from account reducer
      })
)(ProfileForm);
