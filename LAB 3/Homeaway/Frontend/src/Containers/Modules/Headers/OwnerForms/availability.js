import React from "react";
import { Field, reduxForm } from "redux-form";
import validate from "./validation";
import "react-datepicker/dist/react-datepicker.css";
import { DateRangePickerField } from "../../../../Components/DateRangePickerWrapper";


const required = value =>
  value || typeof value === "number" ? undefined : "Required";
const startGtEnd = value => {
  if (value !== undefined) {
    if (value.startDate !== null && value.endDate !== null) {
      return undefined;
    } else {
      return "Both Required";
    }
  }
};


const AvailabilityForm = props => {
  const { nextPage, previousPage } = props;
  return (
    <div className="col-12">
      <div className="card sharpEdges shadow-lg">
        <div className="card-body">
          <h5 className="card-title">Availability</h5>
          <hr />
          <div className="card-text">
            <form>
              <span>Tell us when your property is available.</span>
              <br />
              <br />
              <Field
              component={DateRangePickerField}
              name="when"
              validate={[startGtEnd, required]}
            />
              <br />

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
                    type="button"
                    className="viewProfileButton roundcornerbutton somePaddingforButtons btn-lg btn btn-primary"
                    onClick={nextPage}>
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
})(AvailabilityForm);
