import React from "react";
import { Route, Redirect, useHistory } from "react-router-dom";
const PrivateRoute = ({ component: Component, ...rest }) => {
  const history = useHistory();
  console.log(history.location.pathname);
  return (
    <Route
      {...rest}
      component={(props) => {
        const user = JSON.parse(localStorage.getItem("userInfo"));
        if (user) {
          return <Component {...props} />;
        } else {
          if (!history.location.pathname.startsWith("/forgot")) {
            return <Redirect to={"/login"} />;
          }
        }
      }}
    />
  );
};

export default PrivateRoute;
