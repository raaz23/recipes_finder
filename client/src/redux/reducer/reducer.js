import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_USERDATA,
} from "../action/action.js";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const initialState = {
  loginUserData: null,
  loginSuccess: false,
  loginLoading: false,
  loginError: null,
};


const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loginLoading: true,
        loginError: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loginSuccess: true,
        loginLoading: false,
        loginError: null,
      };
    case LOGIN_USERDATA:
      return {
        ...state,
        loginUserData: action.payload,
        loginSuccess: true,
        loginLoading: false,
        loginError: null,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loginLoading: false,
        loginError: action.payload,
      };
    default:
      return state;
  }
};

const persistConfig = {
  key: "root",
  storage,
};

export const persistedReducer = persistReducer(persistConfig, loginReducer);
