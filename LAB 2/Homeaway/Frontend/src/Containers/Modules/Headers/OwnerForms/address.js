import React from "react";
import { Field, reduxForm } from "redux-form";
import validate from "./validation";
import {renderField} from "../../../../Components/renderField";
import { renderCountriesSelector } from "../../../../Components/renderSelector";

const AddressForm = props => {
  const { handleSubmit } = props;
  return (
    <div className="col-12">
      <div className="card sharpEdges shadow-lg">
        <div className="card-body">
          <h5 className="card-title">Verify the Location</h5>
          <hr />
          <div className="card-text">
            <form onSubmit={handleSubmit}>
              <br />
              <br />
              <div className="row">
                <div className="col-12  ">
                  <div className="form-group">
                    <Field
                      name="addressline1"
                      type="text"
                      component={renderField}
                      label="Address Line 1"
                    />
                  </div>
                  <div className="form-group">
                    <Field
                      name="addressline2"
                      type="text"
                      component={renderField}
                      label="Address Line 2"
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <Field
                        name="city"
                        type="text"
                        component={renderField}
                        label="City"
                      />
                    </div>
                    <div className="form-group col-md-4">
                      <Field
                        name="state"
                        type="text"
                        component={renderField}
                        label="State"
                      />
                    </div>
                    <div className="form-group col-md-2">
                      <Field
                        name="zip"
                        type="number"
                        component={renderField}
                        label="Zip / Pin Code"
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <Field
                        name="country"
                        label="Country"
                        component={renderCountriesSelector}
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <Field
                        name="phone"
                        type="number"
                        component={renderField}
                        label="Phone"
                      />
                    </div>
                  </div>
                  <br />
                  <hr />
                </div>
              </div>
              <div className="row">
                <div className="col-2 offset-2" />
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
    </div>
  );
};

export default reduxForm({
  form: "wizard",
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate
})(AddressForm);
