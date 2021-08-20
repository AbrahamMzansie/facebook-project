import "./choosePassword.css";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/Auth/AuthContext";
import { CircularProgress } from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import {
  findAuthAccountById,
  createNewPassword,
} from "../context/Auth/AuthActions";

const ChoosePassword = (props) => {
  const { userId, searchType, regCode } = props.match.params;

  const [newPassword, setNewPassword] = useState("");

  const history = useHistory();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const { error, authSearch, authSearchLoading, dispatch } =
    useContext(AuthContext);

  useEffect(() => {
    findAuthAccountById(userId, dispatch);
  }, [userId, dispatch]);

  const chooseNewPasswordHandler = () => {
    if (newPassword) {
      createNewPassword({ userId, newPassword }, history, dispatch);
    } else {
      toast.error("Please enter your new password");
      return;
    }
  };

  const notYouHandler = () => {
    history.push("/forgot-password-search-account");
  };

  return (
    <>
      <div className="choosePasswordContainer">
        <ToastContainer />
        <div className="choosePasswordTopBar">
          <div className="choosePasswordTopBarWrapper">
            <div className="choosePasswordTopBarLeft">
              <Link style={{ textDecoration: "none" }} to="/">
                <h4 className="choosePasswordTopBarLogo">Facebook</h4>
              </Link>
            </div>
          </div>
        </div>
        <div className="choosePasswordBox">
          <div className="choosePasswordBoxContainer">
            <div className="choosePasswordBoxTop">
              <h2 className="choosePasswordBoxTopTitle">
                Choose a new password
              </h2>
            </div>
            <div className="choosePasswordBoxCenterWrapper">
              {authSearchLoading ? (
                <CircularProgress
                  style={{ margin: "20px auto", color: "#1877f2" }}
                  size="50px"
                />
              ) : (
                <div className="choosePasswordBoxCenter">
                  <div className="choosePasswordBoxCenterLeft">
                    <p className="choosePasswordBoxCenterLeftTitle">
                      Create a new password that is at least 6 characters long.
                      A strong password has a combination of letters, digits and
                      punctuation marks.
                    </p>
                    <div className="choosePasswordBoxCenterLeftCode">
                      <input
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeHolder="new password"
                        type="password"
                        className="choosePasswordBoxCenterLeftCodeInput"
                      />
                      <div className="choosePasswordBoxCenterRight">
                        <span className="choosePasswordBoxCenterRightTitle"></span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="choosePasswordBoxBottom">
                <div className="choosePasswordBoxBottomLeft"></div>
                <div className="choosePasswordBoxBottomRight">
                  <button
                    style={{
                      cursor: authSearchLoading ? "not-allowed" : "pointer",
                    }}
                    onClick={notYouHandler}
                    className="choosePasswordBoxBottomRightButton"
                  >
                    Cancel
                  </button>
                  <button
                    style={{
                      cursor: authSearchLoading ? "not-allowed" : "pointer",
                    }}
                    onClick={chooseNewPasswordHandler}
                    className="choosePasswordBoxBottomRightButton choosePasswordBoxBottomRightButtonContinue"
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

export default ChoosePassword;
