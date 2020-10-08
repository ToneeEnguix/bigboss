import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import ScrollToTop from "./utils/ScrollToTop";
import { createBrowserHistory } from "history";
import PrivateRoute from "./routeUtils/PrivateRoute";
import PublicRoute from "./routeUtils/PublicRoute";
import UserContext from "./context/UserContext"
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
import Terms from "./views/Terms.js";
import ErrorPage from "./views/Error.js";
import ForgotPass from "./views/ForgotPass.js"

import NavBar from "./components/NavBar";
import NextDraw from "./components/NextDraw";

import FooterAds from "./components/FooterAds";
import FooterLinks from "./components/FooterLinks";

import './App.css';

const customHistory = createBrowserHistory();

class App extends React.Component {

  constructor(props) {
    super(props);

    const abort = new AbortController();
    const signal = abort.signal;
    this.state = {
      user: { _id: true, fullName: "PEPE", cart: [{ competition: {price:20}, amount: 3 }] },

      activateUser: (user) => {

        this.setState({ user: user })

      },

      buyTickets: (amount, competition) => {


        const onCartIndex = this.state.user.cart.findIndex(cartItem =>
          cartItem.competition._id === competition._id
        )

        let cartCopy = [...this.state.user.cart]

        if (onCartIndex > -1) {

          cartCopy[onCartIndex] = { ...cartCopy[onCartIndex], amount: cartCopy[onCartIndex].amount + amount };
        }

        else {

          cartCopy.push({ competition, amount });

        }

        this.setState({ user: { ...this.state.user, cart: cartCopy } });

      }
    }

  }

  render() {


    return (
      <UserContext.Provider value={this.state}>
        <Router>
          <ScrollToTop />
          <header>
            <NextDraw />
            <NavBar />
          </header>
          <section>
            <Switch>
              <PublicRoute restricted={false} history={customHistory}
                component={CompetitionDetails} path="/competitions/:id" />
              <PublicRoute restricted={false} component={Home} path="/home" />
              <PublicRoute restricted={false} component={Competitions} path="/competitions" />

              <PublicRoute restricted={false} component={Winners} path="/winners" />
              <PublicRoute restricted={false} component={Log} path="/log" />
              <PublicRoute restricted={false} component={ForgotPass} path="/forgotPass" />
              <PublicRoute restricted={false} component={CreateAccount} path="/createaccount" />
              <PublicRoute restricted={false} component={Draws} path="/draws" />
              <PublicRoute restricted={false} component={Terms} path="/terms" />
              <PublicRoute restricted={false} component={ErrorPage} path="/error" />
              <PublicRoute restricted={false} component={Entries} path="/entries" />
              <PublicRoute restricted={false} component={Basket} path="/basket" />
              <PrivateRoute restricted={false} component={UserDashboard} path="/userdashboard" />
              <PrivateRoute restricted={false} component={AdminDashboard} path="/admindashboard" />
              <Route  path="/">
                <Redirect to="/home" />
              </Route>
            </Switch>
          </section>
          <footer>
            <FooterLinks />
            <FooterAds />
          </footer>
        </Router>
      </UserContext.Provider>
    );
  }
}

export default App;
