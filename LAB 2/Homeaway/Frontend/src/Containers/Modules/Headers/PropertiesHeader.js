import React, { Component } from "react";
import "react-dates/initialize";
import { withRouter } from "react-router-dom";
import { getAllPropertiesOfUser } from "../../../Actions/propertyActions";
import { checkValidity } from "../../../Actions/userActions";

import { connect } from "react-redux";

class PropertiesHeader extends Component {
  componentWillMount() {
    this.props.checkValidity();
    this.props.getAllPropertiesOfUser();
  }

  render() {
    let properties = this.props.propertyState.properties.map(property => {
      return (
        <div key={property._id} >
        <div className="card shadow-lg">
          <div className="card-body">
            <h4 className="card-title">{property.headline}</h4>
            <p className="card-text">
              @{property.city}, {property.state} <br />
              <br />
              <b> Phone: {property.phone} </b>
            </p>
            <a onClick={()=>{
                   this.props.history.push({
                    pathname: "/PropertyView",
                    state: {
                      pid: property._id ,
                      callfrom: "Owner"
                    }
                  })
            }} className="btn btn-primary  btn-block  text-white">
              View Property
            </a>
          </div>

        </div>
        <br/><br/>
        </div>
      );
    });

    return (
      <div className="container">
        <br />
        <br />
        <br />
        <div className="row">
          <div className="col-6 offset-3">
            <a
              href="/OwnerPropertyAdd"
              className="btn btn-success btn-lg btn-block shadow-lg">
              Add New Property
            </a>
          </div>
        </div>
        <br />
        <br />
        <br />
        <div className="row">
          <div className="col-10 offset-1  ">{properties}</div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    propertyState: state.OwnerPropertyReducer,
    tokenState: state.TokenReducer
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    { getAllPropertiesOfUser,checkValidity }
  )(PropertiesHeader)
);
