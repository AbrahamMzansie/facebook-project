import { createContext, useReducer } from "react";
import PostReducer from "./PostReducer";

const INITIAL_STATE = {
  post: {},
  allPosts: [],
  userPosts: [],
  loading: false,
  error: null,
};
export const PostContext = createContext(INITIAL_STATE);

export const PostContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(PostReducer, INITIAL_STATE);
  return (
    <PostContext.Provider
      value={{
        post: state.post,
        allPosts: state.allPosts,
        userPosts: state.userPosts,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
