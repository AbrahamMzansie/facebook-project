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

const PostReducer = (state, action) => {
  switch (action.type) {
    //GET ALL POSTS
    case GET_ALL_POST_REQUEST:
      return {
        ...state,
        allPosts: [],
        loading: true,
        error: null,
      };
    case GET_ALL_POST_SUCCESS:
      return {
        ...state,
        allPosts: action.payload,
        loading: false,
        error: null,
      };
    case GET_ALL_POST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    //END OF GET POSTS

    //START OF CREATE NEW POST
    case CREATE_POST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case CREATE_POST_SUCCESS:
      return {
        ...state,
        allPosts : [action.payload,...state.allPosts],
        loading: false,
        error: null,
      };
    case CREATE_POST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    //END OF CREATE NEW POST

    default:
      return state;
  }
};
export default PostReducer;
