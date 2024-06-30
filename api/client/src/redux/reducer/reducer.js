import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_USERDATA,
  UPDATE_SUCCESS,
  UPDATE_FAILURE,
  updateRequest,
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
    case UPDATE_SUCCESS:
      console.log("UPDATE_SUCCESS action received");
      console.log("Payload:", action.payload);
      return {
        ...state,
        loginUserData: action.payload,
        error: null,
      };
      case UPDATE_FAILURE:
        return {
          ...state,
          loginLoading: false,
          loginError: action.payload,
        };
        case updateRequest:
          return {
            ...state,
            loginLoading: true,
            loginError: null,
          };
    default:
      return state;
  }
};

// selectedRecipeReducer.js
import {
  SELECT_RECIPE_REQUEST,
  SELECT_RECIPE_SUCCESS,
  SELECT_RECIPE_FAILURE
} from  "../action/action.js";

const initialState2 = {
  loading: false,
  recipe: null,
  error: null
};

export const selectedRecipeReducer = (state = initialState2, action) => {
  switch (action.type) {
    case SELECT_RECIPE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case SELECT_RECIPE_SUCCESS:
      return {
        ...state,
        loading: false,
        recipe: action.payload
      };
    case SELECT_RECIPE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

