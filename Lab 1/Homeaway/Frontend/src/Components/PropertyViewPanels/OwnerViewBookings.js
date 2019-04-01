import React, { Component } from "react";
import "react-dates/initialize";
import moment from "moment";
import { DateRangePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import {withRouter} from 'react-router-dom';
import { Redirect } from "react-router";

class OwnerBookingPanel extends Component {
  

  constructor(props) {
    super(props);
    this.state = {
      goOwnerDash: false,
      seeProfile:false
    
    };
  }




  onseeOtherpropertiesClicked=()=>{
    this.setState({
      goOwnerDash:true
    })
  }
   
  onSeeProfileClicked=()=>{
    this.setState({
      seeProfile:true
    })
  }
   

  render() {

    let redirectVar=null;
    if(this.state.goOwnerDash){
      redirectVar=<Redirect to="/OwnerDash"/>
    }

    if(this.state.seeProfile){
    
       redirectVar=  this.props.history.push({
          pathname: '/ViewProfile',
          state: {
            email: this.props.booker
          }   
      }) 
     
    }
 
    return (
        <div>
        <br/>
        {redirectVar}
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
      <div className="card shadow-lg">
        <div className="card-body">
          <h5 className="card-title"> Property Booking </h5>
          <small>
              Booking
          </small>
          <DateRangePicker
                startDate={moment(new Date(this.props.bookingfrom))}
                endDate={moment(new Date(this.props.bookingto))}
                readOnly={true}
                startDateId="your_unique_start_date_id"
                endDateId="your_unique_end_date_id"
                onDatesChange={({ startDate, endDate }) =>
                console.log()
              }
              onFocusChange={focusedInput =>
                console.log()
              }
              />
              <small>{this.props.pricepernight}{this.props.currency}/Night</small>
              <br/><br/>

              <h1>
                {this.props.cost}{this.props.currency}
              </h1>

               <br/>
               <a  onClick={this.onSeeProfileClicked} className="btn btn-primary text-white">
                View Traveller Profile
          </a>

          <br/><br/>
          <a  onClick={this.onseeOtherpropertiesClicked} className="btn btn-primary text-white">
                See Other Bookings
          </a>
        </div>
      </div>
      </div>
    );
  }
}

export default withRouter(OwnerBookingPanel);
