import axios from "axios";
const ROOT_URL = "http://localhost:8000";
export const MESSAGE_SUCCESS = "message_sent_successfully";
export const MESSAGE_FAILURE = "message_failure";

export const TRAVEL_MESSAGE_SUCCESS = "travel_message_sent_successfully";
export const TRAVEL_MESSAGE_FAILURE = "travel_message_failure";
export const OWNER_MESSAGE_SUCCESS = "owner_message_sent_successfully";
export const OWNER_MESSAGE_FAILURE = "owner_message_failure";


export const OWNER_REPLY_SUCCESS = "owner_reply_sent_successfully";
export const OWNER_REPLY_FAILURE = "owner_reply_failure";


export function createNewMessage(data) {
  console.log(data);
  return async dispatch => {
    try {
      axios.defaults.withCredentials = true;
      axios.defaults.headers.common["Authorization"] =
        "JWT " + localStorage.getItem("user");
      var response = await axios.post(
        `${ROOT_URL}/user/createNewMessage`,
        data
      );
      if (response.status === 200) {
        dispatch({
          type: MESSAGE_SUCCESS,
          payload: "Message Added SuccessFully"
        });
      }
    } catch (error) {
      dispatch({
        type: MESSAGE_FAILURE,
        payload: error
      });
    }
  };
}

export function getMessageTraveller(uemail) {
  return async dispatch => {
    try {
      axios.defaults.withCredentials = true;
      axios.defaults.headers.common["Authorization"] =
        "JWT " + localStorage.getItem("user");
        var response = await axios.get(
          `${ROOT_URL}/user/getMessageTraveller`,
          {
            params: {
              email: uemail
            }
          }
      );
      if (response.status === 200) {
        dispatch({
          type: TRAVEL_MESSAGE_SUCCESS,
          payload: response.data.messages
        });
      }
    } catch (error) {
      dispatch({
        type: TRAVEL_MESSAGE_FAILURE,
        payload: error
      });
    }
  };
}

export function getMessageOwner(email) {
  return async dispatch => {
    try {
      axios.defaults.withCredentials = true;
      axios.defaults.headers.common["Authorization"] =
        "JWT " + localStorage.getItem("user");
      var response = await axios.get(`${ROOT_URL}/user/getMessageOwner`, {
        params: {
          email
        }
      });
      if (response.status === 200) {
        dispatch({
          type: OWNER_MESSAGE_SUCCESS,
          payload: response.data.messages
        });
      }
    } catch (error) {
      dispatch({
        type: OWNER_MESSAGE_FAILURE,
        payload: error
      });
    }
  };
}

export function setOwnerReply(data) {
  return async dispatch => {
    try {
      axios.defaults.withCredentials = true;
      axios.defaults.headers.common["Authorization"] =
        "JWT " + localStorage.getItem("user");
      var response = await axios.post(`${ROOT_URL}/user/setOwnerReply`, data

      );
      if (response.status === 200) {
        dispatch({
          type: OWNER_REPLY_SUCCESS,
          payload: "Replied To Message Successfully"
        });
      }
    } catch (error) {
      dispatch({
        type: OWNER_REPLY_FAILURE,
        payload: error
      });
    }
  };
}
