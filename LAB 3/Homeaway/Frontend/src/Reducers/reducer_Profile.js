import {
  PROFILE_FETCHED,
  PROFILE_ERROR,

} from "../Actions/userActions";


export default function(
  state = {
  },
  action
) {
  switch (action.type) {
    case PROFILE_FETCHED:
      return { ...state, profile: action.payload, error: false };
    case PROFILE_ERROR:
      return { ...state, error: true, errorMessage: action.payload };
    default:
      return state ;
  }
}
