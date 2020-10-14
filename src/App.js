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
import ForgotPass from "./views/ForgotPass.js";


import NavBar from "./components/NavBar";
import NextDraw from "./components/NextDraw";

import FooterAds from "./components/FooterAds";
import FooterLinks from "./components/FooterLinks";

import AdminLogin from "./views/AdminLogin";

/** @jsx jsx */
import { jsx } from '@emotion/core';

import './App.css';

const customHistory = createBrowserHistory();

class App extends React.Component {

  constructor(props) {
    super(props);

    const abort = new AbortController();
    const signal = abort.signal;
    this.state = {
      user: {
        _id: "5f7c33b5b33f471334d79bf4", fullName: "PEPE", cart: [{ competition: { _id: "5f7b351559537043a887b888", title: "MOCKI MOCK", ticketPrice: 20, dateFinishes: "2020-10-07T17:00:00.000Z", maxTickets: 1000, ticketsAvailable: 24, prize: "Car", description: ["line01", "line02", "line03", "line04", "line05"], pictures: ["https://picsum.photos/1200/800", "https://picsum.photos/1200/800", "https://picsum.photos/1200/800", "https://picsum.photos/1200/800"] }, amount: 3 }]
      },

      showPurchaseAlert: {status:false},

      activateUser: (user) => {

        this.setState({ user: user })

      },

      logout: () => {

        this.setState({ user: { _id: undefined, fulName: undefined, cart: [] } });
        localStorage.clear();
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

        this.setState({showPurchaseAlert: {status:true, competition:competition,amount:amount}, user: { ...this.state.user, cart: cartCopy }});
        
        setTimeout(()=>{this.setState({showPurchaseAlert:{status:false}})},2000)
       

      },

      updateCart: (competition, newAmount) => {

        const onCartIndex = this.state.user.cart.findIndex(cartItem =>
          cartItem.competition._id === competition._id)

        let cartCopy = [...this.state.user.cart]


        cartCopy[onCartIndex] = { ...cartCopy[onCartIndex], amount: parseInt(newAmount) };

        this.setState({ user: { ...this.state.user, cart: cartCopy } });


      },

      remove: (competition) => {

        const toRemove = this.state.user.cart.findIndex(cartItem =>
          cartItem.competition._id === competition._id
        )

        let cartCopy = [...this.state.user.cart];
        cartCopy.splice(toRemove, 1);
        this.setState({ user: { ...this.state.user, cart: cartCopy } });

      },
    }

  }

  render() {


    return (
      <UserContext.Provider value={this.state}>
        <Router>
          <ScrollToTop />
          <header css={{ position: "fixed", top: "0", width: "100%", zIndex: "40", boxShadow: "0px 10px 5px 0px rgba(0,0,0,16%)" }}>
            <NextDraw />
            <NavBar />
          </header>
          <section css={{ marginTop: "10rem" }}>
            <Switch>
              <PublicRoute restricted={false} history={customHistory}
                component={CompetitionDetails} path="/competitions/:id" />
              <PublicRoute restricted={false} component={Home} path="/home" />
              <PublicRoute restricted={false} component={Competitions} path="/competitions" />

              <PublicRoute restricted={false} component={Winners} path="/winners" />
              <PublicRoute restricted={true} component={Log} path="/log" />
              <PublicRoute restricted={false} component={ForgotPass} path="/forgotPass" />
              <PublicRoute restricted={false} component={CreateAccount} path="/createaccount" />
              <PublicRoute restricted={false} component={Draws} path="/draws" />
              <PublicRoute restricted={false} component={Terms} path="/terms" />
              <PublicRoute restricted={false} component={ErrorPage} path="/error" />
              <PublicRoute restricted={false} component={Entries} path="/entries" />
              <PublicRoute restricted={false} component={Basket} path="/basket" />
              <PublicRoute restricted={true} component={AdminLogin} path="/adminlogin" />
              <PrivateRoute restricted={false} component={UserDashboard} path="/userdashboard" />
              <PrivateRoute restricted={false} component={AdminDashboard} path="/admindashboard" />
              <Route path="/">
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
