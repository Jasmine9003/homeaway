import axios from "axios";
import gql from "graphql-tag";
import ApolloClient from "apollo-boost";
const ROOT_URL = "http://localhost:8000";
export const PROP_ADD_SUCCESS = "property_added_successfully";
export const PROP_ADD_ERROR = "property_add_error";
export const OWNER_PROPERTIES = "owner_properties";
export const OWNER_PROPERTIES_ERROR = "owner_properties_error";
export const PROPERTY = "property";
export const PROPERTY_FETCH_ERROR = "property_fetch_error";
export const SEARCH_PROPERTIES = "search_properties";
export const SEARCH_PROPERTY_FETCH_ERROR = "search_properties_fetch_error";
export const SEARCH_BLANK = "search_blank";
export const SEARCH_PARAMS = "search_params";

const client = new ApolloClient({
  request: async operation => {
    operation.setContext({
      headers: {
        authorization: "JWT " + localStorage.getItem("user")
      }
    });
  },
  uri: `${ROOT_URL}/graphql`
});

export function getAllPropertiesOfUser() {
  let uemail = localStorage.getItem("username");
  return async dispatch => {
    try {
      var response = await client.query({
        query: gql`{
          propertiesOfOwner(email: "${uemail}") {
            headline
            city
            state
            phone
            _id
            }
          }
          `
      });
      console.log(response);
      dispatch({
        type: OWNER_PROPERTIES,
        payload: response.data.propertiesOfOwner
      });
    } catch (error) {
      dispatch({
        type: OWNER_PROPERTIES_ERROR,
        payload: error
      });
    }
  };
}


export function getProperty(id) {
  return async dispatch => {
    try {
    var response = await client.query({
      query: gql`{
        property(id: "${id}") {
          headline
          addressline1
          addressline2
          city
          state
          zip
          country
          accomodates
          bedrooms
          bathrooms
          minimumstay
          description
          phone
          baserent
          currency
          availablefrom
          availableto
        }
      }
    `
    });
        dispatch({
          type: PROPERTY,
          payload: response.data.property
        });
    
    } catch (error) {
      console.log(error);
      dispatch({
        type: PROPERTY_FETCH_ERROR,
        payload: error
      });
    }
  };
}
export function searchParams(data) {
  return {
    type: SEARCH_PARAMS,
    payload: data
  };
}

export function getPropertiesWhere(input) {
  if (input.where !== "") {
    return async dispatch => {
      try {
        var response = await client.query({
          query: gql`{
            propertiesWhere(startDate: "${input.startDate}", endDate: "${
            input.endDate
          }", where: "${input.where}", people: ${input.people}) {
             headline
             city
             state
             country
             accomodates
             bedrooms
             bathrooms
             bathrooms
             minimumstay
             baserent
             currency
             placetype
             _id
             }
           }
           `
        });
        console.log(response);
        if (response.data.propertiesWhere.length === 0) {
          dispatch({
            type: SEARCH_BLANK,
            payload: "No Properties Found"
          });
        } else {
          dispatch({
            type: SEARCH_PROPERTIES,
            payload: response.data.propertiesWhere
          });
        }
      } catch (error) {
        dispatch({
          type: SEARCH_PROPERTY_FETCH_ERROR,
          payload: error
        });
      }
    };
  } else {
    return {
      type: SEARCH_BLANK,
      payload: "No Properties Found"
    };
  }
}



