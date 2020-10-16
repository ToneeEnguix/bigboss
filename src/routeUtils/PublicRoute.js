import React,{useContext} from "react";
import { Route, Redirect } from 'react-router-dom';
import {isLogin} from "../utils/login";
import UserContext from "../context/UserContext"


const PublicRoute = ({component: Component, restricted, ...rest}) => {
    
    const context=useContext(UserContext);
    
    return (

        <Route {...rest} render={props => (
            isLogin(context.user._id) && restricted ?
                <Redirect to="/dashboard" />
            : <Component {...props} />
        )} />
    );
};

export default PublicRoute;