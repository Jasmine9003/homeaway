import {
  MESSAGE_FAILURE,
  MESSAGE_SUCCESS
} from "../Actions/messagingActions";

export default function(
  state = {
    messageadded: false,
    error: false,
    errorMessage: ""
  },
  action
) {
  switch (action.type) {
    case MESSAGE_SUCCESS:
      return { ...state, messageadded: true };
    case MESSAGE_FAILURE:
      return { ...state, messageadded:false, error: true, errorMessage: action.payload };
    default:
      return { ...state };
  }
}
