import { createStore, applyMiddleware, combineReducers } from "redux";
import { charity } from "./charity";
import { organization } from "./organization";
import thunk from "redux-thunk";
import logger from "redux-logger";

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({ charity: charity, organization: organization }),
    applyMiddleware(thunk, logger)
  );
  return store;
};
