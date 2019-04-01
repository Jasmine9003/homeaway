import React, { Component } from "react";
import "react-dates/initialize";
import { withRouter } from "react-router-dom";
import { getMessageTraveller } from "../../../Actions/messagingActions";
import { checkValidity } from "../../../Actions/userActions";

import { connect } from "react-redux";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class TravelMessageHeader extends Component {
  componentWillMount() {
    this.props.checkValidity();
    this.props
      .getMessageTraveller(localStorage.getItem("username"))
      .then(() => {
        console.log("Messages Recieved");
      });
  }

  render() {
    let messages = null;
    if (this.props.travelMessages.messages.length !== 0) {
      messages = this.props.travelMessages.messages.map(message => {
        let time = moment(message.sent).format("MM/DD/YYYY h:mm a");
        return (
          <div key={message._id}>
            <div className="card shadow-lg text-left">
              <div className="card-body">
                <small>Sent @ {time}</small>
                <br />
                <h4 className="card-title">{message.subject}</h4>
                <p className="card-text">{message.message}</p>
                <hr />
                {message.reply ? (
                  <p>
                    <b>Reply:&nbsp;&nbsp;</b>
                    {message.reply}
                  </p>
                ) : (
                  <p>Owner Hasn't Replied</p>
                )}
              </div>
            </div>
            <br />
            <br />
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
    travelMessages: state.TravelMessageReducer,
    tokenState: state.TokenReducer
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    { getMessageTraveller, checkValidity }
  )(TravelMessageHeader)
);
