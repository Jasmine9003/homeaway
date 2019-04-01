import React, { Component } from "react";
import "react-dates/initialize";
import { withRouter } from "react-router-dom";
import {
  getMessageOwner,
  setOwnerReply
} from "../../../Actions/messagingActions";
import { checkValidity } from "../../../Actions/userActions";

import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
class OwnerMessageHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reply: "",
      mid:""
    };
  }

  componentWillMount() {
    this.props.checkValidity();
    this.props.getMessageOwner(localStorage.getItem("username")).then(() => {
      console.log("Messages Recieved");
    });
  }

  replyChangeHandler = e => {
    this.setState({
      reply: e.target.value
    });
  };
  midChangeHandler = e => {
    this.setState({
      mid: e.target.value
    });
  };

  render() {
    let messages = null;
    if (this.props.ownerMessages.messages.length !== 0) {
      messages = this.props.ownerMessages.messages.map(message => {
        let time = moment(message.sent).format("MM/DD/YYYY h:mm a");

        return (
          <div key={message._id} className="text-left">
            <div className="card shadow-lg">
              <div className="card-body">
                <small>Message From: {message.sender}</small>
                <br />
                <small>Recieved @ {time}</small>

                <br />
                <br />
                <h4 className="card-title">{message.subject}</h4>
                <p className="card-text">{message.message}</p>
                {message.reply ? (
                  <small className="text-success">
                    You have Already Replied to this Message
                  </small>
                ) : (
                  <small className="text-danger">
                    You have not replied to this Message
                  </small>
                )}

                <br />

                <a
                  className="btn btn-primary text-white"
                  data-toggle="modal"
                  onClick={()=>{
                    this.setState({
                      mid:message._id
                    })
                  }}
                  data-target="#MessageModal">
                  <FontAwesomeIcon icon="envelope" />
                  &nbsp;&nbsp;&nbsp;Send Reply
                </a>
              </div>
            </div>
            <br />
            <br />

            <div
              className="modal fade bd-example-modal-lg"
              id="MessageModal"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="myLargeModalLabel"
              aria-hidden="true">
              <div className="modal-dialog modal-lg">
                <div className="modal-content">
                  <br />
                  <br />
                  <br />
                  <div className="container" style={{ padding: "5%" }}>
                    <form>
                      <div className="form-group">
                        <label htmlFor="Subject">Subject</label>
                        <input
                          type="text"
                          className="form-control"
                          disabled="disabled"
                          value={"Re: " + message.subject}
                          onChange={this.subjectChangeHandler}
                          placeholder="Enter Subject"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="message">Message</label>
                        <textarea
                          className="form-control"
                          rows="8"
                          value={this.state.reply}
                          onChange={this.replyChangeHandler}
                          placeholder="Type What you want to Reply to the Traveller"
                        />
                      </div>

                      <button
                        type="button"
                        data-dismiss="modal"
                        onClick={() => {
                         
                          if (this.state.reply === "") {
                            alert("Reply Can't be left Empty");
                          } else {
                            let  data = {
                              reply: this.state.reply,
                              mid: this.state.mid
                            };
                            console.log(data);
                            this.props.setOwnerReply(data).then(() => {
                              alert("Reply Sent Successfully!");
                              this.setState({
                                reply: ""
                              });
                            });
                          }
                        }}
                        className="btn btn-primary">
                        Send
                      </button>
                    </form>
                    <br />
                    <br />
                    <br />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      });
    } else {
      messages = (
        <h3>
          <FontAwesomeIcon icon="envelope" /> No Messages
        </h3>
      );
    }
    return (
      <div className="container">
        <br />
        <br />
        <br />
        <div className="row text-center">
          <div className="col-10 offset-1  ">{messages}</div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    ownerMessages: state.OwnerMessageReducer,
    tokenState: state.TokenReducer
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    { getMessageOwner, setOwnerReply, checkValidity }
  )(OwnerMessageHeader)
);
