import React, { Component } from "react";
import "react-dates/initialize";
import InternalNavTraveller from "../Modules/Navbar/InternalNavTraveller";
import { withRouter } from "react-router-dom";
import { checkValidity, getUserInformation } from "../../Actions/userActions";
import { connect } from "react-redux";

class ViewProfilePage extends Component {
  componentWillMount() {
    this.props.getUserInformation(this.props.location.state.email);
  }

  render() {
    return (
      
      this.props.profileState.profile ? 

      <div>
<InternalNavTraveller />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <div className="container">
          <div className="row text-center">
            <div className="col-12">
              <div class="card shadow-lg">
                <div class="card-body text-left">
                  <div className="row">
                    <div className="col-4">
                      <img
                        src="https://loremflickr.com/150/150"
                        className="rounded-circle mx-auto d-block shadow-lg"
                        alt="./img/profile.png"
                      />
                    </div>
                    <div className="col-8">
                      <h1 className="fontChange">
                        Hi I'm {this.props.profileState.profile.fname}
                        !&nbsp;
                      </h1>
                      <h4 className="fontChange">Member Since 2018</h4>
                      <br />
                      <br />

                      <h4>About Me</h4>
                      <p>{this.props.profileState.profile.aboutme ? this.props.profileState.profile.aboutme: "Not Provided"}</p>
                      <br />
                      <br />
                      <br />
                      <p>
                        <b>
                          Hometown: {this.props.profileState.profile.hometown? this.props.profileState.profile.hometown:"Not Provided"}
                        </b>

                        <br />
                        <b> School: {this.props.profileState.profile.school?this.props.profileState.profile.school:"Not Provided"}</b>
                        <br />
                        <b>
                          Languages: {this.props.profileState.profile.languages?this.props.profileState.profile.languages:"Not Provided"}
                        </b>
                        <br />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>  :null
    );
  }
}

function mapStateToProps(state) {
  return {
    profileState: state.ProfileReducer,
    tokenState: state.TokenReducer
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    { getUserInformation, checkValidity }
  )(ViewProfilePage)
);
