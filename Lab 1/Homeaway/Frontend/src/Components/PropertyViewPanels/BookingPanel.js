import React, { Component } from "react";
import "react-dates/initialize";
import axios from "axios";
import moment from "moment";
import { DateRangePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import cookie from 'react-cookies';
import { Redirect } from "react-router";

class PropertyBookingPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pid: 0,
      startDate:null,
      endDate:null,
      currency:"",
      pricepernight:0,
      chosenNoDates:0,
      availableFrom:null,
      availableTo:null,
      blockedDates:null,
      BookingAddedSucessfully:false,
      owneremail:"",
      cost:0,
      city:""

    };

  }


  bookProperty =() =>{
    if(this.state.startDate===undefined || this.state.startDate===null ){
      alert("StartDate is Undefined");
    }else  if(this.state.endDate===undefined || this.state.endDate===null){
      alert("EndDate is Undefined");
    }else{
    var data= {
      pid:this.state.pid,
      travellerEmail:cookie.load("email"),
      startDate:this.state.startDate.toDate().toString(),
      endDate:this.state.endDate.toDate().toString(),
      cost:this.state.cost,
      currency:this.props.currency,
      city:this.props.city,
      owneremail:this.props.owneremail
    }
    axios.defaults.withCredentials = true;
    axios.post("http://localhost:8000/addBooking",data).then(response => {
      console.log("Status Code : ", response.status);
    if(response.status===200){
      this.setState({
        BookingAddedSucessfully:true
      })
    }
  });
    }
  }


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



  datesChageHandler = ({ startDate, endDate }) => {
    let cost=0;
    let n=0;
   if(endDate){
     n = endDate.diff(startDate, 'days');
     cost = n*this.props.pricepernight;
   }
   
    this.setState({ 
      startDate,
       endDate,
       chosenNoDates:n,
       cost:cost

     })

  
  };


  componentWillMount() {


    const data = {
      pid: this.props.pid
    };


    axios.defaults.withCredentials = true;
    axios
      .post("http://localhost:8000/getAllBookingsOfCurrentProperty", data)
      .then(response => {
        if (response.status === 200) {
          if (response.data) {
            this.setState({
              properties: response.data.rows
            });
            let blockedDates =[]



            let l = response.data.rows.length;
            for(var i =0 ; i< l;i++){
              let booking = response.data.rows[i];
               let dates = this.getDates(new Date(booking.from),new Date(booking.to));
              dates.forEach(date => {
                blockedDates.push(moment(date)) ;
                           });
              
            }
            this.setState({
                blockedDates: blockedDates
              });
          }
        }
      });
  }

  componentDidMount(){
    this.setState({
      pid: this.props.pid,
      currency:this.props.currency,
      pricepernight:this.props.pricepernight,
      availableFrom:this.props.availablefrom,
      availableTo:this.props.availableto,
    });
  }

  render() {
    var redirectVar=null;
    if(this.state.BookingAddedSucessfully){
      redirectVar = <Redirect to= "/TravelDash"/>
    }

    function checkForBlockedDates(start, end, dates) {
      const dateFormat = 'YYYY-MM-DD';
      const diff = moment(end).diff(start, 'days') + 1;
    
      for (let i = 0; i < diff; i++) {
        const checkDate = moment(start).add(i, 'd').format(dateFormat);
    
        if (dates[checkDate] && dates[checkDate].blocked) {
          return true;
        }
      }
    
      return false;
    }

 //Fetch Dates When Available
 let isOutsideRange = day => {
    let dayBlocked = false;
    if (moment(this.props.availableto).diff(day, "days") < 0) {
      dayBlocked = true;
    }
    if (moment(this.props.availablefrom).diff(day, "days") > 0) {
      dayBlocked = true;
    }
    return dayBlocked;
  };
  
  
  let blockedDates= this.state.blockedDates;
  const isDayBlocked = day => blockedDates.filter(d => d.isSame(day, 'day')).length > 0;

    return (
        <div>
          {redirectVar}
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
      <div className="card shadow-lg">
        <div className="card-body">
          <h5 className="card-title">Booking Property</h5>
          <small>
              Tell us when you want to rent this property 
          </small>
          <DateRangePicker
                startDate={this.state.startDate}
                endDate={this.state.endDate}
                minimumNights={this.state.minimumstay}
                isOutsideRange={isOutsideRange}
                isDayBlocked={isDayBlocked}
                startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                onDatesChange={this.datesChageHandler}
                focusedInput={this.state.focusedInput}
                onFocusChange={focusedInput => this.setState({ focusedInput })}
              />
              <small>{this.props.pricepernight}{this.props.currency}/Night</small>
              <br/><br/>

              <h1>
                {this.state.cost}{this.props.currency}
              </h1>

               <br/>
          <a  onClick={this.bookProperty} className="btn btn-primary text-white">
                Book Property 
          </a>

       


        </div>
      </div>
      </div>
    );
  }
}

export default PropertyBookingPanel;
