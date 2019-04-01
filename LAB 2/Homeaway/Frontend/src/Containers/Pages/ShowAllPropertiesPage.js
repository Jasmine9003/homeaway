import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import moment from "moment";
import {
  getPropertiesWhere,
  searchParams
} from "../../Actions/propertyActions";
import { connect } from "react-redux";
import { checkValidity } from "../../Actions/userActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchNav from "../Modules/Navbar/SearchNav";
import Paginations from "../../Components/Pagination";
import FilterPropertyForm from "../../Components/FilterComponent";

moment.suppressDeprecationWarnings = true;

class ShowAllPropertiesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProperties: [],
      filteredProperties: [],
      currentPage: null,
      totalPages: null,
      propertyClicked: false,
      propertypid: "",
      showFilter: false,
      filterText: "Show Filter",

    };

    this.onFilterClicked = this.onFilterClicked.bind(this);
  }
  componentDidMount() {
    this.props.checkValidity();
  };

  onPageChanged = data => {
    const { currentPage, totalPages, pageLimit } = data;
    const offset = (currentPage - 1) * pageLimit;
    const currentProperties = this.state.filteredProperties.slice(
      offset,
      offset + pageLimit
    );
    this.setState({ currentPage, currentProperties, totalPages });
  };

  onFilterClicked(values) {

    let lowerlimit =0;
    let upperlimit=10000;
    let bedrooms=1;
    if(values.lowerlimit){
      lowerlimit=values.lowerlimit
    }
    if(values.upperlimit){
      upperlimit=values.upperlimit
    }
    if(values.bedrooms){
      bedrooms=values.bedrooms
    }


    if(this.props.searchProperty){
      let fp=[];
     

      this.props.searchProperty.forEach(property => {
        if (
          property.baserent >= lowerlimit &&
          property.baserent <= upperlimit &&
          property.bedrooms >= bedrooms
        ) {
          fp.push(property);
        }
  
      });

      console.log(fp);
      this.setState({
        filteredProperties: fp
      });
    }
    this.forceUpdate();
    
  }

componentWillReceiveProps(nextprops){
  console.log(nextprops);
  this.setState({
    filteredProperties:nextprops.searchProperty
  })
  this.forceUpdate();
}



  render() {
    let { currentProperties } = this.state;

    console.log("length",currentProperties.length)
    if (this.props.isValidTokenState !== undefined) {
      if (!this.props.isValidTokenState) {
        this.props.history.push({
          pathname: "/Login"
        });
      }
    }
    let properties =null;

     properties = currentProperties.map(property => {
      let ImageUrl = "./uploads/" + property.email + "/" + property.photos[0];
      return (
        <a
          key={property._id}
          onClick={() => {
            this.props.history.push({
              pathname: "/PropertyView",
              state: {
                pid: property._id,
                callfrom: "Customer"
              }
            });
          }}>
          <div>
            <div className="card shadow-lg box  ">
              <div className="row no-gutters">
                <div className="col-auto">
                  <img src={ImageUrl} className="img-fluid resize" alt="" />
                </div>
                <div className="col  text-left" style={{ paddingLeft: "3%" }}>
                  <br />
                  <div className="card-block px-2">
                    <h4 className="card-title">{property.headline}</h4>
                    <p className="card-text">
                      <i>
                        {property.placetype} &nbsp;. &nbsp;
                        {property.bedrooms}
                        &nbsp; Bed&nbsp;.&nbsp;
                        {property.bathrooms}
                        &nbsp;Bath&nbsp;.&nbsp;Sleeps&nbsp;
                        {property.accomodates}
                      </i>
                      <br />
                      <br />
                      <FontAwesomeIcon icon="location-arrow" />
                      &nbsp;
                      {property.city}, {property.state}
                    </p>
                  </div>
                  <br />
                  <br />

                  <div
                    className="card-footer text-muted"
                    style={{
                      marginLeft: "-4.5%",
                      paddingTop: "1.25%",
                      paddingLeft: "5%"
                    }}>
                    <div className="row">
                      <div className="col-auto">
                        <br />
                        <b>
                          <h3 style={{ color: "#000000" }}>
                            ${property.baserent}
                          </h3>
                        </b>
                      </div>
                      <div className="col-3">
                        <br />
                        avg/night
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <br />
            <br />
          </div>
        </a>
      );
    });

    if (this.state.filteredProperties.length === 0) {
      properties = <h2>No Properties Found</h2>;
    }

    return (
      <div>
        <SearchNav />

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
                class="btn btn-primary btn-lg">
                {this.state.filterText}
              </button>
            </div>
          </div>

          <div className="col-10  ">
            {this.state.showFilter ? (
              <FilterPropertyForm onSubmit={this.onFilterClicked} />
            ) : null}
          </div>
        </div>
        <br />

        <div className="container text-center   ">
          {this.state.filteredProperties.length ? (
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
                    pageLimit={10}
                    pageNeighbours={1}
                    onPageChanged={this.onPageChanged}
                    filteredProperties={this.state.filteredProperties}
                    
                  />
                </div>{" "}
              </div>
            </div>
          ) : null}
          <br />

          <br />
          {properties}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    searchProperty: state.SearchPropertyReducer.properties,
    isValidTokenState: state.TokenReducer.validity
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    { getPropertiesWhere, searchParams, checkValidity }
  )(ShowAllPropertiesPage)
);
