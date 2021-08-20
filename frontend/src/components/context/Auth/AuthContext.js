import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
  user: null,
  loading: false,
  error: null,
  authSearch: null,
  authSearchLoading : false,
  success : false,
};
export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  return (
    <AuthContext.Provider
      value={{
        authSearch: state.authSearch,
        user: state.user,
        loading: state.loading,
        error: state.error,
        authSearchLoading : state.authSearchLoading,
        success : state.success,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
