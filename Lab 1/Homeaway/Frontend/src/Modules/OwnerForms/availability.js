import React, { Component } from "react";
import "react-dates/initialize";
import { DateRangePicker } from "react-dates";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

class AvailabilityForm extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      startDate: this.props.startDate,
      endDate: this.props.endDate,
      s:this.props.startDate,
      n:this.props.endDate
      
    };
  }

  datesChageHandler = ({ startDate, endDate }) => {
    this.setState({ startDate, endDate });
    this.props.WhenDateChanged({ startDate, endDate });
  };

  render() {
    return (
      <div className="col-9">
        <div className="card sharpEdges shadow-lg">
          <div className="card-body">
            <h5 className="card-title">Availability</h5>
            <hr />
            <div className="card-text text-center">
              <br />
              <br />
              <br />
              <DateRangePicker
                startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                onDatesChange={this.datesChageHandler} // PropTypes.func.isRequired,
                focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
              />
              <br />
              <br />
              <br />
              <br />
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

export default AvailabilityForm;
