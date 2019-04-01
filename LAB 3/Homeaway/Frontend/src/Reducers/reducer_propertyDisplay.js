import {
  PROPERTY,
  PROPERTY_FETCH_ERROR
} from "../Actions/propertyActions";

export default function(
  state = {
  },
  action
) {
  switch (action.type) {
    case PROPERTY:
      return { ...state, property: action.payload, error: false };
    case PROPERTY_FETCH_ERROR:
      return { ...state, error: true, errorMessage: action.payload };
    default:
      return { ...state };
  }
}
