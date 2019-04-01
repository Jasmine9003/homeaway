import {
  SEARCH_PROPERTIES,
  SEARCH_PROPERTY_FETCH_ERROR,
  SEARCH_BLANK,
} from "../Actions/propertyActions";


export default function(
  state = {
    properties: [],
    error: false,
    errorMessage: "",
  },
  action
) {
  switch (action.type) {
    case SEARCH_PROPERTIES:
      return { ...state, properties: action.payload, error: false };
    case SEARCH_PROPERTY_FETCH_ERROR:
      return { ...state, properties: [],error: true, errorMessage: action.payload };
    case SEARCH_BLANK:
      return { ...state, properties: [], error: true, errorMessage: action.payload };

    default:
      return state ;
  }
}
