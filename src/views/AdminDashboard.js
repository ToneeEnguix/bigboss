import React, { useState, useEffect } from "react";
/** @jsx jsx */
import { jsx } from "@emotion/core";
import AdminHeader from "../components/AdminHeader.js";
import AdminSidebar from "../components/AdminSidebar.js";
import SecondSidebar from "../components/SecondSidebar.js";
import ActiveCompetitions from "./ActiveCompetitions";
import PastCompetitions from "./PastCompetitions";
import ListOfEntries from "./ListOfEntries";
import Discounts from "./Discounts";
import FAQ from "./FAQ";
import { Route, Redirect, Switch } from "react-router-dom";
import { URL } from "../config";
import axios from "axios";

const AdminDashboard = (props) => {
  const [selected, setSelected] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [activeCompetitions, setActiveCompetitions] = useState([]);
  const [pastCompetitions, setPastCompetitions] = useState([]);
  const [allCompetitions, setAllCompetitions] = useState([]);
  const [listOfEntries, setListOfEntries] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  const [faq, setFaq] = useState([{ question: "" }]);
  const [section, setSection] = useState();
  const [i, setI] = useState(0);

  // useEffect(() => {
  //   !props.location.state && setRedirect(true);
  // }, []);

  useEffect(() => {
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
      let resFaq = await axios.get(`${URL}/faq/all`);
      setFaq(resFaq.data);
    };
    getInfo();
  }, []);

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

  const handleChange = (section, e, i) => {
    if (section === "faq") {
      let tempFaq = faq;
      tempFaq[i][e.target.name] = e.target.value;
      console.log(tempFaq);
      setFaq(tempFaq);
    } else if (section === "discounts") {
      let tempDiscounts = discounts;
      tempDiscounts[i][e.target.name] = e.target.value;
      console.log(tempDiscounts);
      setI(i);
      setDiscounts(tempDiscounts);
    }
  };

  const saveContent = async () => {
    console.log("Banana");
    if (selected === "FAQ") {
      let resFaq = await axios.post(`${URL}/faq/update`, { faq, i });
      console.log(resFaq);
    }
  };

  return (
    <div>
      <AdminHeader saveContent={saveContent} selected={selected} />
      <AdminSidebar selected={selected} />
      <SecondSidebar
        activeCompetitions={activeCompetitions}
        pastCompetitions={pastCompetitions}
        allCompetitions={allCompetitions}
        discounts={discounts}
        selected={selected}
        section={section}
        setSection={(section) => setSection(section)}
      />
      <Switch>
        <Route
          path={`${props.match.path}/activecompetitions`}
          render={(props) => (
            <ActiveCompetitions
              {...props}
              activeCompetitions={activeCompetitions}
            />
          )}
        />
        <Route
          path={`${props.match.path}/pastcompetitions`}
          render={(props) => (
            <PastCompetitions {...props} pastCompetitions={pastCompetitions} />
          )}
        />
        <Route
          path={`${props.match.path}/listofentries`}
          render={(props) => (
            <ListOfEntries {...props} allCompetitions={allCompetitions} />
          )}
        />
        <Route
          path={`/admindashboard/discounts`}
          render={(props) => (
            <Discounts
              {...props}
              discounts={discounts}
              setDiscounts={handleChange}
              discounts={discounts}
            />
          )}
        />
        <Route
          path={`/admindashboard/faq`}
          render={(props) => <FAQ {...props} faq={faq} setFaq={handleChange} />}
        />
        <Route path={props.match.path} exact>
          <Redirect to="/home" />
        </Route>
      </Switch>
    </div>
  );
};

export default AdminDashboard;
