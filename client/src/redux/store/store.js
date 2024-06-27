import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk"; // Importing thunk correctly
import { persistedReducer } from "../reducer/reducer.js";

// Combine reducers if you have more than one reducer
const rootReducer = combineReducers({
  login: persistedReducer,
});

const middleware = [thunk];

// Create Redux store
const store = createStore(rootReducer, applyMiddleware(...middleware));

export default store;
