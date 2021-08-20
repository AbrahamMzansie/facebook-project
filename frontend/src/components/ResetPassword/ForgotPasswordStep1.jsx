import "./forgotPasswordStep1.css";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/Auth/AuthContext";
import { searchAccount} from "../context/Auth/AuthActions";
import { ToastContainer, toast } from "react-toastify";
import { CircularProgress } from "@material-ui/core";
import { login } from "../apiCalls";

const ForgotPasswordStep1 = () => {
  const history = useHistory();
  const { loading, dispatch, error, authSearch, authSearchLoading} =
    useContext(AuthContext);
  const [phoneOrEmail, setPhoneOrEmail] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const searchAccountHandler = (e) => {
    e.preventDefault();
    if (!phoneOrEmail) {
      toast.error("Enter phone number or email");
      return;
    }
    searchAccount({ phoneOrEmail },history, dispatch);
  };

  const loginHandler = () => {
    login({ email, password }, dispatch);
  };
/*
  useEffect(() => {
 //   resetSearchAccount(dispatch);
    console.log(authSearch, success);
    if (authSearch && success) {
      history.push(`/forgot-password/${authSearch.searchType}`);
    }
  }, [authSearch, history, success]);
  */
  return (
    <>
      <div className="forgotPasswordStep1Container">
        <ToastContainer />
        <div className="forgotPasswordStep1TopBar">
          <div className="forgotPasswordStep1TopBarWrapper">
            <div className="forgotPasswordStep1TopBarLeft">
              <Link style={{ textDecoration: "none" }} to="/">
                <h4 className="forgotPasswordStep1TopBarLogo">Facebook</h4>
              </Link>
            </div>
            <div
              autoComplete="new-password"
              className="forgotPasswordStep1TopBarRight"
            >
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="none"
                name="email"
                required
                placeholder="Email Or Phone"
                type="email"
                className="forgotPasswordStep1Input"
              />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                name="password"
                required
                placeholder="Password"
                type="password"
                className="forgotPasswordStep1Input"
              />
              <button
                style={{ cursor: loading ? "not-allowed" : "pointer" }}
                onClick={loginHandler}
                className="forgotPasswordStep1ButtonLogin"
              >
                {loading ? (
                  <CircularProgress style={{ color: "#fff" }} size="20px" />
                ) : (
                  "Login In"
                )}
              </button>
              <span className="forgotPasswordStep1Link">
                Forgotten account?
              </span>
            </div>
          </div>
        </div>
        <div className="forgotPasswordStep1Box">
          <div className="forgotPasswordStep1BoxContainer">
            <div className="forgotPasswordStep1BoxTop">
              <h2 className="forgotPasswordStep1BoxTopTitle">
                Find Your Account
              </h2>
            </div>
            <div className="forgotPasswordStep1BoxCenterWrapper">
              <div className="forgotPasswordStep1BoxCenter">
                <div className="forgotPasswordStep1BoxCenterLeft">
                  <p className="forgotPasswordStep1BoxCenterLeftTitle">
                    Please enter your email address or mobile number to search
                    for your account.
                  </p>
                  <div className="forgotPasswordStep1BoxCenterLeftEmail">
                    <input
                      value={phoneOrEmail}
                      onChange={(e) => setPhoneOrEmail(e.target.value)}
                      className="forgotPasswordStep1BoxCenterLeftInput"
                      type="text"
                      placeholder="Phone or Email"
                    />
                  </div>
                </div>
              </div>
              <div className="forgotPasswordStep1BoxBottom">
                <div className="forgotPasswordStep1BoxBottomLeft">
                  <span
                    style={{ display: "none" }}
                    className="forgotPasswordStep1BoxBottomLeftTitle"
                  >
                    No longer have access to these?
                  </span>
                </div>
                <div className="forgotPasswordStep1BoxBottomRight">
                  <button
                    onClick={() => history.push("/login")}
                    className="forgotPasswordStep1BoxBottomRightButton"
                  >
                    Cancel
                  </button>
                  <button
                    style={{
                      cursor: authSearchLoading ? "not-allowed" : "pointer",
                    }}
                    onClick={(e) => searchAccountHandler(e)}
                    className="forgotPasswordStep1BoxBottomRightButton forgotPasswordStep1BoxBottomRightButtonContinue"
                  >
                    {authSearchLoading ? (
                      <CircularProgress style={{ color: "#fff" }} size="20px" />
                    ) : (
                      "Search"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordStep1;
