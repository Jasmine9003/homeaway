import React, { Component } from "react";
import "react-dates/initialize";
import { DateRangePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { checkValidity } from "../../Actions/userActions";
import { createNewBooking } from "../../Actions/bookingActions";
import moment from "moment";

class PropertyBookingPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenNoDates: 0,
      cost: 0,
      startDate: null,
      endDate: null,
      error: false,
      errorMessage: "",
      message: "",
      subject: ""
    };
  }

  componentWillMount() {
    this.props.checkValidity();
  }

  messageChangeHandler = e => {
    this.setState({
      message: e.target.value
    });
  };

  subjectChangeHandler = e => {
    this.setState({
      subject: e.target.value
    });
  };


  bookProperty = () => {
    if (this.state.startDate === null || this.state.endDate === null) {
      this.setState({
        error: true,
        errorMessage: "Dates not chosen"
      });
    } else {
      if (!this.hasForBlockedDates(this.state.startDate, this.state.endDate)) {
        let bookingData = {
          bookingfrom: this.state.startDate,
          bookingto: this.state.endDate,
          travelleremail: localStorage.getItem("username"),
          propertyowneremail: this.props.propertyDisplay.property.email,
          propertyid: this.props.propertyDisplay.property._id,
          nights: this.state.chosenNoDates,
          cost: this.state.cost,
          city:this.props.propertyDisplay.property.city,
          currency:this.props.propertyDisplay.property.currency,
          propertyname:this.props.propertyDisplay.property.headline
        };
        this.props.createNewBooking(bookingData).then(() => {
          if(!this.props.bookingState.error){
          console.log("Booking Added Successfully", this.props.bookingState);
          alert("Booking Added Successfully!");
          this.props.history.push({
            pathname: "/TravelDash"
          });
        }else{

        }
        });

        console.log(bookingData);
      } else {
        this.setState({
          error: true,
          errorMessage: "Dates Chosen Contains Blocked Dates"
        });
      }
    }
  };

  datesChageHandler = ({ startDate, endDate }) => {
    let cost = 0;
    let n = 0;
    if (endDate) {
      n = endDate.diff(startDate, "days");
      cost = n * this.props.propertyDisplay.property.baserent;
    }
    this.setState({
      startDate,
      endDate,
      chosenNoDates: n,
      cost: cost
    });
  };

  getDates = function(startDate, endDate) {
    var dates = [],
      currentDate = startDate,
      addDays = function(days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
      };
    while (currentDate <= endDate) {
      dates.push(currentDate);
      currentDate = addDays.call(currentDate, 1);
    }
    return dates;
  };

  findIntersections(a, b) {
    let temp;
    if (b.length > a.length) {
      temp = b;
      b = a;
      a = temp;
    }
    return a.filter(function(e) {
      return b.indexOf(e) > -1;
    });
  }

  hasForBlockedDates(startDate, endDate) {
    const dateFormat = "YYYY-MM-DD";
    let blockedDates = [];
    let selectedDates = [];
    if (this.props.propertyDisplay.property) {
      if (this.props.propertyDisplay.property.bookings) {
        this.props.propertyDisplay.property.bookings.forEach(booking => {
          let dates = this.getDates(
            new Date(booking.bookingfrom),
            new Date(booking.bookingto)
          );
          dates.forEach(date => {
            blockedDates.push(moment(date).format(dateFormat));
          });
        });
      }
    }
    let rdates = this.getDates(new Date(startDate), new Date(endDate));
    rdates.forEach(date => {
      selectedDates.push(moment(date).format(dateFormat));
    });
    let intersection = this.findIntersections(selectedDates, blockedDates);
    console.log("Intersection", intersection);
    if (intersection.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    if (this.props.isValidTokenState !== undefined) {
      if (!this.props.isValidTokenState) {
        this.props.history.push({
          pathname: "/Login"
        });
      }
    }

    let blockedDates = [];
    if (this.props.propertyDisplay.property) {
      if (this.props.propertyDisplay.property.bookings) {
        this.props.propertyDisplay.property.bookings.forEach(booking => {
          let dates = this.getDates(
            new Date(booking.bookingfrom),
            new Date(booking.bookingto)
          );
          dates.forEach(date => {
            blockedDates.push(moment(date));
          });
        });
      }
    }
    const isDayBlocked = day =>
      blockedDates.filter(d => d.isSame(day, "day")).length > 0;

    return this.props.propertyDisplay.property ? (
      <div>
        <br />
        <br />

        <div className="card shadow-lg">
          <div className="card-body">
            <h5 className="card-title">Booking Property</h5>
            <small>Tell us when you want to rent this property</small>
            <br />
            {this.state.error ? (
              <small className="text-danger">{this.state.errorMessage}</small>
            ) : null}
            <DateRangePicker
              startDate={this.state.startDate}
              endDate={this.state.endDate}
              minimumNights={this.props.propertyDisplay.property.minimumstay}
              //isOutsideRange={isOutsideRange}
              isDayBlocked={isDayBlocked}
              startDateId="bookingFrom"
              endDateId="bookingTo"
              onDatesChange={this.datesChageHandler}
              focusedInput={this.state.focusedInput}
              onFocusChange={focusedInput => this.setState({ focusedInput })}
            />
            <div>
              <small>
                {this.props.propertyDisplay.property.baserent}
                {this.props.propertyDisplay.property.currency}
                /Night
                <br />
                Minimum Stay : {
                  this.props.propertyDisplay.property.minimumstay
                }{" "}
                Nights
              </small>
              <br />
              <br />
              <small>
                You have chosen {this.state.chosenNoDates} nights, your cost is
              </small>
              <h1>
                {this.state.cost}
                {this.props.propertyDisplay.property.currency}
              </h1>
            </div>
            <br />
            <br />
            <a
              onClick={this.bookProperty}
              className="btn btn-primary btn-block text-white">
              Confirm Booking
            </a>
            <br />
            <br />

          </div>
        </div>

        <div
          className="modal fade bd-example-modal-lg"
          id="MessageModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="myLargeModalLabel"
          aria-hidden="true">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <br />
              <br />
              <br />
              <div className="container" style={{ padding: "5%" }}>
                <form>
                  <div className="form-group">
                    <label htmlFor="Subject">Subject</label>
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.subject}
                      onChange={this.subjectChangeHandler}
                      placeholder="Enter Subject"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea
                      className="form-control"
                      rows="8"
                      value={this.state.message}
                      onChange={this.messageChangeHandler}
                      placeholder="Type What you want to ask the Owner"
                    />
                  </div>

                  <button
                    type="button"
                    data-dismiss="modal"
                    onClick={this.sendMessage}
                    className="btn btn-primary">
                    Send
                  </button>
                </form>
                <br />
                <br />
                <br />
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : null;
  }
}

function mapStateToProps(state) {
  return {
    propertyDisplay: state.PropertyDisplay,
    isValidTokenState: state.TokenReducer.validity,
    bookingState: state.BookingReducer
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    { checkValidity, createNewBooking }
  )(PropertyBookingPanel)
);
