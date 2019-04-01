import React, { Component } from "react";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import { login, checkValidity } from "../../../Actions/userActions";

class LoginHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isTraveller: this.props.isTraveller,
      isOwner: this.props.isOwner
    };
    this.submitLogin = this.submitLogin.bind(this);
    this.emailChangeHandler = this.emailChangeHandler.bind(this);
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);



    
  }

  submitLogin = e => {
    e.preventDefault();
    const data = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.login(data).then(()=>{
      this.props.checkValidity();
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

  componentWillMount() {
    this.props.checkValidity();
  }

  render() {
    let redirectVar = null;
    if (this.props.tokenState.validity) {
      if (this.state.isTraveller) {
        redirectVar = <Redirect to="/TravelDash" />;
      } else if (this.state.isOwner) {
        redirectVar = <Redirect to="/OwnerDash" />;
      }
    }


    return (
      <div>
        {redirectVar}

        <header className="loginbg">
          <div className=" increaseHeight d-flex ">
            <div className="mx-auto text-center">
              <h1 className="roboFontLight">Log in to Homeaway</h1>
              <br />
              <h5 className="roboFontLight">
                Need an Account? <a href="/SignUp">Sign Up</a>
              </h5>
              <br />
              <div className="card text-left somePadding">
                {this.props.loginState.error ? (
                  <div className="alert alert-danger" role="alert">
                    {this.props.loginState.errorMessage}
                  </div>
                ) : null}
                <h4 className="roboFontLight"> Account Login</h4>
                <hr />
                <form>
                  <div className="form-group ">
                    <input
                      type="email"
                      onChange={this.emailChangeHandler}
                      className="form-control sharpEdges"
                      name="email"
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
                      name="password"
                      placeholder="Password"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    onClick={this.submitLogin}
                    className="btn btn-primary LoginButton">
                    Log In
                  </button>
                  <br />
                  <br />
                </form>
              </div>
              <br />
              <br />
              <br />
              <small>
                This is a total and complete ripoff of{" "}
                <a href="https://homeaway.com">Homeaway.com </a>
                <br />
                and is only meant for educational purposes
              </small>
            </div>
          </div>
        </header>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loginState: state.LoginReducer,
    tokenState: state.TokenReducer
  };
}

export default connect(
  mapStateToProps,
  { login, checkValidity }
)(LoginHeader);
