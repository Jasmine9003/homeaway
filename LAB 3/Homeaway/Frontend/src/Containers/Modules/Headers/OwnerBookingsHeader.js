import React, { Component } from "react";
import "react-dates/initialize";
import { withRouter, Link } from "react-router-dom";
import { getOwnerBookings } from "../../../Actions/bookingActions";
import { checkValidity } from "../../../Actions/userActions";
import Paginations from "../../../Components/Pagination";
import { connect } from "react-redux";
import moment from "moment";
import BookingFilterComponent from "../../../Components/BookingFilterComponent";
class OwnerBookingsHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      properties: [],
      filteredProperties: [],
      currentProperties: [],
      currentPage: null,
      totalPages: null,
      propertyClicked: false,
      propertypid: "",
      propertybid: 0,
      bookingFrom: null,
      bookingTo: null,
      showFilter: false,
      filterText: "Show Filter"
    };
    this.onFilterClicked = this.onFilterClicked.bind(this);
  }

  onFilterClicked(values) {
    let search = "";
    let startDate = moment(Date.now());
    let endDate = moment(Date.now()).add("years", 1);

    if (values.property) {
      search = values.property;
    }
    try {
      startDate = values.when.startDate;
    } catch (e) {}

    try {
      endDate = values.when.endDate;
    } catch (e) {}

    console.log(startDate.format("MM/DD/YYYY"));
    console.log(endDate.format("MM/DD/YYYY"));
    if (this.props.travelBookings.bookings) {
      let fp = [];
      this.props.travelBookings.bookings.forEach(booking => {
        let from = moment(booking.bookingfrom);
        let to = moment(booking.bookingto);

        if (
          ((booking.propertyname.includes(search) ||
            booking.city.includes(search)) &&
            (from.isSameOrAfter(startDate) && to.isSameOrBefore(endDate))) ||
          (from.isSameOrBefore(startDate) && to.isSameOrAfter(endDate))
        ) {
          fp.push(booking);
        }
      });

      console.log(fp);
      this.setState({
        filteredProperties: fp
      });
    }
    this.forceUpdate();
  }

  componentWillMount() {
    this.props
      .getOwnerBookings(localStorage.getItem("username"))
      .then(() => {
        console.log(this.props.travelBookings.bookings);
        this.setState({
          filteredProperties: this.props.travelBookings.bookings
        });
      });
  }

  onPageChanged = data => {
    const { currentPage, totalPages, pageLimit } = data;
    const offset = (currentPage - 1) * pageLimit;
    const currentProperties = this.state.filteredProperties.slice(
      offset,
      offset + pageLimit
    );
    this.setState({ currentPage, currentProperties, totalPages });
  };

  render() {
    let { currentProperties } = this.state;

    let bookings = null;
    if (this.props.travelBookings.bookings.length === 0) {
      bookings = (
        <div className="col-12 text-center">
          <h2>No Bookings Made</h2>
          <br />
          <br />
          <Link to="/">
            <button type="button" className="btn btn-primary btn-lg ">
              Search Homeaway
            </button>
          </Link>
        </div>
      );
    } else {
      bookings = currentProperties.map(booking => {
        let from = moment(new Date(booking.bookingfrom)).format("MM/DD/YYYY");
        let to = moment(new Date(booking.bookingto)).format("MM/DD/YYYY");
        let status = null;
        if (Date.now() > new Date(booking.bookingto)) {
          status = (
            <small className="text-danger">This Booking has Elapsed</small>
          );
        } else if (
          Date.now() >=
          new Date(booking.bookingfrom) >=
          new Date(booking.bookingto)
        ) {
          status = (
            <small className="text-neutral">This Booking is Ongoing</small>
          );
        } else if (Date.now() < new Date(booking.bookingfrom)) {
          status = (
            <small className="text-success">This Booking is Pending</small>
          );
        }
        return (
          <div key={booking._id} className="col-12">
            <br />
            <br />
            <div className="card shadow-lg">
              <h5 className="card-header">Booking Reference: {booking._id}</h5>
              <div className="card-body">
                {status}
                <br />

                <h5 className="card-title">
                  {from}
                  &nbsp;&nbsp;to&nbsp;&nbsp;
                  {to}
                </h5>
                <p className="card-text">
                  Homeaway @ <b>{booking.city}</b>
                </p>
                <p className="card-text">
                  <b>{booking.propertyname}</b>
                </p>

                <p className="card-text">
                  Income
                  <b>
                    &nbsp;
                    {booking.cost}
                    {booking.currency}
                  </b>
                </p>

                <a
                  onClick={() => {
                    this.props.history.push({
                      pathname: "/PropertyView",
                      state: {
                        pid: booking.propertyid,
                        bid: booking._id,
                        callfrom: "OwnerBooking"
                      }
                    });
                  }}
                  className="btn btn-primary text-white">
                  View Booking
                </a>
              </div>
            </div>
          </div>
        );
      });
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-2 ">
            <div className="container">
              {" "}
              <br />
              <button
                type="button"
                onClick={() => {
                  if (this.state.showFilter) {
                    this.setState({
                      showFilter: false,
                      filterText: "Show Filter"
                    });
                  } else {
                    this.setState({
                      showFilter: true,
                      filterText: "Hide Filter"
                    });
                  }
                }}
                className="btn btn-primary btn-lg">
                {this.state.filterText}
              </button>
            </div>
          </div>

          <div className="col-10  ">
            {this.state.showFilter ? (
              <BookingFilterComponent onSubmit={this.onFilterClicked} />
            ) : null}
          </div>
        </div>
        <br />

        <br />
        <div className="row">
          {this.props.travelBookings.bookings.length ? (
            <div>
              <div className="row">
                <small>
                  Your Results have been Paginated, use this to navigate between
                  pages
                </small>
                <br />
              </div>
              <div className="row">
                <div>
                  <Paginations
                    totalRecords={this.state.filteredProperties.length}
                    pageLimit={5}
                    pageNeighbours={1}
                    onPageChanged={this.onPageChanged}
                    filteredProperties={this.state.filteredProperties}
                  />
                </div>{" "}
              </div>
            </div>
          ) : null}{" "}
          <br />
          <br />
          {bookings}
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    travelBookings: state.OwnerBookingsReducer,
    tokenState: state.TokenReducer
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    { getOwnerBookings, checkValidity }
  )(OwnerBookingsHeader)
);
