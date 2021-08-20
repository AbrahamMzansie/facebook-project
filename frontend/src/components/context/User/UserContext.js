import { createContext, useReducer } from "react";
import UserReducer from "./UserReducer";

const INITIAL_STATE = {
  friends: [],
  user: {},
  allUsers: [],
  loading: false,
  friendsLoading : false,
  error: null,
};
export const UserContext = createContext(INITIAL_STATE);

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, INITIAL_STATE);
  return (
    <UserContext.Provider
      value={{        
        user: state.user,
        allUsers: state.allUsers,
        friends: state.friends,
        friendsLoading : state.friendsLoading,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
