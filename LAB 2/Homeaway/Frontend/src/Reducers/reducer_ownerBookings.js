import {
  OWNER_BOOKING_SUCCESS,
  OWNER_BOOKING_FAILURE
} from "../Actions/bookingActions";

export default function(
  state = {
    bookings: [],
    error: false,
    errorMessage: ""
  },
  action
) {
  switch (action.type) {
    case OWNER_BOOKING_SUCCESS:
      return { ...state, bookings: action.payload };
    case OWNER_BOOKING_FAILURE:
      return { ...state,  error: true, errorMessage: action.payload };
    default:
      return { ...state };
  }
}
