import {
  AUTH_SEARCH_ACCOUNT_REQUEST,
  AUTH_SEARCH_ACCOUNT_SUCCESS,
  AUTH_SEARCH_ACCOUNT_FAIL,
  AUTH_SEARCH_ACCOUNT_RESET,

  AUTH_RESET_ACCOUNT_REQUEST,
  AUTH_RESET_ACCOUNT_SUCCESS,
  AUTH_RESET_ACCOUNT_FAIL,


  GET_AUTH_ACCOUNT_REQUEST,
  GET_AUTH_ACCOUNT_SUCCESS,
  GET_AUTH_ACCOUNT_FAIL,
} from "../../constants/authConstants";
const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        ...state,
        user: null,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
      };
    case "IS_USER_LOGGED_IN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    //register a new user
    case "REGISTER_START":
      return {
        ...state,
        user: null,
        loading: true,
        error: null,
      };
    case "REGISTER_SUCCESS":
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
      };

    case "REGISTER_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    //searched user
    case AUTH_SEARCH_ACCOUNT_REQUEST:
      return {
        ...state,
        authSearch: null,
        authSearchLoading: true,
        error: null,
      };
    case AUTH_SEARCH_ACCOUNT_SUCCESS:
      return {
        ...state,
        authSearch: action.payload,
        authSearchLoading: false,
        error: null,
      };

    case AUTH_SEARCH_ACCOUNT_FAIL:
      return {
        ...state,
        authSearchLoading: false,
        error: action.payload,
      };
    //end of searched user

    case AUTH_SEARCH_ACCOUNT_RESET:
      return {
        ...state,
        authSearch: null,
        authSearchLoading: false,
        error: null,
      };


       //CREATE REGISTRATION CODE
    case AUTH_RESET_ACCOUNT_REQUEST:
      return {
        ...state,
        authSearch: null,
        authSearchLoading: true,
        error: null,
      };
    case AUTH_RESET_ACCOUNT_SUCCESS:
      return {
        ...state,
        authSearch: action.payload,
        authSearchLoading: false,
        error: null,
      };

    case AUTH_RESET_ACCOUNT_FAIL:
      return {
        ...state,
        authSearchLoading: false,
        error: action.payload,
      };
    //END OF REGISTRATION CODE

    //auth sign out
    case "AUTH_LOGOUT":
      return {
        ...state,
        user: null,
        loading: false,
        error: null,
      };

    default:
      return state;
  }
};
export default AuthReducer;
