

import React from "react";
import { Field, reduxForm } from "redux-form";
import validate from "./validation";
import { renderField } from "../../../../Components/renderField";
import { renderCurrenySelector } from "../../../../Components/renderSelector";

const RatesForm = props => {

  const { handleSubmit, previousPage } = props;
  return (
    <div className="col-12">
      <div className="card sharpEdges shadow-lg">
        <div className="card-body">
          <h5 className="card-title">How much do you want to charge</h5>
          <hr />
          <div className="card-text">
          <form onSubmit={handleSubmit}>
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
                  <Field
                    name="currency"
                    label="Currency"
                    component={renderCurrenySelector}
                  />
                  </div>
                </div>
              </div>
              <br />
              <hr />
              <div className="row">
                <div className="col-6  ">
                  <div className="form-group">
                  <Field
                      name="nightlybaserent"
                      type="number"
                      component={renderField}
                      label="Nightly Base Rent"
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-6  ">
                  <div className="form-group">
                  <Field
                      name="minimumstay"
                      type="number"
                      component={renderField}
                      label="Minimum Stay"
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
                    onClick={previousPage}>
                    Back
                  </button>
                </div>
                <div className="col-2 offset-4">
                  <button
                    type="submit"
                    className="viewProfileButton roundcornerbutton somePaddingforButtons btn-lg btn btn-primary">
                    Submit
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
  validate,
})(RatesForm)
