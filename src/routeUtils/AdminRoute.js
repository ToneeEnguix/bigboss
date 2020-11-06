import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { isAdminLogin } from "../utils/login";
import UserContext from "../context/UserContext";

const AdminRoute = ({ component: Component, ...rest }) => {
  const context = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={(props) => (
        // isAdminLogin(context.admin) ?
        <Component {...props} />
        // :   <Redirect to="/home"/>
       /*:   <Redirect to="/home"/>*/)}
    />
  );
};

export default AdminRoute;
