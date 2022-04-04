import * as ActionTypes from "./actionTypes";

export const organization = (state = { organization: [] }, action) => {
  switch (action.type) {
    case ActionTypes.GET_ORGANIZATION: {
      return { ...state, organization: action.payload };
    }
    default:
      return state;
  }
};
