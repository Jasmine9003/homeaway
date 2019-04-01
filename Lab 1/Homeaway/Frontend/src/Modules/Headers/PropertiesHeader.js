import React, { Component } from "react";
import "react-dates/initialize";
import axios from "axios";
import { withRouter } from "react-router-dom";
import cookie from "react-cookies";

class Properties extends Component {
  constructor(props) {
    super(props);
    this.state = {
      properties:[],
      propertyClicked:false,
      propertypid:""

    };
  }



  componentDidMount(){ 
    const data = {
        email: cookie.load("email"),
    };
    axios.defaults.withCredentials = true;
    axios.post('http://localhost:8000/getAllPropertiesOfUser',data)
            .then((response) => {
              if(response.status===200){
               if(response.data.success){
                 this.setState({
                   properties: response.data.rows
                })
               }
              }
        });
}



  render() {


    let properties = this.state.properties.map(property => {
   
      var arr = property.photos.split(",");
      let ImageUrl = "./uploads/"+cookie.load("email")+"/"+arr[0];

      return(
        


        <div key={property.pid} className="col-4">
        <div className="card" >
        <img className="card-img-top" src={ImageUrl} alt="" />
        <div className="card-body">
          <h5 className="card-title" >{property.headline}</h5>
          <p className="card-text">
          <b>@{property.city}</b>
          </p>
          <a  onClick={()=>{ this.setState({propertyClicked :true, propertypid:property.pid }); }}  className="btn btn-primary text-white">
            View Property
          </a>
        </div>
      </div>
      </div>
      )
      

    });


    let redirectVar = null;
    if(this.state.propertyClicked){
      redirectVar = this.props.history.push({
        pathname: '/PropertyView',
        state: { 
        pid: this.state.propertypid,
        callfrom:"Owner" 
      }
    })
  }



    return (
      <div className="container">
        <div className="row">
          
          {redirectVar}
           {properties}
          <div className="col-3">
          <div className="mx-auto text-center">
          <br/><br/><br/><br/><br/>
          <div className="card addProperty" >
              <div className="card-body">
                <h5 className="card-title">Add Property</h5>
                <p className="card-text">
                </p>
                <a href="/OwnerPropertyAdd" className="btn btn-primary">
                  Add Property
                </a>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Properties);
