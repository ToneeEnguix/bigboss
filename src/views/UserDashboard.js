import React, { useContext } from "react";
/* @jsx jsx */
import { jsx } from "@emotion/core/";
import UserDashboardNav from "../components/UserDashboardNav";
import { Route, Redirect } from "react-router-dom";
import Orders from "../components/Orders";
import Account from "../components/Account";
import Password from "../components/Password";
import facepaint from 'facepaint';

const breakpoints = [576, 950, 992, 1200]
const mq = facepaint(
  breakpoints.map(bp => `@media (min-width: ${bp}px)`));

const UserDashboard = ({ match }) => {
  return (
    <div css={{ marginTop: "4rem" }}>
      <div css={mq({ marginLeft:["0rem","0rem","4rem","4rem"]})}>
        <h1 css={mq({textAlign:["center","center","left","left"]})}>ACCOUNT</h1>
        <div css={mq({ display: "flex", marginTop: "1rem",justifyContent:["center","center","flex-start","flex-start"] })}>
          <UserDashboardNav />
          <Route path={`${match.path}/details`} component={Account} />
          <Route path={`${match.path}/orders`} component={Orders} />
          <Route path={`${match.path}/password`} component={Password} />

          <Route path={`${match.path}/`} exact>
            <Redirect to="/home" />
          </Route>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
