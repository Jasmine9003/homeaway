import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import LoginReducer from "./reducer_login";
import AddPropertyReducer from "./reducer_addProperty";
import OwnerPropertyReducer from "./reducer_ownerProperties";
import PropertyDisplay from "./reducer_propertyDisplay";
import SearchPropertyReducer from "./reducer_searchProperties";
import SignUpReducer from "./reducer_signUp";
import BookingReducer from "./reducer_booking";
import ProfileReducer from "./reducer_Profile";
import TokenReducer from "./reducer_token";
import TravelMessageReducer from "./reducer_TravelMessage";
import OwnerMessageReducer from "./reducer_OwnerMessage";
import TravelerBookingsReducer from "./reducer_travelerBookings";
import OwnerBookingsReducer from "./reducer_ownerBookings";
import CurrentBookingReducer from "./reducer_currentBooking";
import SearchParamsReducer from "./reducer_searchParams";


const rootReducer = combineReducers({
  LoginReducer,
  AddPropertyReducer,
  TokenReducer,
  PropertyDisplay,
  OwnerPropertyReducer,
  SearchPropertyReducer,
  SignUpReducer,
  BookingReducer,
  ProfileReducer,
  TravelMessageReducer,
  OwnerMessageReducer,
  TravelerBookingsReducer,
  OwnerBookingsReducer,
  CurrentBookingReducer,
  SearchParamsReducer,
  form: formReducer
});
export default rootReducer;
