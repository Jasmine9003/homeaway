import {
  TOKEN_VALID,
  TOKEN_INVALID,
  TOKEN_NOEXIST
} from "../Actions/userActions";

export default function(
  state = {},
  action
) {
  switch (action.type) {
    case TOKEN_INVALID:
    console.log("Here");

      return { ...state, validity: false, error: action.payload };
      case TOKEN_VALID:
      return { ...state, validity: true, tok: action.payload };
      case TOKEN_NOEXIST:
      return { ...state, validity: false, error: action.payload };
      default: return{...state}
  }
}
