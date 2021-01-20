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
  const [activeCompetitions, setActiveCompetitions] = useState([]);
  const [pastCompetitions, setPastCompetitions] = useState([]);
  const [allCompetitions, setAllCompetitions] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  const [selected, setSelected] = useState("");
  const [update, setUpdate] = useState(false);
  const [create, setCreate] = useState(false);
  const [refresh, setRefresh] = useState(false);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.location.href]);

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
              activeCompetitions={activeCompetitions}
              update={update}
              setUpdate={() => {
                setUpdate(false);
              }}
              create={create}
              setCreate={() => setCreate(false)}
              setRefresh={() => setRefresh(!refresh)}
            />
          )}
        />
        <Route
          path={`${props.match.path}/pastcompetitions`}
          render={(props) => (
            <PastCompetitions
              {...props}
              pastCompetitions={pastCompetitions}
              update={update}
              setUpdate={() => {
                setUpdate(false);
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

// Next Steps: ✅
// - Fetch and display listOfEntries ✅
// - Upload Images ✅
// - Delete box in FAQS red only outline and 4px space ✅
// - Delete winner image ✅
// - Delete past competition? (NO) => remove cross ✅
// - Delete Image ✅
// - If winner photo not saved and changed i then setRemove("") ✅
// - Delete winner img from cloudinary (got public id from url) ✅
// - Delete img from cloudinary (got public id from url) ✅
// - Create competition (with publish button) ✅
// - Delete active competition ✅
// - button style to className and add className to buttons ✅
// - Add winner ✅
// - Delete winner ✅
// - Change FAQ order => sort by date ✅
// - Click top right showing over reactModal ✅
// - Alert before exiting (unsaved changes) ✅
// - Message: "changes saved" ✅
//   - FAQ ✅
//   - Discounts ✅
//   - Past Comps ✅
//   - Active Comps ✅
// - Why do you have to press Submit twice to create competition? (first time gives error, not second time => find out what changes!) ✅ Sol: there was one empty array element !
// - Contemplate no discounts situation ✅
// - Overflow scroll on secondSidebar: https://stackoverflow.com/questions/7492062/css-overflow-scroll-always-show-vertical-scroll-bar ✅

// COMPETITIONS:
// - check by _id not by name ✅
// - Change input style to variable ✅
// - Call winner through ref ✅
// - Once I got winner, add name and email ✅
// - Links dont open on new tab correctly ✅ (added 'http://' to beggining of href)
// - re-check add winner ✅
// - ticketsAvailable not updating ✅ (because it was maxTickets and bc of type)
// - If no competitions show "no competitions" ✅
// - Add prize input ✅
// - remove facebook url from active competition ✅
// - make facbook url editable in past competition ✅
// - save winner + facebook (1 func) ✅
// - New comp not working??? ✅
// - Set all placeholders appropiately ✅
// - CSS on notifications (ask Chris) ✅
// - if not editable color gray ✅
// - If no competitions, next draw getting weird ✅
// - update winner with only whole info (pic, user and fb url) ✅
//   - If all inputs filled, send save ✅
//   - Check on facebook videos (about above) ✅
// - add photo on newComp??? ✅
// - logout => fotter / header ✅
// - refresh logout? ✅
//   - password input type password ✅
// - Add admin middleware ❗️
// - No /adminlogin from mobile ✅ => breakpoint in adminlogin
// - re-check admin user ❗️ (with Chris/Carla at deploy)
// - Photo format ✅
// - video fb ❗️

// GENERAL:
// - Change winner in past Competitions (YES + put it in top) ✅
// - Add competitions + publish? Adding empty competition to public? ✅
// - DeprecationWarning: collection.count is deprecated, and will be removed in a future version. Use Collection.countDocuments or Collection.estimatedDocumentCount instead ✅
// - How to call func inside same controller (getPublicId) 🚫
