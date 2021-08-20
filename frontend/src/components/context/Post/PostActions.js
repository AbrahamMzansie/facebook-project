import axios from "axios";
import { toast } from "react-toastify";
import {
  GET_ALL_POST_REQUEST,
  GET_ALL_POST_SUCCESS,
  GET_ALL_POST_FAIL,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAIL,
  USER_POST_REQUEST,
  USER_POST_SUCCESS,
  USER_POST_FAIL,
} from "../../constants/postConstants";

export const createPost = async (postData, data, dispatch) => {
  dispatch({ type: CREATE_POST_REQUEST });
  try {
    //upload the image first
    if (data) {
       const uploadImages = await axios.post("/upload", data);
    }
    //secondly create a new post
    
    const response = await axios.post(`/post`, postData);
    dispatch({ type: CREATE_POST_SUCCESS, payload: response.data });
    toast.success("Post created successful");
  } catch (error) {
    const data =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: CREATE_POST_FAIL,
      payload: data,
    });
    toast.error(data);
  }
};

export const retriveAllPosts = async (user, dispatch) => {
  dispatch({ type: GET_ALL_POST_REQUEST });
  try {
    const response = await axios.get(`/post/timeline/userPost/${user._id}`);
    dispatch({ type: GET_ALL_POST_SUCCESS, payload: response.data });
  } catch (error) {
    const data =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: GET_ALL_POST_FAIL,
      payload: data,
    });
    toast.error(data);
  }
};

export const retriveAllUserPosts = async (username, dispatch) => {
  dispatch({ type: GET_ALL_POST_REQUEST });
  try {
    const response = await axios.get(`/post/userPost/${username}`);
    dispatch({ type: GET_ALL_POST_SUCCESS, payload: response.data });
  } catch (error) {
    const data =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: GET_ALL_POST_FAIL,
      payload: data,
    });
    toast.error(data);
  }
};
