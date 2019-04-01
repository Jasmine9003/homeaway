import React, { Component } from "react";
import "react-dates/initialize";
import axios from "axios";
import OtherNav from "../../Modules/Navbar/OtherNav";
import { Redirect } from "react-router";
import cookie from 'react-cookies';
class ViewProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lname: "",
      fname: "",
      membersince: "",
      aboutme: "",
      mycity: "",
      company: "",
      school: "",
      hometown: "",
      languages: "",
      gender: "",
      phonenumber: "",
      userAdded: false,
      userAddingError: false,
      userAddingErrorMessage: ""
    };
  }

  componentWillMount() {
    const datas = {
      email: this.props.location.state.email
    };
    axios.defaults.withCredentials = true;
    axios
      .post("http://localhost:8000/getUserInfo", datas)
      .then(response => {
        if (response.status === 200) {
          if (response.data.success) {
            console.log(response.data.data);
            this.setState({
              lname:
                response.data.data.lname === null
                  ? ""
                  : response.data.data.lname,
              fname:
                response.data.data.fname === null
                  ? ""
                  : response.data.data.fname,
              membersince:
                response.data.data.membersince === null
                  ? ""
                  : response.data.data.membersince,
              aboutme:
                response.data.data.aboutme === null
                  ? ""
                  : response.data.data.aboutme,
              mycity:
                response.data.data.mycity === null
                  ? ""
                  : response.data.data.mycity,
              company:
                response.data.data.company === null
                  ? ""
                  : response.data.data.company,
              school:
                response.data.data.school === null
                  ? ""
                  : response.data.data.school,
              hometown:
                response.data.data.hometown === null
                  ? ""
                  : response.data.data.hometown,
              languages:
                response.data.data.languages === null
                  ? ""
                  : response.data.data.languages,
              gender:
                response.data.data.gender === null
                  ? ""
                  : response.data.data.gender,
              phonenumber:
                response.data.data.phonenumber === null
                  ? ""
                  : response.data.data.phonenumber
            });
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
      let redirectVar=null;
    if(!cookie.load('email')){
        redirectVar = <Redirect to= "/"/>
    }
    return (
      <div>
          {redirectVar}
                  <OtherNav/>

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
                      <h1 className="fontChange">Hi I'm {this.state.fname}&nbsp;{this.state.lname}!</h1>
                      <h4 className="fontChange">Member Since {this.state.membersince}</h4>
                      <br />
                      <br />

                      <h4>About Me</h4>
                      <p>{this.state.aboutme}</p>
                      <br />
                      <br />
                      <br />
                      <p>
                      <b>Hometown: </b>{this.state.hometown}
                        <br />
                        <b>Company: </b>{this.state.company}
                        <br />
                        <b> School:</b> {this.state.school}
                        <br />
                        <b>Languages:</b> {this.state.languages}
                        <br />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ViewProfile;
