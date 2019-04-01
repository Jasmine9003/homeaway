import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import SearchPropertyForm from "../../../Components/SearchComponent";
import { getPropertiesWhere,searchParams } from "../../../Actions/propertyActions";
import { connect } from "react-redux";
import moment from "moment";

moment.suppressDeprecationWarnings = true;

class LandingHeader extends Component {

  
  onSearchClickedListener = values => {
    let data = {
      where: values.where,
      startDate: moment(values.when.startDate.toString()).format("L"),
      endDate: moment(values.when.endDate.toString()).format("L"),
      people: values.people
    };

    // this.props.searchParams(data);
    this.props.getPropertiesWhere(data);
    this.props.history.push({
      pathname: "/Properties",
    });
  };

  render() {
    return (
      <div>
        <header className="masthead">
          <div className="container h-100">
            <div className="row align-items-center h-100">
              <div className="col-12 mx-auto">
                <div>
                  <h1 className="">Book beach houses, cabins,</h1>
                  <h1 className="">condos and more, worldwide</h1>
                  <div className="card  mastcard  ">
                    <SearchPropertyForm
                      onSubmit={this.onSearchClickedListener}
                      color="white"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    propertyState: state.OwnerPropertyReducer,
    tokenState: state.TokenReducer,
    searchParamState: state.SearchParamsReducer
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    { getPropertiesWhere,searchParams }
  )(LandingHeader)
);
