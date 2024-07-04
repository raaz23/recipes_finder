import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_USERDATA,

} from "../action/action.js";

const initialState1 = {
  loginUserData: null,
  loginSuccess: false,
  loginLoading: false,
  loginError: null,
};

export const loginReducer = (state = initialState1, action) => {
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
