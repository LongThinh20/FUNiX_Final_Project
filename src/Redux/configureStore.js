import { createStore, applyMiddleware, combineReducers } from "redux";
import { charities } from "./charities";
import { organization } from "./organization";
import thunk from "redux-thunk";
import logger from "redux-logger";

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({ charities: charities, organization: organization }),
    applyMiddleware(thunk, logger)
  );
  return store;
};
