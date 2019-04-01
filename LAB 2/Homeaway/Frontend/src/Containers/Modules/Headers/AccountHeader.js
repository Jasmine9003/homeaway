import React, { Component } from "react";
import "react-dates/initialize";
import axios from "axios";
import cookie from "react-cookies";

class AccountHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      currentpassword: "",
      newpassword: "",
      confirmpassword: "",
      passwordChanged: true,
      emailChanged: true,
      passwordsmatch: true,
      emailErrorMessage: "",
      passwordErrorMessage: ""
    };

    this.savePassword = this.savePassword.bind(this);
    this.saveEmail = this.saveEmail.bind(this);
    this.emailChangeHandler = this.emailChangeHandler.bind(this);
    this.currentPasswordChangeHandler = this.currentPasswordChangeHandler.bind(
      this
    );
    this.newpasswordChangeHandler = this.newpasswordChangeHandler.bind(this);
    this.confirmPasswordChangeHandler = this.confirmPasswordChangeHandler.bind(
      this
    );
  }

  componentDidMount() {
    this.setState({
      email: cookie.load("email")
    });
  }

  emailChangeHandler = e => {
    this.setState({
      email: e.target.value
    });
  };

  currentPasswordChangeHandler = e => {
    this.setState({
      currentpassword: e.target.value
    });
  };

  newpasswordChangeHandler = e => {
    this.setState({
      newpassword: e.target.value
    });
  };
  confirmPasswordChangeHandler = e => {
    this.setState({
      confirmpassword: e.target.value
    });
  };

  saveEmail = e => {
    e.preventDefault();
    const data = {
      currentemail: cookie.load("email"),
      newemail: this.state.email
    };

    axios.defaults.withCredentials = true;
    axios
      .post("http://localhost:8000/addUserHeavy", data)
      .then(response => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          this.setState({
            userAdded: true,
            userAddingError: false,
            userAddingMessage: ""
          });
        }
      })
      .catch(err => {
        this.setState({
          userAdded: false,
          userAddingError: true,
          userAddingMessage: "An Error occoured"
        });
      });
  };

  savePassword = e => {
    e.preventDefault();

    const data = {
      currentemail: cookie.load("email"),
      newemail: this.state.email
    };

    axios.defaults.withCredentials = true;
    axios
      .post("http://localhost:8000/addUserHeavy", data)
      .then(response => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          this.setState({
            userAdded: true,
            userAddingError: false,
            userAddingMessage: ""
          });
        }
      })
      .catch(err => {
        this.setState({
          userAdded: false,
          userAddingError: true,
          userAddingMessage: "An Error occoured"
        });
      });
  };

  render() {
    return (
      <div>
        <div className="container">
          <br />
          <br />
          <h4>Account Settings</h4>
          <br />
          <div class="card">
            <h5 class="card-header bg-white">
              <b>Change your email address</b>
            </h5>
            <div class="card-body">
              <div className="row">
                <div className="col-2">
                  <span className="mx-auto d-block">Email Address</span>
                </div>

                <div className="col-6">
                  <input
                    className="form-control form-control-lg"
                    type="email"
                    placeholder="Email"
                  />
                  <br />
                  <p className="text-danger">
                    This will update your account email address for future
                    reservations. If you need to update your email address for
                    an existing reservation, please reach out to the owner or
                    property manager, and they can update their records.
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-2" />
                <div className="col-6">
                  <br />
                  <a class="somePaddingforButtons roundcornerbutton btn btn-primary">
                    Save
                  </a>
                </div>
              </div>
            </div>
          </div>
          <br />
          <br />
          <div class="card">
            <h5 class="card-header bg-white">
              <b>Change your password</b>
            </h5>
            <div class="card-body">
              <br />
              <br />
              <div className="row">
                <div className="col-2">
                  <span className="mx-auto d-block">Current Password</span>
                </div>

                <div className="col-6">
                  <input
                    className="form-control form-control-lg"
                    type="password"
                  />
                  <br />
                </div>
              </div>
              <div className="row">
                <div className="col-2">
                  <span className="mx-auto d-block">New Password</span>
                </div>

                <div className="col-6">
                  <input
                    className="form-control form-control-lg"
                    type="password"
                  />
                  <br />
                </div>
              </div>
              <div className="row">
                <div className="col-2">
                  <span className="mx-auto d-block">Confirm Password</span>
                </div>

                <div className="col-6">
                  <input
                    className="form-control form-control-lg"
                    type="password"
                  />
                  <br />
                </div>
              </div>
              <div className="row">
                <div className="col-2" />
                <div className="col-6">
                  <br />
                  <a class="somePaddingforButtons roundcornerbutton btn btn-primary">
                    Save
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

export default AccountHeader;
