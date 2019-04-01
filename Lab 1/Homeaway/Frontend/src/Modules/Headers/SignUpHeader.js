import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import cookie from 'react-cookies';

class SignUpHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      lname: "",
      fname: "",
      userAdded: false,
      userAddingError: false,
      userAddingErrorMessage: ""
    };

    this.submitSignUp = this.submitSignUp.bind(this);
    this.fnameChangeHandler = this.fnameChangeHandler.bind(this);
    this.lnameChangeHandler = this.lnameChangeHandler.bind(this);
    this.emailChangeHandler = this.emailChangeHandler.bind(this);
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);

  }

  fnameChangeHandler = e => {
    this.setState({
      fname: e.target.value
    });
  };

  lnameChangeHandler = e => {
    this.setState({
      lname: e.target.value
    });
  };

  emailChangeHandler = e => {
    this.setState({
      email: e.target.value
    });
  };
  passwordChangeHandler = e => {
    this.setState({
      password: e.target.value
    });
  };

  submitSignUp = e => {
    e.preventDefault();
    const data = {
      email: this.state.email,
      password: this.state.password,
      lname: this.state.lname,
      fname: this.state.fname
    };

    axios.defaults.withCredentials = true;
    axios.post("http://localhost:8000/addUserLight", data).then(response => {
      console.log("Status Code : ", response.status);
    if(response.status===200){
      if(response.data.success){

        this.setState({
            userAdded: true,
            userAddingError: false,
            userAddingErrorMessage: ""
          });
        }else{
          this.setState({
            userAdded: false,
            userAddingError: true,
            userAddingErrorMessage: response.data.error
          });
        }
    }else{
        this.setState({
            userAdded: false,
            userAddingError: true,
            userAddingErrorMessage: response.data.err
          });
          console.log(response);
    }

    }).catch(err =>{
        this.setState({
            userAdded: false,
            userAddingError: true,
            userAddingErrorMessage: "An Error occoured"
          });

    });
  };




  render() {
    let redirectVar = null;
    if(cookie.load('email')){
      redirectVar = <Redirect to= "/TravelDash"/>
  }else{
    if (this.state.userAdded) {
      redirectVar = <Redirect to="/TravelDash" />;
    }
  }
    return (
      <div>
        {redirectVar}
        <div>
          <header className="loginbg">
            <div className=" increaseHeight d-flex ">
              <div className="mx-auto text-center">
                <h1 className="roboFontLight">Sign up for Homeaway</h1>
                <br />
                <h5 className="roboFontLight">
                  Already have an account? <a href="/Login">Log in</a>
                </h5>
                <br />
                <div className="card text-left somePadding">
                
                {this.state.userAddingError ? (
                    <div className="alert alert-danger"  role="alert">
                 {this.state.userAddingErrorMessage}
                </div>      ) : (null)}

                  <form>
                    <div className="row">
                      <div className="col-6">
                        <div className="form-group ">
                          <input
                            type="text"
                            onChange={this.fnameChangeHandler}
                            className="form-control sharpEdges"
                            name="FirstName"
                            aria-describedby="emailHelp"
                            placeholder="First Name"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="form-group ">
                          <input
                            type="text"
                            onChange={this.lnameChangeHandler}
                            className="form-control sharpEdges"
                            name="LastName"
                            aria-describedby="emailHelp"
                            placeholder="Last Name"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-group ">
                      <input
                        type="email"
                        onChange={this.emailChangeHandler}
                        className="form-control sharpEdges"
                        name="Email"
                        aria-describedby="emailHelp"
                        placeholder="Email address"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        onChange={this.passwordChangeHandler}
                        className="form-control sharpEdges"
                        id="Password"
                        placeholder="Password"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      onClick={this.submitSignUp}
                      className="btn btn-primary LoginButton"
                    >
                      Sign Me Up
                    </button>
                    <br />
                    <br />
                  </form>
                </div>
                <br />
                <br />
                <br />
                <small>
                  This is a total and complete ripoff of
                  <a href="https://homeaway.com">Homeaway.com </a>
                  <br />
                  and is only meant for educational purposes
                </small>
              </div>
            </div>
          </header>
        </div>
      </div>
    );
  }
}

export default SignUpHeader;
