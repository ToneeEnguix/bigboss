import React, { useContext } from "react";
/* @jsx jsx */
import { jsx } from "@emotion/core/";
import UserDashboardNav from "../components/UserDashboardNav";
import { Route, Redirect } from "react-router-dom";
import Orders from "../components/Orders";
import Account from "../components/Account";
import Password from "../components/Password";

const UserDashboard = ({ match }) => {
  return (
    <div css={{ marginTop: "4rem" }}>
      <div css={{ marginLeft: "4rem" }}>
        <h1>ACCOUNT</h1>
        <div css={{ display: "flex", marginTop: "1rem" }}>
          <UserDashboardNav />
          <Route path={`${match.path}/details`} component={Account} />
          <Route path={`${match.path}/orders`} component={Orders} />
          <Route path={`${match.path}/password`} component={Password} />

          <Route path={match.path} exact>
            <Redirect to="/home" />
          </Route>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
