import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthContextProvider } from "./components/context/Auth/AuthContext";
import { PostContextProvider } from "./components//context/Post/PostContext";
import { UserContextProvider } from "./components/context/User/UserContext";

ReactDOM.render(
  <React.StrictMode>
    <UserContextProvider>
      <PostContextProvider>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </PostContextProvider>
    </UserContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
