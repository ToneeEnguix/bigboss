import React,{useContext} from "react";
import { Route, Redirect } from 'react-router-dom';
import {isLogin} from "../utils/login";
import UserContext from "../context/UserContext"


const PrivateRoute = ({component: Component, ...rest}) => {

  const context=useContext(UserContext);
  return (

      <Route {...rest} render={props => (
          isLogin(context.user._id) ?
              <Component {...props} />
          : <Redirect to="/home" />
      )} />
  );
};

  export default PrivateRoute;