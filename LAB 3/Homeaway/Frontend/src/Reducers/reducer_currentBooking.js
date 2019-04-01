import {
  CURRENT_BOOKING,
  CURRENT_BOOKING_FAILURE
} from "../Actions/bookingActions";

export default function(
  state = {
    booking: null,
    error: false,
    errorMessage: ""
  },
  action
) {
  switch (action.type) {
    case CURRENT_BOOKING:
      return { ...state, booking: action.payload };
    case CURRENT_BOOKING_FAILURE:
      return { ...state,  error: true, errorMessage: action.payload };
    default:
      return { ...state };
  }
}
