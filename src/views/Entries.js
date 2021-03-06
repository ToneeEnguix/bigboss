import { useState, useEffect } from "react";
/** @jsx jsx */
import { jsx } from "@emotion/core";
import { get } from "../api/fetch";
import EntryCard from "../components/EntryCard";
import { Redirect } from "react-router-dom";
import facepaint from "facepaint";
/* eslint-disable no-unused-vars */
var React = require("react");
/* eslint-enable no-unused-vars */

function Entries() {
  const [allEntries, setAllEntries] = useState([]);
  const [pastEntries, setPastEntries] = useState([]);
  const [activeEntries, setActiveEntries] = useState([]);
  const [error, setError] = useState(false);
  const [showEntries, setShowEntries] = useState("all");

  useEffect(() => {
    async function getAllEntries() {
      const entries = await get("/competitions/all");
      if (entries.ok) {
        setAllEntries(entries.data);
        let tempActive = [];
        let tempPast = [];
        entries.data.forEach((entry) => {
          if (new Date(entry.dateFinishes).getTime() < Date.now()) {
            tempPast.push(entry);
          } else {
            tempActive.push(entry);
          }
        });
        setActiveEntries(tempActive);
        setPastEntries(tempPast);
      } else {
        setError(true);
      }
    }
    getAllEntries();
  }, []);

  if (error) {
    return <Redirect to={"/error"} />;
  }

  return (
    <div css={contentWrapper}>
      <h1>ENTRIES</h1>
      <div css={buttonsCont}>
        <button
          className={`pointer ${showEntries === "all" && "selectedEntry"}`}
          onClick={() => setShowEntries("all")}
        >
          All
        </button>
        <button
          className={`pointer ${showEntries === "active" && "selectedEntry"}`}
          onClick={() => setShowEntries("active")}
        >
          Active
        </button>
        <button
          className={`pointer ${showEntries === "past" && "selectedEntry"}`}
          onClick={() => setShowEntries("past")}
        >
          Past
        </button>
      </div>
      <div css={drawWrap}>
        {allEntries.length > 0 && showEntries === "all" ? (
          allEntries.map((winner, index) => {
            return <EntryCard key={index} winner={winner} />;
          })
        ) : activeEntries.length > 0 && showEntries === "active" ? (
          activeEntries.map((winner, index) => {
            return <EntryCard key={index} winner={winner} />;
          })
        ) : pastEntries.length > 0 && showEntries === "past" ? (
          pastEntries.map((winner, index) => {
            return <EntryCard key={index} winner={winner} />;
          })
        ) : (
          <div
            css={{
              padding: "4rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h1>NOTHING TO SEE HERE YET!!</h1>
            <p css={{ textAlign: "center" }}>
              Soon this section will have something for you!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

const breakpoints = [576, 950, 992, 1200];

const mq = facepaint(breakpoints.map((bp) => `@media (min-width: ${bp}px)`));

const contentWrapper = mq({
    margin: "4rem 0rem",
    h1: {
      marginLeft: "4rem",
      textAlign: "left",
    },
  }),
  drawWrap = {
    marginTop: "1rem",
    display: "flex",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
  },
  buttonsCont = {
    margin: "1rem 0 0 4rem",
    button: {
      marginRight: "1rem",
      padding: "0.4rem 0.6rem",
      outline: "none",
      border: "none",
      borderRadius: "12px",
      backgroundColor: "#212121",
      color: "rgba(255, 255, 255, 0.605);",
    },
    "button:hover": {
      backgroundColor: "#1a1a1a",
    },
  };

export default Entries;
