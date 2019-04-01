import axios from "axios";
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

export function createNewProperty(values) {
  console.log(values);
  let formData = new FormData();
  Object.keys(values).forEach(function(key) {
    if (key !== "when") {
      formData.append(key, values[key]);
    } else {
      formData.append("startDate", values[key].startDate.format("L"));
      formData.append("endDate", values[key].endDate.format("L"));
    }
  });
  formData.append("email", localStorage.getItem("username"));
  values.image.forEach(element => {
    formData.append("photos", element);
  });

  return async dispatch => {
    try {
      axios.defaults.withCredentials = true;
      axios.defaults.headers.common["Authorization"] =
        "JWT " + localStorage.getItem("user");
      var response = await axios.post(
        `${ROOT_URL}/user/createNewProperty`,
        formData
      );
      if (response.status === 200) {
        dispatch({
          type: PROP_ADD_SUCCESS,
          payload: "Property Added SuccessFully"
        });
      }
    } catch (error) {
      dispatch({
        type: PROP_ADD_ERROR,
        payload: error
      });
    }
  };
}

export function getAllPropertiesOfUser() {
  let uemail = localStorage.getItem("username");
  return async dispatch => {
    try {
      axios.defaults.withCredentials = true;
      axios.defaults.headers.common["Authorization"] =
        "JWT " + localStorage.getItem("user");
      var response = await axios.get(
        `${ROOT_URL}/user/getAllPropertiesOfUser`,
        {
          params: {
            email: uemail
          }
        }
      );
      if (response.status === 200) {
        dispatch({
          type: OWNER_PROPERTIES,
          payload: response.data.properties
        });
      }
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
      axios.defaults.withCredentials = true;
      axios.defaults.headers.common["Authorization"] =
        "JWT " + localStorage.getItem("user");
      var response = await axios.get(`${ROOT_URL}/user/getProperty`, {
        params: {
          pid: id
        }
      });
      if (response.status === 200) {
        dispatch({
          type: PROPERTY,
          payload: response.data.property
        });
      }
    } catch (error) {
      dispatch({
        type: PROPERTY_FETCH_ERROR,
        payload: error
      });
    }
  };
}
export function searchParams(data) {
        return{
          type: SEARCH_PARAMS,
          payload: data
        };
}

export function getPropertiesWhere(data) {
  if (data.where !== "") {
    return async dispatch => {
      try {
        axios.defaults.withCredentials = true;
        axios.defaults.headers.common["Authorization"] =
          "JWT " + localStorage.getItem("user");
        var response = await axios.get(
          `${ROOT_URL}/user/getAllPropertiesWhere`,
          {
            params: {
              where: data.where,
              startDate: data.startDate,
              endDate: data.endDate,
              people: data.people
            }
          }
        );
        if (response.status === 200) {

          if (response.data.filteredProperties.length === 0) {
            dispatch({
              type: SEARCH_BLANK,
              payload: "No Properties Found"
            });
          } else {
            dispatch({
              type: SEARCH_PROPERTIES,
              payload: response.data.filteredProperties
            });
          }
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
