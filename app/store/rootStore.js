/**
 *store配置
 */
"use strict";
import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import rootReducer from "./rootReducers";

// import { middleware } from "../utils/navigationReduxUtils";
const isDebuggingInChrome = false;

const logger = createLogger({
  predicate: (getState, action) => isDebuggingInChrome,
  collapsed: true,
  duration: true
});

let middleWares = [thunk];

if (process.env.NODE_ENV === "development") {
  middleWares = [...middleWares, logger];
}

const middleWareStore = applyMiddleware(...middleWares)(createStore);

export default function configureStore(initState: Object) {
  const store = middleWareStore(rootReducer, initState);
  if (isDebuggingInChrome) {
    window.store = store;
  }
  return store;
}
