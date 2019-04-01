import React from "react";
import { Field, reduxForm } from "redux-form";
import validate from "./validation";
import { renderField, renderTextArea } from "../../../../Components/renderField";
import { renderHouseTypeSelector } from "../../../../Components/renderSelector";

const DescriptionForm = props => {
  const { handleSubmit, previousPage } = props;
  return (
    <div className="col-12">
      <div className="card sharpEdges shadow-lg">
        <div className="card-body">
          <h5 className="card-title">Describe your property</h5>
          <hr />
          <div className="card-text">
            <form onSubmit={handleSubmit}>
              <span>
                Start out with a descriptive headline and a detailed summary of
                your property.
              </span>
              <br />
              <br />
              <Field
                name="headline"
                type="text"
                component={renderField}
                label="Headline"
                maxLength="40"
              />

              <br />
              <div className="row">
                <div className="col-12  ">
                  <Field
                    name="description"
                    component={renderTextArea}
                    label="Description"
                    maxLength="500"
                    rows="6"
                  />
                  <br />
                </div>

                <div className="col-6">
                  <Field
                    name="placetype"
                    label="Place Type"
                    component={renderHouseTypeSelector}
                  />
                  <br />
                </div>
                <div className="col-6" />
                <div className="col-4">
                  <Field
                    name="bedrooms"
                    component={renderField}
                    label="Bedrooms"
                    maxLength="2"
                    type="number"
                  />
                  <br />
                </div>
                <div className="col-4">
                  <Field
                    name="accomodates"
                    component={renderField}
                    label="Accomodates"
                    maxLength="2"
                    type="number"
                  />
                  <br />
                </div>
                <div className="col-4">
                  <Field
                    name="bathrooms"
                    component={renderField}
                    maxLength="2"
                    label="Bathrooms"
                    type="number"
                  />
                  <br />
                </div>
                <br />
              </div>
              <hr />
              <div className="row">
                <div className="col-2 offset-2">
                  <button
                    type="button"
                    className="viewProfileButton roundcornerbutton somePaddingforButtons btn-lg btn btn-primary"
                    onClick={previousPage}>
                    Back
                  </button>
                </div>
                <div className="col-2 offset-4">
                  <button
                    type="submit"
                    className="viewProfileButton roundcornerbutton somePaddingforButtons btn-lg btn btn-primary">
                    Next
                  </button>
                </div>
              </div>
            </form>
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
};

export default reduxForm({
  form: "wizard",
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate
})(DescriptionForm);
