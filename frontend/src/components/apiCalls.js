import axios from "axios";
import { toast } from "react-toastify";

export const login = async (userCredentials, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const response = await axios.post("/auth/login", userCredentials);
    localStorage.setItem("userInfo", JSON.stringify(response.data));
    toast.success("Login action was successful");
    dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
  } catch (error) {
    const data =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: "LOGIN_FAILURE",
      payload: data,
    });
    toast.error(data);
  }
};

export const register = async (userCredentials, dispatch) => {
  dispatch({ type: "REGISTER_START" });
  try {
    const response = await axios.post("auth/register", userCredentials);
    dispatch({ type: "REGISTER_SUCCESS", payload: response.data });
    localStorage.setItem("userInfo", JSON.stringify(response.data));
    toast.success("You have been registered");
  } catch (error) {
    const data =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: "REGISTER_FAILURE",
      payload: data,
    });
    toast.error(data);
  }
};

export const isUserLoggedIn = async (dispatch) => {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  console.log(user);
  try {
    if (user) {
      dispatch({ type: "IS_USER_LOGGED_IN", payload: user });
    }
  } catch (error) {
    console.log(error)
    const data =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: "LOGIN_FAILURE",
      payload: data,
    });
  }
};

export const signout = async (dispatch) => {
  localStorage.removeItem("userInfo");
  localStorage.clear();
  try {
    dispatch({ type: "AUTH_LOGOUT" });
  } catch (error) {
    const data =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: "LOGIN_FAILURE",
      payload: data,
    });
  }
};
