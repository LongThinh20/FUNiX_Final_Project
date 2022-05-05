import * as ActionTypes from "./actionTypes";

export const users = (state = { users: [], currentUser: null }, action) => {
  switch (action.type) {
    case ActionTypes.GET_USERS: {
      return { ...state, users: action.payload };
    }

    case ActionTypes.CURRENT_USER: {
      return { ...state, currentUser: action.payload };
    }

    case ActionTypes.LOGOUT_USER: {
      return { ...state, currentUser: null };
    }

    default:
      return state;
  }
};
