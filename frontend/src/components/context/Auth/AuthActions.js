import axios from "axios";
import { toast } from "react-toastify";

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

export const searchAccount = async (userData, router, dispatch) => {
  dispatch({ type: AUTH_SEARCH_ACCOUNT_REQUEST });
  try {
    const response = await axios.post("/auth/search-account", userData);
    dispatch({ type: AUTH_SEARCH_ACCOUNT_SUCCESS, payload: response.data });
    router.push(
      `/forgot-password/${response.data.searchType}/${response.data._id}`
    );
  } catch (error) {
    const data =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: AUTH_SEARCH_ACCOUNT_FAIL,
      payload: data,
    });
    toast.error(data);
  }
};

export const resetSearchAccount = (dispatch) => {
  try {
    dispatch({ type: AUTH_SEARCH_ACCOUNT_RESET });
  } catch (error) {
    const data =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: AUTH_SEARCH_ACCOUNT_FAIL,
      payload: data,
    });
    toast.error(data);
  }
};

export const findAuthAccountById = async (authData, dispatch) => {
  dispatch({ type: AUTH_SEARCH_ACCOUNT_REQUEST });
  try {
    const response = await axios.get(`/user/?userId=${authData}`);
    dispatch({ type: AUTH_SEARCH_ACCOUNT_SUCCESS, payload: response.data });
  } catch (error) {
    const data =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: AUTH_SEARCH_ACCOUNT_FAIL,
      payload: data,
    });
    toast.error(data);
  }
};

export const createPasswordResetCode = async (authData, router, dispatch) => {
  dispatch({ type: AUTH_RESET_ACCOUNT_REQUEST });
  try {
    const response = await axios.put(
      `/auth/forgot-password/${authData.searchType}/${authData.userId}`,
      authData
    );
    dispatch({ type: AUTH_RESET_ACCOUNT_SUCCESS, payload: response.data });
    const { searchType, _id } = response.data;
    router.push(`/forgot-password-security-code/${searchType}/${_id}`);
  } catch (error) {
    const data =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: AUTH_RESET_ACCOUNT_FAIL,
      payload: data,
    });
    toast.error(data);
  }
};

export const verifyRegistrationCode = async (authData, router, dispatch) => {
  dispatch({ type: AUTH_RESET_ACCOUNT_REQUEST });
  try {
    const response = await axios.post(
      `/auth/forgot-password-verify-code`,
      authData
    );
    dispatch({ type: AUTH_RESET_ACCOUNT_SUCCESS, payload: response.data });
    const {_id } = response.data;
    router.push(`/forgot-password-new-password/${_id}`);
  } catch (error) {
    const data =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: AUTH_RESET_ACCOUNT_FAIL,
      payload: data,
    });
    toast.error(data);
  }
};

export const createNewPassword = async (authData, router, dispatch) => {
  dispatch({ type: AUTH_RESET_ACCOUNT_REQUEST });
  try {
    const response = await axios.post(
      `/auth/new-password`,
      authData
    );
    dispatch({ type: AUTH_RESET_ACCOUNT_SUCCESS, payload: response.data });
    router.push("/");
  } catch (error) {
    const data =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: AUTH_RESET_ACCOUNT_FAIL,
      payload: data,
    });
    toast.error(data);
  }
};

export const loginStart = (userCredentials) => ({
  type: "LOGIN_START",
});

export const loginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});

export const loginFailure = (error) => ({
  type: "LOGIN_FAILURE",
  payload: error,
});

export const registerStart = (userCredentials) => ({
  type: "REGISTER_START",
});

export const registerSuccess = (user) => ({
  type: "REGISTER_SUCCESS",
  payload: user,
});

export const registerFailure = (error) => ({
  type: "REGISTER_FAILURE",
  payload: error,
});

export const authLogout = (userCredentials) => ({
  type: "AUTH_LOGOUT",
});
