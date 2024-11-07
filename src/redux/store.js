import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { AuthReducer } from "./AuthReducer/Reducer";

const rootReducer = combineReducers({
  auth: AuthReducer,
});

const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

export default store;
