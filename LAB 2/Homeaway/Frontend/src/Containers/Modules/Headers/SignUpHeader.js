import React, { Component } from "react";
import { connect } from "react-redux";
import SignUpComponent from "../../../Components/SignUpComponent";
import { signUp } from "../../../Actions/userActions";
import { withRouter } from "react-router-dom";

class SignUpHeader extends Component {
  onSignUpClickListener = values => {
    this.props
      .signUp(values)
      .then(res => {
        console.log("Signed Up Sucessfully");
      })
      .catch(err => {
        console.log("Signed Up Error", err);
      });
  };

  render() {
    if (this.props.tokenState.validity) {
      this.props.history.push({
        pathname: "/TravelDash"
      });
    }
    return (
      <div>
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
                  {this.props.signUpState.error ? (
                    <div className="alert alert-danger" role="alert">
                      {this.props.signUpState.errorMessage}
                    </div>
                  ) : null}
                  {this.props.signUpState.added ? (
                    <div className="alert alert-success" role="alert">
                      Sign-Up Successful, You can Log In
                    </div>
                  ) : null}
                  <SignUpComponent onSubmit={this.onSignUpClickListener} />
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

function mapStateToProps(state) {
  return {
    signUpState: state.SignUpReducer,
    loginState: state.LoginReducer,
    tokenState: state.TokenReducer
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    { signUp }
  )(SignUpHeader)
);
