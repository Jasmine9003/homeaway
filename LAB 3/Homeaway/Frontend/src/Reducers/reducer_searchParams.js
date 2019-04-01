import { SEARCH_PARAMS } from "../Actions/propertyActions";

export default function(
  state = {
    // data: {
    //   where: null,
    //   when: {
    //     startDate: null,
    //     endDate: null
    //   },
    //   people: null
    // }
  },
  action
) {
  switch (action.type) {
    case SEARCH_PARAMS:
      return { ...state, data: action.payload };

    default:
      return state;
  }
}
