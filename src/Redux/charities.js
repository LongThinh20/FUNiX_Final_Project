import * as ActionTypes from "./actionTypes";

export const charities = (state = { charities: [] }, action) => {
  switch (action.type) {
    case ActionTypes.GET_CHARITY: {
      return { ...state, charities: action.payload };
    }

    default:
      return state;
  }
};
