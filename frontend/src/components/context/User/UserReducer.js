import {
  GET_USER_PROFILE_REQUEST,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_FAIL,
  GET_USER_FRIENDS_REQUEST,
  GET_USER_FRIENDS_SUCCESS,
  GET_USER_FRIENDS_FAIL,
} from "../../constants/userConstants";

const UserReducer = (state, action) => {
  switch (action.type) {
    //START OF USER PROFILE
    case GET_USER_PROFILE_REQUEST:
      return {
        ...state,
        user: null,
        loading: true,
        error: null,
      };
    case GET_USER_PROFILE_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
      };

    case GET_USER_PROFILE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    //END OF USER PROFILE

    //START OF USER FRIENDS
    case GET_USER_FRIENDS_REQUEST:
      return {
        ...state,
        friends: null,
        friendsLoading: true,
        error: null,
      };
    case GET_USER_FRIENDS_SUCCESS:
      return {
        ...state,
        friendsLoading: action.payload,
        loading: false,
        error: null,
      };

    case GET_USER_FRIENDS_FAIL:
      return {
        ...state,
        friendsLoading: false,
        error: action.payload,
      };
    //END OF USER FRIENDS

    
    default:
      return state;
  }
};

export default UserReducer;
