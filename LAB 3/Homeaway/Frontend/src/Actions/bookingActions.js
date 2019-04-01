import axios from "axios";
import gql from "graphql-tag";
import ApolloClient from "apollo-boost";

const ROOT_URL = "http://localhost:8000";

export const BOOKING_SUCCESS = "booking_added_successfully";
export const BOOKING_FAILURE = "booking_add_error";

export const TRAVELLER_BOOKING_SUCCESS = "traveller_booking_success";
export const TRAVELLERE_BOOKING_FAILURE = "traveller_booking_error";

export const OWNER_BOOKING_SUCCESS = "owner_booking_success";
export const OWNER_BOOKING_FAILURE = "owner_booking_error";

export const CURRENT_BOOKING = "current_booking";
export const CURRENT_BOOKING_FAILURE = "current_booking";

const client = new ApolloClient({
  request: async operation => {
    operation.setContext({
      headers: {
        authorization:  "JWT " + localStorage.getItem("user")
      }
    });
  },
  uri: `${ROOT_URL}/graphql`
});




export function createNewBooking(data) {
  console.log(data);
  return async dispatch => {
    try {
      var response = await client.mutate({
        mutation: gql`
          mutation {
            addBooking(
              bookingfrom: "${data.bookingfrom}",
              bookingto: "${data.bookingto}",
              travelleremail: "${data.travelleremail}",
              propertyowneremail: "${data.propertyowneremail}",
              propertyid: "${data.propertyid}",
              nights: ${data.nights},
              cost: ${data.cost},
              city: "${data.city}",
              currency: "${data.currency}",
              propertyname: "${data.propertyname}"
            ) {
              bookingfrom
              bookingto
              travelleremail
              propertyowneremail
              propertyid
              cost
              city
              currency
              propertyname

            }
          }
        `
      });
      console.log(response);
        dispatch({
          type: BOOKING_SUCCESS,
          payload: "Booking Added SuccessFully"
        });
      
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
      var response = await client.query({
        query: gql`{
            travellerBookings(email: "${uemail}") {
                bookingfrom
                bookingto
                city
                propertyname
                cost
                currency
                propertyid
                _id
              }
            }
            `
      });
      dispatch({
        type: TRAVELLER_BOOKING_SUCCESS,
        payload: response.data.travellerBookings
      });
    } catch (error) {
      dispatch({
        type: TRAVELLERE_BOOKING_FAILURE,
        payload: error
      });
    }
  };
}

export function getOwnerBookings(uemail) {
  console.log("getOwnerBookings");
  return async dispatch => {
    try {
      var response = await client.query({
        query: gql`{
            ownerBookings(email: "${uemail}") {
              bookingfrom
              bookingto
              city
              propertyname
              cost
              currency
              propertyid
              _id
            }
          }
          `
      });
      console.log(response);
      dispatch({
        type: OWNER_BOOKING_SUCCESS,
        payload: response.data.ownerBookings
      });
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
      var response = await client.query({
        query: gql`{
          booking(id: "${bid}") {
              bookingfrom
              bookingto
              city
              propertyname
              cost
              currency
              propertyid
              _id
            }
          }
          `
      });
        dispatch({
          type: CURRENT_BOOKING,
          payload: response.data.booking
        });
      
    } catch (error) {
      dispatch({
        type: CURRENT_BOOKING_FAILURE,
        payload: error
      });
    }
  };
}


