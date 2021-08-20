import axios from "axios";
import { toast } from "react-toastify";

import {
  GET_USER_PROFILE_REQUEST,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_FAIL,
} from "../../constants/userConstants";

export const getUserProfile = async (userData, dispatch) => {
  dispatch({ type: GET_USER_PROFILE_REQUEST });
  try {
    const response = await axios.get(`/user/?username=${userData}`);
    dispatch({ type: GET_USER_PROFILE_SUCCESS, payload: response.data });
  } catch (error) {
    const data =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: GET_USER_PROFILE_FAIL,
      payload: data,
    });
    toast.error(data);
  }
};
