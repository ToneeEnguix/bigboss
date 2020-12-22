import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { getToken,clearToken } from "./api/token";
import { get } from "./api/fetch";
import ScrollToTop from "./utils/ScrollToTop";
import { createBrowserHistory } from "history";
import PrivateRoute from "./routeUtils/PrivateRoute";
import PublicRoute from "./routeUtils/PublicRoute";
import Bye from "./views/Bye";
import AdminRoute from "./routeUtils/AdminRoute";
import UserContext from "./context/UserContext";
import AdminDashboard from "./views/AdminDashboard";
import Basket from "./views/Basket";
import CompetitionDetails from "./views/CompetitionDetails";
import Competitions from "./views/Competitions";
import CreateAccount from "./views/CreateAccount";
import Draws from "./views/Draws";
import Entries from "./views/Entries";
import Home from "./views/Home";
import Log from "./views/Log";
import UserDashboard from "./views/UserDashboard";
import Winners from "./views/Winners.js";
import MoreDashboard from "./views/MoreDashboard.js";
import ErrorPage from "./views/Error.js";
import ForgotPass from "./views/ForgotPass.js";
import ResetPass from "./views/ResetPass";
import EntryDetails from "./views/EntryDetails.js";
import AdminLogin from "./views/AdminLogin";
/** @jsx jsx */
import { jsx } from "@emotion/core";
import "./App.css";
import facepaint from "facepaint";
import Header from "./components/Header";
import Footer from "./components/Footer";

const customHistory = createBrowserHistory();
const breakpoints = [576, 950, 992, 1200];

const mq = facepaint(breakpoints.map((bp) => `@media (min-width: ${bp}px)`));

class App extends React.Component {


  constructor(props) {
    super(props);

    this.state = {
      user: {
        _id: undefined,
        name: undefined,
        cart: [],
      },

      showPurchaseAlert: { status: false },

      activateUser: (user) => {
        this.setState({ user: user });
      },

      logout: () => {
        this.setState({
          user: { _id: undefined, name: undefined, cart: [], admin: false },
        });
        localStorage.clear();
      },

      buyTickets: (amount, competition) => {
        const onCartIndex = this.state.user.cart.findIndex(
          (cartItem) => cartItem.competition._id === competition._id
        );

        let cartCopy = [...this.state.user.cart];

        if (onCartIndex > -1) {
          cartCopy[onCartIndex] = {
            ...cartCopy[onCartIndex],
            amount: cartCopy[onCartIndex].amount + amount,
          };
        } else {
          cartCopy.push({ competition, amount });
        }

        this.setState({
          showPurchaseAlert: {
            status: true,
            competition: competition,
            amount: amount,
          },
          user: { ...this.state.user, cart: cartCopy },
        });

         setTimeout(() => {
          this.setState({ showPurchaseAlert: { status: false } });
        }, 7000); 
      },

      switchCart: (cart) => {

        this.setState({ user: { ...this.state.user, cart: cart } })
      }

      ,

 

      updateCart: (competition, newAmount) => {
        const onCartIndex = this.state.user.cart.findIndex(
          (cartItem) => cartItem.competition._id === competition._id
        );

        let cartCopy = [...this.state.user.cart];

        cartCopy[onCartIndex] = {
          ...cartCopy[onCartIndex],
          amount: parseInt(newAmount),
        };

        this.setState({ user: { ...this.state.user, cart: cartCopy } });
      },

      remove: (competition) => {
        const toRemove = this.state.user.cart.findIndex(
          (cartItem) => cartItem.competition._id === competition._id
        );

        let cartCopy = [...this.state.user.cart];
        cartCopy.splice(toRemove, 1);
        this.setState({ user: { ...this.state.user, cart: cartCopy } });
      },
      hideModal: () => {
        this.setState({ showPurchaseAlert: { status: false } });
      },

      setAdminStatus: () => {
        this.setState({ admin: true });
      },
    };
  }


  componentDidMount() {

    const token = getToken();
    if (token) {

      this.setUserData();
    }
  }

  setUserData = async () => {

    const result = await get("/token/verifyToken")

    if (result.ok) {

      this.setState({ user: result.data.userData });
    }
    else{

      localStorage.clear();
    }
  }
  render() {
    return (
      <UserContext.Provider value={this.state}>
        <Router>
          <ScrollToTop />
          <Header />
          <section css={{ marginTop: "10rem" }}>
            <Switch>
              <PublicRoute
                restricted={false}
                history={customHistory}
                component={CompetitionDetails}
                path="/competitions/:id"
              />
                <PublicRoute
                restricted={false}
                history={customHistory}
                component={EntryDetails}
                path="/entries/:id"
              />
              <PublicRoute restricted={false} component={Home} path="/home" />
              <PublicRoute restricted={false} component={ResetPass} path="/resetpass/:token" />
              <PublicRoute
                restricted={false}
                component={Competitions}
                path="/competitions"
              />
              <PublicRoute
                restricted={false}
                component={Winners}
                path="/winners"
              />
              <PublicRoute restricted={true} component={Log} path="/log" />
              <PublicRoute
                restricted={false}
                component={ForgotPass}
                path="/forgotPass"
              />
              <PublicRoute
                restricted={false}
                component={CreateAccount}
                path="/createaccount"
              />
              <PublicRoute restricted={false} component={Draws} path="/draws" />
              <PublicRoute
                restricted={false}
                component={ErrorPage}
                path="/error"
              />
              <PublicRoute
                restricted={false}
                component={Entries}
                path="/entries"
              />
              <PublicRoute
                restricted={false}
                component={Basket}
                path="/basket"
              />
              <PublicRoute
                restricted={true}
                component={AdminLogin}
                path="/adminlogin"
              />
              <PublicRoute
                restricted={false}
                component={MoreDashboard}
                path="/more"
              />
              <PrivateRoute
                restricted={false}
                component={UserDashboard}
                path="/userdashboard"
              />
              <AdminRoute
                restricted={false}
                component={AdminDashboard}
                path="/admindashboard"
              />
              <PublicRoute restricted={false} component={Bye} path="/bye" />
              <Route path="/">
                <Redirect to="/home" />
              </Route>
            </Switch>
          </section>
        <Footer/>
        </Router>

      </UserContext.Provider>
    );
  }
}

export default App;
