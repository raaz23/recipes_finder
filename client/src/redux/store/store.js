import { applyMiddleware, combineReducers, createStore } from "redux";
import  {thunk}  from "redux-thunk"; // Importing thunk correctly
import { loginReducer} from "../reducer/reducer.js";
import storage from "redux-persist/lib/storage";
import  {persistReducer} from "redux-persist";

// Combine reducers if you have more than one reducer
const rootReducer = combineReducers({
  login: loginReducer,

});

const persistConfig = {
  key: "root",
  storage,
  whitelist:['login']
};


export const persistedReducer = persistReducer (persistConfig,rootReducer );

const middleware = [thunk];

// Create Redux store
const store = createStore(persistedReducer, applyMiddleware(...middleware));

export default store;
