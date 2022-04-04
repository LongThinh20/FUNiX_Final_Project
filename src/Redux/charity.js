import * as ActionTypes from "./actionTypes";

export const charity = (state = { charity: [] }, action) => {
  switch (action.type) {
    case ActionTypes.GET_CHARITY: {
      return { ...state, charity: action.payload };
    }

    default:
      return state;
  }
};
