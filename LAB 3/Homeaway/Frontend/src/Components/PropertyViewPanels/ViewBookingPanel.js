import React, { Component } from "react";
import "react-dates/initialize";
import moment from "moment";
import { DateRangePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getBooking } from "../../Actions/bookingActions";

class PropertyBookedPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goTravelDash:false
    };
  }
  componentWillMount() {
    this.props.getBooking(this.props.location.state.bid).then(() => {
      console.log(this.props.currentBooking.booking);
    });
  }


  render() {
    // let redirectVar = null;
    if (this.state.goTravelDash) {
      this.props.history.push({
        pathname: "/TravelDash"
      });
    }



    return this.props.currentBooking.booking ? (
      <div>
        <br />
        <br />

        <div className="card shadow-lg">
          <div className="card-body">
            <h5 className="card-title"> Property Bookings </h5>
            <small>Booking</small>
            <DateRangePicker
              startDate={moment(
                new Date(this.props.currentBooking.booking.bookingfrom)
              )}
              endDate={moment(
                new Date(this.props.currentBooking.booking.bookingto)
              )}
              readOnly={true}
              startDateId="your_unique_start_date_id"
              endDateId="your_unique_end_date_id"
              onDatesChange={({ startDate, endDate }) => console.log()}
              onFocusChange={focusedInput => console.log()}
            />
            <br />
            <br />

            <h1>
              {this.props.currentBooking.booking.cost}
              {this.props.currentBooking.booking.currency}
            </h1>

            <br />
  
     
            <a
              onClick={()=>this.setState({
                goTravelDash:true
              })}
              className="btn btn-primary text-white">
              See Other Bookings
            </a>
          </div>
        </div>
      </div>
    ) : null;
  }
}

function mapStateToProps(state) {
  return {
    currentBooking: state.CurrentBookingReducer,
    tokenState: state.TokenReducer
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    { getBooking }
  )(PropertyBookedPanel)
);
