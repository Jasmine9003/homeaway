import React, { Component } from "react";
import "react-dates/initialize";
import axios from "axios";
import cookie from 'react-cookies';
import {withRouter} from 'react-router-dom';


class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
     
      lname: "",
      fname: "",
      membersince: "",
      aboutme:"",
      mycity:"",
      company:"",
      school:"",
      hometown:"",
      languages:"",
      gender:"",
      phonenumber:"",
      userAdded: false,
      userAddingError: false,
      userAddingErrorMessage: "",
      viewProfileClicked:false



    
    };

    this.saveChanges = this.saveChanges.bind(this);
    this.fnameChangeHandler = this.fnameChangeHandler.bind(this);
    this.lnameChangeHandler = this.lnameChangeHandler.bind(this);
    this.membersinceChangeHandler = this.membersinceChangeHandler.bind(this);
    this.aboutmeChangeHandler = this.aboutmeChangeHandler.bind(this);
    this.mycityChangeHandler = this.mycityChangeHandler.bind(this);
    this.companyChangeHandler = this.companyChangeHandler.bind(this);
    this.schoolChangeHandler = this.schoolChangeHandler.bind(this);
    this.hometownChangeHandler = this.hometownChangeHandler.bind(this);
    this.languagesChangeHandler = this.languagesChangeHandler.bind(this);
    this.genderChangeHandler = this.genderChangeHandler.bind(this);
    this.phonenumberChangeHandler = this.phonenumberChangeHandler.bind(this);
    this.onViewProfileClicked = this.onViewProfileClicked.bind(this);

  }

  componentDidMount() {
    const datas = {
     
     email: cookie.load('email')

    }
    axios.defaults.withCredentials = true;
    axios.post("http://localhost:8000/getUserInfo", datas).then(response => {
    if(response.status===200){
      if(response.data.success){
          console.log(response.data.data);        
          this.setState({
      lname: (response.data.data.lname ===null ? "":response.data.data.lname ),
      fname: (response.data.data.fname ===null ? "":response.data.data.fname ),
      membersince: (response.data.data.membersince ===null ? "":response.data.data.membersince ),
      aboutme:(response.data.data.aboutme ===null ? "":response.data.data.aboutme ),
      mycity:(response.data.data.mycity ===null ? "":response.data.data.mycity ),
      company:(response.data.data.company ===null ? "":response.data.data.company ),
      school:(response.data.data.school ===null ? "":response.data.data.school ),
      hometown:(response.data.data.hometown ===null ? "":response.data.data.hometown ),
      languages:(response.data.data.languages ===null ? "":response.data.data.languages ),
      gender:(response.data.data.gender ===null ? "":response.data.data.gender ),
      phonenumber:(response.data.data.phonenumber ===null ? "":response.data.data.phonenumber )
          });
      }
    }   
  }).catch(err =>{
    console.log(err);
  });
}


    onViewProfileClicked = e=>{
      this.setState({
        viewProfileClicked:true
      })
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
  
    membersinceChangeHandler = e => {
      this.setState({
        membersince: e.target.value
      });
    };
    aboutmeChangeHandler = e => {
      this.setState({
        aboutme: e.target.value
      });
    };


    mycityChangeHandler = e => {
      this.setState({
        mycity: e.target.value
      });
    };
  
    companyChangeHandler = e => {
      this.setState({
        company: e.target.value
      });
    };
  
    schoolChangeHandler = e => {
      this.setState({
        school: e.target.value
      });
    };
    hometownChangeHandler = e => {
      this.setState({
        hometown: e.target.value
      });
    };


    languagesChangeHandler = e => {
      this.setState({
        languages: e.target.value
      });
    };

    genderChangeHandler = e => {
      this.setState({
        gender: e.target.value
      });
    };

    phonenumberChangeHandler = e => {
      this.setState({
        phonenumber: e.target.value
      });
    };
  
    saveChanges = e => {
      e.preventDefault();
      const data = {
        lname: this.state.lname,
        fname: this.state.fname,
        membersince: this.state.membersince,
        aboutme:this.state.aboutme,
        mycity:this.state.mycity,
        company:this.state.company,
        school:this.state.school,
        hometown:this.state.hometown,
        languages:this.state.languages,
        gender:this.state.gender,
        phonenumber:this.state.phonenumber,
        email:cookie.load('email')
      };

  
      axios.defaults.withCredentials = true;
      axios.post("http://localhost:8000/addUserHeavy", data).then(response => {
        console.log("Status Code : ", response.status);
      if(response.status===200){  
          this.setState({
              userAdded: true,
              userAddingError: false,
              userAddingMessage: ""
            });
          }
  
      }).catch(err =>{
          this.setState({
              userAdded: false,
              userAddingError: true,
              userAddingMessage: "An Error occoured"
            });
  
      });
    };
  
  
  render() {

    let redirectVar =null;

    if(this.state.viewProfileClicked){
      redirectVar=  this.props.history.push({
        pathname: '/ViewProfile',
        state: {
          email: cookie.load("email")
        }   
    }) 
    }

    return (
      <div>
        {redirectVar}
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
          <h2 className=" mx-auto d-block ">{this.state.fname}{" "}{this.state.lname}</h2>
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
                  {this.state.userAddingError ? (
                    <div className="alert alert-danger"  role="alert">
                 {this.state.userAddingMessage}
                </div>      ) : (null)}
                {this.state.userAdded ? (
                    <div className="alert alert-success"  role="alert">
                    Updated Student Information
               </div>      ) : (null)}
                </b>
                <br />
                <div className="row">
                  <div className="col-6">
                    <input
                      className="form-control form-control-md"
                      type="text"
                      value={this.state.fname}
                      onChange={this.fnameChangeHandler}
                      placeholder="First Name"
                    />
                    <br />
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <input
                      className="form-control form-control-md"
                      type="text"
                      value={this.state.lname}
                      onChange={this.lnameChangeHandler}

                      placeholder="Last Name"
                    />
                    <br />
                  </div>
                </div>
                <div className="row">
                  <div className="col-12  ">
                    <textarea
                      className="form-control form-control-md"
                      value={this.state.aboutme}
                      onChange={this.aboutmeChangeHandler}
                      rows="3"
                      placeholder="About Me"
                    />

                    <br />
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <input
                      className="form-control form-control-md"
                      type="text"
                      value={this.state.mycity}
                      onChange={this.mycityChangeHandler}
                      placeholder="My city, Country"
                    />
                    <br />
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <input
                      className="form-control form-control-md"
                      type="text"
                      value={this.state.company}
                      onChange={this.companyChangeHandler}
                      placeholder="Company"
                    />
                    <br />
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <input
                      className="form-control form-control-md"
                      type="text"
                      value={this.state.school}
                      onChange={this.schoolChangeHandler}
                      placeholder="School"
                    />
                    <br />
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <input
                      className="form-control form-control-md"
                      type="text"
                      value={this.state.hometown}
                      onChange={this.hometownChangeHandler}
                      placeholder="Hometown"
                    />
                    <br />
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <input
                      className="form-control form-control-md"
                      type="text"
                      value={this.state.languages}
                      onChange={this.languagesChangeHandler}
                      placeholder="Languages"
                    />
                    <br />
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <select
                      value={this.state.gender}
                      onChange={this.genderChangeHandler}
                      id="inputState"
                      className="form-control form-control-md"
                    >
                      <option value="Choose">Choose...</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    <br />
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <input
                      className="form-control form-control-md"
                      type="text"
                      value={this.state.phonenumber}
                      onChange={this.phonenumberChangeHandler}
                      placeholder="Phone Number"
                    />
                    <br />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="card">
              <div className="card-body text-center">
              
                <button
                  type="button"
                  className="viewProfileButton btn btn-primary btn-lg btn-block"
                  onClick={this.onViewProfileClicked}
                >
                  View Profile
                </button>
          
              </div>
            </div>
          </div>
        </div>
        <br />
        <button type="button" onClick={this.saveChanges} className="roundcornerbutton btn btn-primary btn-lg">
          Save Changes
        </button>
        <br />
        <br /> <br />
        <br />
      </div>
      </div>
    );
  }
}

export default withRouter(Profile);
