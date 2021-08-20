import Login from "./components/login/Login";
import Profile from "./components/profile/Profile";
import Register from "./components/register/Register";
import Home from "./pages/home/Home";
import ForgotPassword from "./components/ResetPassword/ForgotPassword";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthContext } from "./components/context/Auth/AuthContext";
import { useContext, useEffect } from "react";

import { isUserLoggedIn } from "./components/apiCalls";
import PrivateRoute from "./components/HOC/PrivateRoute";
import ForgotPasswordStep1 from "./components/ResetPassword/ForgotPasswordStep1";
import SecurityCode from "./components/ResetPassword/SecurityCode";
import ChoosePassword from "./components/ResetPassword/ChoosePassword";

const App = () => {
  const { dispatch, user } = useContext(AuthContext);
  useEffect(() => {
    if (!user) {
      isUserLoggedIn(dispatch);
    }
  }, [user]);
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route
          exact
          path="/forgot-password/:searchType/:userId"
          component={ForgotPassword}
        />
        <Route
          exact
          path="/forgot-password-search-account"
          component={ForgotPasswordStep1}
        />
        <Route
          exact
          path="/forgot-password-security-code/:searchType/:userId"
          component={SecurityCode}
        />
        <Route
          exact
          path="/forgot-password-new-password/:userId"
          component={ChoosePassword}
        />
        <PrivateRoute exact path="/profile/:username" component={Profile} />
        <PrivateRoute exact path="/" component={Home} />
      </Switch>
    </Router>
  );
};

export default App;
