import {
  ADDED,
  ADDING_ERROR,
} from "../Actions/userActions";

export default function(
  state = {
    added: false,
    error: false,
    errorMessage: ""
  },
  action
) {
  switch (action.type) {
    case ADDED:
      return { ...state, added: true };
    case ADDING_ERROR:
      return { ...state, error: true, errorMessage: action.payload };
    default:
      return { ...state };
  }
}
