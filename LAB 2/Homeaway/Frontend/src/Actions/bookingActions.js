import axios from "axios";
const ROOT_URL = "http://localhost:8000";
export const BOOKING_SUCCESS = "booking_added_successfully";
export const BOOKING_FAILURE = "booking_add_error";

export const TRAVELLER_BOOKING_SUCCESS = "traveller_booking_success";
export const TRAVELLERE_BOOKING_FAILURE = "traveller_booking_error";

export const OWNER_BOOKING_SUCCESS = "owner_booking_success";
export const OWNER_BOOKING_FAILURE = "owner_booking_error";

export const CURRENT_BOOKING = "current_booking";
export const CURRENT_BOOKING_FAILURE = "current_booking";

export function createNewBooking(data) {
  console.log(data);
  return async dispatch => {
    try {
      axios.defaults.withCredentials = true;
      axios.defaults.headers.common["Authorization"] =
        "JWT " + localStorage.getItem("user");
      var response = await axios.post(
        `${ROOT_URL}/user/createNewBooking`,
        data
      );
      if (response.status === 200) {
        dispatch({
          type: BOOKING_SUCCESS,
          payload: "Booking Added SuccessFully"
        });
      }
    } catch (error) {
      dispatch({
        type: BOOKING_FAILURE,
        payload: error
      });
    }
  };
}

export function getTravellerBookings(uemail) {
  console.log("getTravellerBookings");
  return async dispatch => {
    try {
      axios.defaults.withCredentials = true;
      axios.defaults.headers.common["Authorization"] =
        "JWT " + localStorage.getItem("user");
      var response = await axios.get(`${ROOT_URL}/user/getTravellerBookings`, {
        params: {
          email: uemail
        }
      });
      if (response.status === 200) {
        dispatch({
          type: TRAVELLER_BOOKING_SUCCESS,
          payload: response.data.bookings
        });
      }
    } catch (error) {
      dispatch({
        type: TRAVELLERE_BOOKING_FAILURE,
        payload: error
      });
    }
  };
}


export function getOwnerBookings(uemail) {
  console.log("getTravellerBookings");
  return async dispatch => {
    try {
      axios.defaults.withCredentials = true;
      axios.defaults.headers.common["Authorization"] =
        "JWT " + localStorage.getItem("user");
      var response = await axios.get(`${ROOT_URL}/user/getOwnerBookings`, {
        params: {
          email: uemail
        }
      });
      if (response.status === 200) {
        dispatch({
          type: OWNER_BOOKING_SUCCESS,
          payload: response.data.bookings
        });
      }
    } catch (error) {
      dispatch({
        type: OWNER_BOOKING_FAILURE,
        payload: error
      });
    }
  };
}

export function getBooking(bid) {
  return async dispatch => {
    try {
      axios.defaults.withCredentials = true;
      axios.defaults.headers.common["Authorization"] =
        "JWT " + localStorage.getItem("user");
      var response = await axios.get(`${ROOT_URL}/user/getBooking`, {
        params: {
          bid: bid
        }
      });
      if (response.status === 200) {
        dispatch({
          type: CURRENT_BOOKING,
          payload: response.data.booking
        });
      }
    } catch (error) {
      dispatch({
        type: CURRENT_BOOKING_FAILURE,
        payload: error
      });
    }
  };
}



