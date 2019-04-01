import {
 BOOKING_SUCCESS,
 BOOKING_FAILURE
} from "../Actions/bookingActions";

export default function(
  state = {
  },
  action
) {
  switch (action.type) {
    case BOOKING_SUCCESS:
      return { ...state, booking: action.payload, error: false };
    case BOOKING_FAILURE:
      return { ...state, error: true, errorMessage: action.payload };
    default:
      return state ;
  }
}
