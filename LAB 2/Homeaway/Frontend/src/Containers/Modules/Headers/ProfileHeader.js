import React, { Component } from "react";
import "react-dates/initialize";
import { withRouter } from "react-router-dom";
import {
  checkValidity,
  getUserInformation,
  setUserInformation
} from "../../../Actions/userActions";
import { connect } from "react-redux";
import ProfileForm from "../../../Components/ProfileForm";

class ProfileHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
      error: false,
      message: ""
    };
  }

  componentWillMount() {
    let email="";
    this.props.getUserInformation(email);
  }

  onSaveProfileClickeListener = values => {
    this.props
      .setUserInformation(values)
      .then(res => {
        console.log("Saved Sucessfully ");
        this.setState({
          success: true,
          error:false,
          message: "Profile Information Saved"
        });
      })
      .catch(err => {
        console.log("Error", err);
        this.setState({
          success: false,
          error:true,
          message: err
        });
      });
  };

  render() {
    return (
      <div>
        <div className="container">
          <br />
          <br />
          <div className="row">
            <img
              id="main_img"
              src="https://loremflickr.com/150/150"
              className="rounded-circle mx-auto d-block"
              alt="./img/profile.png"
            />
          </div>
          <div className="row">
            <button className="rounded-circle shadow btn mx-auto d-block">
              <i className="fa fa-edit" />
            </button>
          </div>
          <br />
          <div className="row">
            {this.props.profileState.profile ? (
              <h2 className=" mx-auto d-block ">
                {this.props.profileState.profile.fname}
                &nbsp;
                {this.props.profileState.profile.lname}
              </h2>
            ) : null}
            <br />
          </div>
          <div className="row">
            <span className="mx-auto d-block">
              Member since 2018 <br />
            </span>
          </div>
          <br />
          <br />
          <div className="row">
            <div className="col-8">
              <div className="card">
                <div className="card-body">
                  <b>
                    <h4 className="card-title">Profile Information</h4>
                  </b>
                  <br />

                  {this.state.success ? (
                    <div className="alert alert-success" role="alert">
                      {this.state.message}
                    </div>
                  ) : null}
                  {this.state.error ? (
                    <div className="alert alert-danger" role="alert">
                      {this.state.message}
                    </div>
                  ) : null}

                  <ProfileForm onSubmit={this.onSaveProfileClickeListener} />
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="card">
                <div className="card-body text-center">
                  <button
                    type="button"
                    className="viewProfileButton btn btn-primary btn-lg btn-block"
                    onClick={()=>{
                      this.props.history.push({
                        pathname: "/ViewProfile",
                        state:{
                          email:localStorage.getItem("username")
                        }
                      })
                    }}>
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
          <br />
          <br />
          <br /> <br />
          <br />
        </div>
      </div>
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
    { getUserInformation, setUserInformation, checkValidity }
  )(ProfileHeader)
);
