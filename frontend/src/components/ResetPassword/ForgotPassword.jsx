import "./forgotPassword.css";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/Auth/AuthContext";
import { login } from "../apiCalls";
import { CircularProgress } from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import {
  findAuthAccountById,
  createPasswordResetCode,
} from "../context/Auth/AuthActions";

const ForgotPassword = (props) => {
  const { userId, searchType } = props.match.params;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [resetByPhone, setResetByPhone] = useState("");
  const [resetByEmail, setResetByEmail] = useState("");
  const [phoneChecked, setPhoneChecked] = useState(
    searchType === "phone" ? true : false
  );
  const [emailChecked, setEmailChecked] = useState(
    searchType === "email" ? true : false
  );
  const history = useHistory();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const { loading, error, authSearch, authSearchLoading, dispatch } =
    useContext(AuthContext);

  useEffect(() => {
    findAuthAccountById(userId, dispatch);
  }, [userId, dispatch]);

  const loginHandler = (e) => {
    e.preventDefault();
    login({ email, password }, dispatch);
  };

  const continueHandler = () => {
    if (emailChecked || phoneChecked) {
      createPasswordResetCode({ userId, searchType },history , dispatch);
    } else {
      toast.error("Select phone number or email");
      return;
    }
  };

  const notYouHandler = () => {
    history.push("/forgot-password-search-account");
  };

  return (
    <>
      <div className="forgotPasswordContainer">
        <ToastContainer />
        <div className="forgotPasswordTopBar">
          <div className="forgotPasswordTopBarWrapper">
            <div className="forgotPasswordTopBarLeft">
              <Link style={{ textDecoration: "none" }} to="/">
                <h4 className="forgotPasswordTopBarLogo">Facebook</h4>
              </Link>
            </div>
            <form
              onSubmit={loginHandler}
              autoComplete="new-password"
              className="forgotPasswordTopBarRight"
            >
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                autoComplete="none"
                name="email"
                required
                placeholder="Email Or Phone"
                type="email"
                className="forgotPasswordInput"
              />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                name="password"
                required
                placeholder="Password"
                type="password"
                className="forgotPasswordInput"
              />
              <button
                style={{ cursor: loading ? "not-allowed" : "pointer" }}
                disabled={loading}
                className="forgotPasswordButtonLogin"
              >
                {loading ? (
                  <CircularProgress style={{ color: "#fff" }} size="20px" />
                ) : (
                  "Log In"
                )}
              </button>
              <span className="forgotPasswordLink">Forgotten account?</span>
            </form>
          </div>
        </div>

        <div className="forgotPasswordBox">
          <div className="forgotPasswordBoxContainer">
            <div className="forgotPasswordBoxTop">
              <h2 className="forgotPasswordBoxTopTitle">Reset Your Password</h2>
            </div>

            <div className="forgotPasswordBoxCenterWrapper">
              {authSearchLoading ? (
                <CircularProgress
                  style={{ margin: "20px auto", color: "#1877f2" }}
                  size="50px"
                />
              ) : (
                <div className="forgotPasswordBoxCenter">
                  <div className="forgotPasswordBoxCenterLeft">
                    <p className="forgotPasswordBoxCenterLeftTitle">
                      How do you want to receive the code to reset your
                      password?
                    </p>
                    <div className="forgotPasswordBoxCenterLeftEmail">
                      <input
                        checked={emailChecked}
                        value={resetByEmail}
                        onChange={(e) => {
                          setResetByEmail(e.target.value);
                          setPhoneChecked(false);
                          setEmailChecked(true);
                        }}
                        className="forgotPasswordBoxCenterLeftChoice"
                        type="radio"
                        id="email"
                        name="reset_type"
                      />
                      <label for="html">
                        Send code via email: {authSearch && authSearch.email}
                      </label>
                    </div>
                    <div className="forgotPasswordBoxCenterLeftEmail">
                      <input
                        checked={phoneChecked}
                        value={resetByPhone}
                        onChange={(e) => {
                          setResetByPhone(e.target.value);
                          setEmailChecked(false);
                          setPhoneChecked(true);
                        }}
                        className="forgotPasswordBoxCenterLeftChoice"
                        type="radio"
                        id="phone"
                        name="reset_type"
                      />
                       {" "}
                      <label for="html">
                        Send code via SMS {authSearch && authSearch.phone}
                      </label>
                    </div>
                  </div>
                  <div className="forgotPasswordBoxCenterRight">
                    <img
                      src={PF + "person/noAvatar.png"}
                      alt=""
                      className="forgotPasswordBoxCenterRightUserProfile"
                    />

                    <span className="forgotPasswordBoxCenterRightUserName">
                      {authSearch && authSearch.username}
                    </span>
                    <span className="forgotPasswordBoxCenterRightContact">
                      Facebook User
                    </span>
                  </div>
                </div>
              )}

              <div className="forgotPasswordBoxBottom">
                <div className="forgotPasswordBoxBottomLeft">
                  <span className="forgotPasswordBoxBottomLeftTitle">
                    No longer have access to these?
                  </span>
                </div>
                <div className="forgotPasswordBoxBottomRight">
                  <button
                    onClick={notYouHandler}
                    className="forgotPasswordBoxBottomRightButton"
                  >
                    Not You?
                  </button>
                  <button
                    style={{cursor: authSearchLoading ? "not-allowed" : "pointer" ,  }}
                    onClick={continueHandler}
                    className="forgotPasswordBoxBottomRightButton forgotPasswordBoxBottomRightButtonContinue"
                  >
                    Continue
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

export default ForgotPassword;
