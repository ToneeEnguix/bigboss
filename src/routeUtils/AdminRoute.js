import { Route } from "react-router-dom";
// import { isAdminLogin } from "../utils/login";
// import UserContext from "../context/UserContext";
/* eslint-disable no-unused-vars */
var React = require("react");
/* eslint-enable no-unused-vars */

const AdminRoute = ({ component: Component, ...rest }) => {
  // const context = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={(props) => (
        // isAdminLogin(context.admin) ?
        <Component {...props} />
        // :   <Redirect to="/home"/>
        /*:   <Redirect to="/home"/>*/
      )}
    />
  );
};

export default AdminRoute;
