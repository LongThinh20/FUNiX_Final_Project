import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

import { charities } from "./charities";
import { organization } from "./organization";
import { users } from "./users";

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({ charities, organization, users }),
    applyMiddleware(thunk, logger)
  );
  return store;
};
