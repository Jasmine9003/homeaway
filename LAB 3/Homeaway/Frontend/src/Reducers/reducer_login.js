import {
  AUTHENTICATED,
  UNAUTHENTICATED,
  AUTHENTICATION_ERROR
} from "../Actions/userActions";

export default function(
  state = {
    authenticated: false,
    error: false,
    errorMessage: ""
  },
  action
) {
  switch (action.type) {
    case AUTHENTICATED:
      return { ...state, authenticated: true };
    case UNAUTHENTICATED:
      return { ...state, authenticated: false };
    case AUTHENTICATION_ERROR:
      return { ...state, error: true, errorMessage: action.payload };
    default:
      return { ...state };
  }
}
