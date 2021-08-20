import React, { useContext, useState } from "react";
import { register } from "../apiCalls";
import { AuthContext } from "../context/Auth/AuthContext";
import { CircularProgress } from "@material-ui/core";
import "./register.css";
import { toast, ToastContainer } from "react-toastify";
import {useHistory} from "react-router";
import { Redirect } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const history = useHistory();

  const { loading, dispatch , user } = useContext(AuthContext);
  const registerHandler = (e) => {
    e.preventDefault();
    if (!username || !password || !email || !confirmPassword) {
      toast.error("All fields are required");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    register({ username, email, password }, dispatch);
  };

  if(user){
    return <Redirect to = "/"/>
  }
  return (
    <div className="registerContainer">
      <div className="registerWrapper">
        <div className="registerLeft">
          <h4 className="registerLeftLogo">Facebook</h4>
          <span className="registerLeftDescription">
            Facebook helps you connect and share with the people in your life.
          </span>
        </div>
        <div className="registerRight">
          <form onSubmit={registerHandler} className="registerRightBox">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
              placeholder="Email Address or Phone Number"
              type="email"
              className="registerInput"
            />
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="off"
              placeholder="UserName"
              type="text"
              className="registerInput"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
              type="password"
              placeholder="Password"
              className="loginInput"
            />
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="off"
              type="password"
              placeholder="Confirm Password"
              className="loginInput"
            />
            <button type="submit" className="signUpButton">
              {loading ? (
                <CircularProgress style={{ color: "#fff" }} size="30px" />
              ) : (
                "Sign Up"
              )}
            </button>
            <span className="forgotPassword">Forgotten password?</span>
            <hr />
            <button onClick = {()=>history.push("/login")} className="registerButton">Login into Account</button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
