import "./securityCode.css";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/Auth/AuthContext";
import { login } from "../apiCalls";
import { CircularProgress } from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import {
  findAuthAccountById,
  verifyRegistrationCode,
} from "../context/Auth/AuthActions";

const SecurityCode = (props) => {
  const { userId} = props.match.params;

  const [reg_Code, setRegCode] = useState("");

  const history = useHistory();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const { error, authSearch, authSearchLoading, dispatch } =
    useContext(AuthContext);

  useEffect(() => {
    findAuthAccountById(userId, dispatch);
  }, [userId, dispatch]);

  const continueHandler = () => {
    if (reg_Code) {
      verifyRegistrationCode({ userId, reg_Code },history , dispatch);
    } else {
      toast.error("Please enter registration code sent to your email");
      return;
    }
  };

  const notYouHandler = () => {
    history.push("/forgot-password-search-account");
  };

  return (
    <>
      <div className="securityCodeContainer">
        <ToastContainer />
        <div className="securityCodeTopBar">
          <div className="securityCodeTopBarWrapper">
            <div className="securityCodeTopBarLeft">
              <Link style={{ textDecoration: "none" }} to="/">
                <h4 className="securityCodeTopBarLogo">Facebook</h4>
              </Link>
            </div>
          </div>
        </div>
        <div className="securityCodeBox">
          <div className="securityCodeBoxContainer">
            <div className="securityCodeBoxTop">
              <h2 className="securityCodeBoxTopTitle">Enter security code</h2>
            </div>
            <div className="securityCodeBoxCenterWrapper">
              {authSearchLoading ? (
                <CircularProgress
                  style={{ margin: "20px auto", color: "#1877f2" }}
                  size="50px"
                />
              ) : (
                <div className="securityCodeBoxCenter">
                  <div className="securityCodeBoxCenterLeft">
                    <p className="securityCodeBoxCenterLeftTitle">
                      Please check your emails for a message with your code.
                      Your code is 6 numbers long.
                    </p>
                    <div className="securityCodeBoxCenterLeftCode">
                      <input
                        value={reg_Code}
                        onChange={(e) => setRegCode(e.target.value)}
                        placeHolder="Reg Code"
                        type="text"
                        className="securityCodeBoxCenterLeftCodeInput"
                      />
                      <div className="securityCodeBoxCenterRight">
                        <span className="securityCodeBoxCenterRightTitle">
                          We sent your code to:
                        </span>
                        <span className="securityCodeBoxCenterRightEmail">
                          {authSearch && authSearch.email}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="securityCodeBoxBottom">
                <div className="securityCodeBoxBottomLeft">
                  <span className="securityCodeBoxBottomLeftTitle">
                    Didn't get a code?
                  </span>
                </div>
                <div className="securityCodeBoxBottomRight">
                  <button
                    style={{
                      cursor: authSearchLoading ? "not-allowed" : "pointer",
                    }}
                    onClick={notYouHandler}
                    className="securityCodeBoxBottomRightButton"
                  >
                    Cancel
                  </button>
                  <button
                    style={{
                      cursor: authSearchLoading ? "not-allowed" : "pointer",
                    }}
                    onClick={continueHandler}
                    className="securityCodeBoxBottomRightButton securityCodeBoxBottomRightButtonContinue"
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

export default SecurityCode;
