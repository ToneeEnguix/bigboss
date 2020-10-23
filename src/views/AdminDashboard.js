import React, { useState, useEffect } from "react";
/** @jsx jsx */
import { jsx } from "@emotion/core";
import AdminHeader from "../components/AdminHeader.js";
import AdminSidebar from "../components/AdminSidebar.js";
import ActiveCompetitions from "./ActiveCompetitions";
import PastCompetitions from "./PastCompetitions";
import ListOfEntries from "./ListOfEntries";
import Discounts from "./Discounts";
import FAQ from "./FAQ";
import { Route, Redirect, Switch } from "react-router-dom";
import { URL } from "../config";
import axios from "axios";

const AdminDashboard = (props) => {
  const [redirect, setRedirect] = useState(false);
  const [activeCompetitions, setActiveCompetitions] = useState([]);
  const [pastCompetitions, setPastCompetitions] = useState([]);
  const [allCompetitions, setAllCompetitions] = useState([]);
  const [listOfEntries, setListOfEntries] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  const [selected, setSelected] = useState("");
  const [update, setUpdate] = useState(false);
  const [create, setCreate] = useState(false);
  const [refresh, setRefresh] = useState(false);

  // useEffect(() => {
  //   !props.location.state && setRedirect(true);
  // }, []);

  useEffect(() => {
    getInfo();
  }, [selected, update, create, refresh]);

  const getInfo = async () => {
    let resActive = await axios.get(`${URL}/competitions/active`);
    setActiveCompetitions(resActive.data);
    let resPast = await axios.get(`${URL}/competitions/past`);
    setPastCompetitions(resPast.data);
    let resAll = await axios.get(`${URL}/competitions/all`);
    setAllCompetitions(resAll.data);
    let resEntries = await axios.get(`${URL}/competitions/all`);
    setListOfEntries(resEntries.data);
    let resDiscounts = await axios.get(`${URL}/coupons/all`);
    setDiscounts(resDiscounts.data);
  };

  useEffect(() => {
    let url = window.location.href;
    if (url.includes("activecompetitions")) {
      setSelected("activeCompetitions");
    } else if (url.includes("pastcompetitions")) {
      setSelected("pastCompetitions");
    } else if (url.includes("listofentries")) {
      setSelected("listOfEntries");
    } else if (url.includes("discounts")) {
      setSelected("discounts");
    } else if (url.includes("faq")) {
      setSelected("faq");
    }
  }, [window.location.href]);

  if (redirect) {
    return <Redirect to="/home" />;
  }

  return (
    <div>
      <AdminHeader
        updateSection={() => setUpdate(true)}
        selected={selected}
        newSection={() => setCreate(true)}
      />
      <AdminSidebar selected={selected} />
      <Switch>
        <Route
          path={`${props.match.path}/activecompetitions`}
          render={(props) => (
            <ActiveCompetitions
              {...props}
              update={update}
              setUpdate={() => setUpdate(false)}
            />
          )}
        />
        <Route
          path={`${props.match.path}/pastcompetitions`}
          render={(props) => (
            <PastCompetitions
              {...props}
              pastCompetitions={pastCompetitions}
              setPastCompetitions={(e, i) => {
                let tempPastCompetitions = discounts;
                tempPastCompetitions[i][e.target.name] = e.target.value;
                setPastCompetitions(tempPastCompetitions);
              }}
            />
          )}
        />
        <Route
          path={`${props.match.path}/listofentries`}
          render={(props) => (
            <ListOfEntries
              {...props}
              allCompetitions={allCompetitions}
              setAllCompetitions={(e, i) => {
                let tempDiscounts = discounts;
                tempDiscounts[i][e.target.name] = e.target.value;
                setAllCompetitions(tempDiscounts);
              }}
            />
          )}
        />
        <Route
          path={`/admindashboard/discounts`}
          render={(props) => (
            <Discounts
              {...props}
              discounts={discounts}
              update={update}
              setUpdate={() => setUpdate(false)}
              create={create}
              setCreate={() => setCreate(false)}
              setRefresh={() => {
                setRefresh(!refresh);
              }}
            />
          )}
        />
        <Route
          path={`/admindashboard/faq`}
          render={(props) => (
            <FAQ
              {...props}
              update={update}
              setUpdate={() => {
                setUpdate(false);
              }}
              create={create}
              setCreate={() => setCreate(false)}
            />
          )}
        />
        <Route path={props.match.path} exact>
          <Redirect to="/home" />
        </Route>
      </Switch>
    </div>
  );
};

export default AdminDashboard;
