import {
  PROP_ADD_SUCCESS,
  PROP_ADD_ERROR
} from "../Actions/propertyActions";

export default function(
  state = {
    propertyadded: false,
    error: false,
    errorMessage: ""
  },
  action
) {
  switch (action.type) {
    case PROP_ADD_SUCCESS:
      return { ...state, propertyadded: true };
    case PROP_ADD_ERROR:
      return { ...state, error: true, errorMessage: action.payload };
    default:
      return { ...state };
  }
}
