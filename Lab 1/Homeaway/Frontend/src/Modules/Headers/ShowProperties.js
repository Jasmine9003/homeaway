import React, { Component } from "react";
import "react-dates/initialize";
import axios from "axios";
import { Redirect } from "react-router";
import MapComponent from "../../Components/MapComponent";
import {withRouter} from "react-router-dom";

import { DateRangePicker } from "react-dates";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import moment from "moment";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import cookie from 'react-cookies';
import OtherNav from "../Navbar/OtherNav";

class ShowAllProperties extends Component {
  constructor(props) {
    super(props);
    this.state = {
      properties: [],
      propertyClicked: false,
      propertypid: "",
      where: "",
      startDate: null,
      endDate: null,
      people: "1",
      searchedClicked: false
    };
  }

  onSearchClickedListener = () => {
    var data = {
      where: this.state.where,
      people: this.state.people,
      startDate:this.state.startDate,
      endDate:this.state.endDate
    };
 
    this.search(data)
  };

  datesChageHandler = ({ startDate, endDate }) => {
    this.setState({ startDate, endDate });
  };

  WhereChangeHandler = e => {
    this.setState({
      where: e.target.value
    });
  };

  peopleChangeHandler = e => {
    this.setState({
      people: e.target.value
    });
  };

  componentWillMount() {
    console.log(moment(this.props.location.state.startDate));
    this.setState({
      where: this.props.location.state.where,
      startDate: moment(this.props.location.state.startDate),
      endDate: moment(this.props.location.state.endDate),
      people: this.props.location.state.people
    });

 


  }


  search(data){
    console.log(data);
    axios.defaults.withCredentials = true;
    axios
      .post("http://localhost:8000/getAllPropertiesWhere", data)
      .then(response => {
        if (response.status === 200) {
          if (response.data.success) {
            this.setState({
              properties: response.data.filteredRows
            });
          }
        }
      });
  }

  componentDidMount(){
    var data = {
      where: this.state.where,
      people: this.state.people,
      startDate:this.state.startDate,
      endDate:this.state.endDate
    };
 
    this.search(data)
  }



  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  onViewPropertyClickHandler = e => {
    console.log(e.currentTarget.value);
  };

  render() {

    let properties =null;
    if(this.state.properties.length>0){
      properties = this.state.properties.map(property => {
      var arr = property.photos.split(",");
      let ImageUrl = "./uploads/"+property.uemail+"/" + arr[0];

      return (
          <div>
            <div key={property.pid} className="card"
            onClick={() => {
              this.setState({
                propertyClicked: true,
                propertypid: property.pid
              });
            }}
            >
              <div className="card-body">
                <div className="row">
                  <div className="col-4"> 
                    <img src={ImageUrl} alt="..." className="img-thumbnail  " />
                  </div>
                  <div className="col-8">
                  
                      <h4 className="propLink">{property.headline}</h4>
              
                    <p className="card-text">
                      {this.capitalizeFirstLetter(property.type)}
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      {property.bedrooms}
                      Bed&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      {property.bathrooms}
                      Bath&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Sleeps&nbsp;
                      {property.accomodates}
                      <br />
                      <br />
                     
                    </p>
                    <div style={{background:"#e6e6e6"}}>
                      &nbsp;&nbsp;&nbsp;{property.baserent}
                      {property.currency} <small>per Night</small>
                      </div>
                  </div>
                </div>
              </div>
            </div>
               <br />
               <br />
               </div>

      );
    });
  }else{
    properties=
    <div className="col-6"
>
    <h3>No Properties Found</h3>
    </div>
    
  }

    let redirectVar = null;
    if (this.state.propertyClicked) {
      redirectVar = (
     this.props.history.push({
            pathname: "/PropertyView",
            state: {
              pid: this.state.propertypid,
              callfrom: "Customer"
            }
          })
      );
    }

    if(!cookie.load('email')){
      redirectVar = <Redirect to= "/Login"/>
    }

    return (
      <div>
        {redirectVar}
        <OtherNav />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
 

        <div className="container">
          <div className="card  increaseWidthBothSidesLesser">
            <div className="card-body mastcardContent ">
              <div className="row">
                <div className="col-4 ">
                <small style={{color:"#000000"}}>Where</small>
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Where do you want to go?"
                    value={this.state.where}
                    onChange={this.WhereChangeHandler}
                  />
                </div>
                <div className="col-3 ">
                <small style={{color:"#000000"}}>When</small>

                  <DateRangePicker
                    startDate={this.state.startDate}
                    startDateId="your_unique_start_date_id"
                    endDate={this.state.endDate}
                    endDateId="your_unique_end_date_id"
                    onDatesChange={({ startDate, endDate }) =>
                      this.setState({ startDate, endDate })
                    }
                    focusedInput={this.state.focusedInput}
                    onFocusChange={focusedInput =>
                      this.setState({ focusedInput })
                    }
                  />
                </div>
                <div className="col-2">
                <small style={{color:"#000000"}}>How Many</small>

                  <select
                    value={this.state.people}
                    onChange={this.peopleChangeHandler}
                    className="form-control form-control-lg"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                  </select>
                </div>
                <div className="col-1">
                <br></br>
                  <button
                    type="button"
                    onClick={this.onSearchClickedListener}
                    className=" roundcornerbutton btn btn-primary btn-lg"
                  >
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Search&nbsp;&nbsp;&nbsp;&nbsp;
                  </button>
                </div>
              </div>
            </div>
          </div>
          <br />
          <br />
          <br />
          <div className="row increaseWidthBothSidesLesser">
               <div className="col-6">{properties}  
        </div>
          <div id="map" className="col-6 ">
          <MapComponent/>
          </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(ShowAllProperties);
