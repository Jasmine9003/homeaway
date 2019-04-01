import axios from "axios";
export const AUTHENTICATED = "authenticated_user";
export const UNAUTHENTICATED = "unauthenticated_user";
export const AUTHENTICATION_ERROR = "authentication_error";
export const TOKEN_VALID = "token_valid";
export const TOKEN_INVALID = "token_invalid";
export const TOKEN_NOEXIST = "token_noexist";
export const ADDED = "add_user";
export const ADDING_ERROR = "add_error";
export const PROFILE_FETCHED = "profile_user";
export const PROFILE_ERROR = "profile_error";

const ROOT_URL = "http://localhost:8000";

export function login(data) {
  return async dispatch => {
    try {
      const res = await axios.post(`${ROOT_URL}/login`, data);
      dispatch({
        type: AUTHENTICATED,
        payload: "User Logged in Sucessfully"
      });
      var base64Url = res.data.token.split(".")[1];
      var base64 = base64Url.replace("-", "+").replace("_", "/");
      var tok = JSON.parse(window.atob(base64));
      localStorage.setItem("user", res.data.token);
      localStorage.setItem("token_expiry", tok.exp);
      localStorage.setItem("username", tok.user.email);
    } catch (error) {
      dispatch({
        type: AUTHENTICATION_ERROR,
        payload: "Invalid Email or Password"
      });
    }
  };
}

export function checkValidity() {
  let expstamp = localStorage.getItem("token_expiry");
  let currentStamp = Math.floor(Date.now() / 1000);
  if (expstamp === null) {
    return {
      type: TOKEN_NOEXIST,
      payload: "Token Does not Exist"
    };
  } else {
    if (expstamp > currentStamp) {
      var base64Url = localStorage.getItem("user").split(".")[1];
      var base64 = base64Url.replace("-", "+").replace("_", "/");
      var tok = JSON.parse(window.atob(base64));
      return {
        type: TOKEN_VALID,
        payload: tok
      };
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("token_expiry");
      return {
        type: TOKEN_INVALID,
        payload: "Token has Expired"
      };
    }
  }
}

export function signUp(data) {
  return async dispatch => {
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common["Authorization"] =
      "JWT " + localStorage.getItem("user");
    await axios
      .post(`${ROOT_URL}/signup`, data)
      .then(response => {
        if (response.status === 200) {
          dispatch({
            type: ADDED,
            payload: "User Signed Up Sucessfully"
          });
        } else {
          dispatch({
            type: ADDING_ERROR,
            payload: "An Error Occoured"
          });
        }
      })
      .catch(err => {
        console.log(err);
        dispatch({
          type: ADDING_ERROR,
          payload: "An Error Occoured"
        });
      });
  };
}

// export function getUserInformation(email) {
//   return async dispatch => {
//     axios.defaults.withCredentials = true;
//     axios.defaults.headers.common["Authorization"] =
//       "JWT " + localStorage.getItem("user");
//     await axios
//       .get(`${ROOT_URL}/getUserInformation`, {
//         params: {
//           email: email
//         }
//       })
//       .then(response => {
//         if (response.status === 200) {
//           dispatch({
//             type: PROFILE_FETCHED,
//             payload: response.data
//           });
//         } else {
//           dispatch({
//             type: PROFILE_ERROR,
//             payload: "An Error Occoured"
//           });
//         }
//       })
//       .catch(err => {
//         console.log(err);
//         dispatch({
//           type: PROFILE_ERROR,
//           payload: "An Error Occoured"
//         });
//       });
//   };
// }

export function setUserInformation(data) {
  return async dispatch => {
    try {
      axios.defaults.withCredentials = true;
      axios.defaults.headers.common["Authorization"] =
        "JWT " + localStorage.getItem("user");
      var response = await axios.post(
        `${ROOT_URL}/user/setUserInformation`,
        data
      );
      if (response.status === 200) {
        dispatch({
          type: PROFILE_FETCHED,
          payload: response.data.user
        });
      }
    } catch (error) {
      dispatch({
        type: PROFILE_ERROR,
        payload: "An Error Occoured"
      });
    }
  };
}

export function getUserInformation(uemail) {
  let email=""
  if(uemail===""){
   email = localStorage.getItem("username");
  }else{
    email=uemail
  }
  console.log(email);
  return async dispatch => {
    try {
      axios.defaults.withCredentials = true;
      axios.defaults.headers.common["Authorization"] =
        "JWT " + localStorage.getItem("user");
      var response = await axios.get(`${ROOT_URL}/user/getUserInformation`, {
        params: {
          email: email
        }
      });
      if (response.status === 200) {
        dispatch({
          type: PROFILE_FETCHED,
          payload: response.data.user
        });
      }
    } catch (error) {
      dispatch({
        type: PROFILE_ERROR,
        payload: "An Error Occoured"
      });
    }
  };
}
