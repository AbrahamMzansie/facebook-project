import React, { useContext, useEffect, useState } from "react";
import "./login.css";
import { login } from "../apiCalls";
import { AuthContext } from "../context/Auth/AuthContext";
import { CircularProgress } from "@material-ui/core";
import { ToastContainer } from "react-toastify";

import { useHistory } from "react-router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const { loading, dispatch, user } = useContext(AuthContext);

  const loginHandler = (e) => {
    e.preventDefault();
    login({ email, password }, dispatch);
  };

 const forgotPasswordHandler = ()=>{

  }

  useEffect(() => {
    if (user) {
      history.push("/");
    }
  }, [user, history]);

  return (
    <div className="loginContainer">
      <ToastContainer />
      <div className="loginWrapper">
        <div className="loginLeft">
          <h4 className="loginLeftLogo">Facebook</h4>
          <span className="loginLeftDescription">
            Facebook helps you connect and share with the people in your life.
          </span>
        </div>
        <div className="loginRight">
          <form
            autoComplete="off"
            onSubmit={loginHandler}
            className="loginRightBox"
          >
            <input
              autoComplete="off"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address or Phone Number"
              type="email"
              className="loginInput"
            />
            <input
              autoComplete="off"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Password"
              className="loginInput"
            />
            <button className="loginButton">
              {loading ? (
                <CircularProgress style={{ color: "#fff" }} size="30px" />
              ) : (
                "Log In"
              )}
            </button>
            <span
              onClick={()=>history.push("/forgot-password-search-account")}
              className="forgotPassword"
            >
              Forgotten password?
            </span>
            <hr />
            <button
              onClick={() => history.push("/register")}
              className="loginRegsterButton"
            >
              Create New Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
