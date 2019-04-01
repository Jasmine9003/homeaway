import {
  TRAVEL_MESSAGE_SUCCESS,
  TRAVEL_MESSAGE_FAILURE
} from "../Actions/messagingActions";

export default function(
  state = {
    messages: [],
    error: false,
    errorMessage: ""
  },
  action
) {
  switch (action.type) {
    case TRAVEL_MESSAGE_SUCCESS:
      return { ...state, messages: action.payload };
    case TRAVEL_MESSAGE_FAILURE:
      return { ...state,  error: true, errorMessage: action.payload };
    default:
      return { ...state };
  }
}
