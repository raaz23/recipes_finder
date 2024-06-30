// Define action types
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGIN_USERDATA = "LOGIN_USERDATA";

export const UPDATE_REQUEST = 'UPDATE_REQUEST';
export const UPDATE_SUCCESS = 'UPDATE_SUCCESS';
export const UPDATE_FAILURE = 'UPDATE_FAILURE';

export const SELECT_RECIPE_REQUEST = 'SELECT_RECIPE_REQUEST';
export const SELECT_RECIPE_SUCCESS = 'SELECT_RECIPE_SUCCESS';
export const SELECT_RECIPE_FAILURE = 'SELECT_RECIPE_FAILURE';


// Action creators
export const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

export const loginSuccess = () => ({
  type: LOGIN_SUCCESS,
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const loginUserData = (userData) => ({
  type: LOGIN_USERDATA,
  payload: userData,
});

export const updateRequest = (userData) => ({
  type: UPDATE_REQUEST,
  payload: userData,
});

export const updateSuccess = (user) => ({
  type: UPDATE_SUCCESS,
  payload: user,
});

export const updateFailure = (error) => ({
  type: UPDATE_FAILURE,
  payload: error,
});


export const selectRecipeRequest = () => ({
  type: SELECT_RECIPE_REQUEST
});

export const selectRecipeSuccess = (recipe) => ({
  type: SELECT_RECIPE_SUCCESS,
  payload: recipe
});

export const selectRecipeFailure = (error) => ({
  type: SELECT_RECIPE_FAILURE,
  payload: error
});

