import {
  OWNER_PROPERTIES,
  OWNER_PROPERTIES_ERROR
} from "../Actions/propertyActions";

export default function(
  state = {
    properties: [],
    error:false,
    errorMessage:""
  },
  action
) {
  switch (action.type) {
    case OWNER_PROPERTIES:
      return { ...state, properties: action.payload, error: false };
    case OWNER_PROPERTIES_ERROR:
      return { ...state, error: true, errorMessage: action.payload };
    default:
      return { ...state };
  }
}
