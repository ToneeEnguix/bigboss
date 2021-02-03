import { useState, useEffect } from "react";
/** @jsx jsx */
import { jsx } from "@emotion/core";
import { get } from "../api/fetch";
import DrawCard from "../components/DrawCard";
import { Redirect } from "react-router-dom";
import facepaint from "facepaint";
/* eslint-disable no-unused-vars */
var React = require("react");
/* eslint-enable no-unused-vars */

function Draws() {
  const [error, setError] = useState(false);
  const [showDraws, setShowDraws] = useState("all");
  const [pastComps, setPastComps] = useState([]);
  const [activeComps, setActiveComps] = useState([]);
  const [allComps, setAllComps] = useState([
    {
      _id: "",
      dateFinishes: "1-1-1",
      pictures: [""],
    },
  ]);

  useEffect(() => {
    async function getAllComps() {
      const allComps = await get("/competitions/all");
      if (allComps.ok) {
        setAllComps(allComps.data);
        let tempActive = [];
        let tempPast = [];
        allComps.data.forEach((comp) => {
          if (comp.dateFinishes > Date.now()) {
            tempPast.push(comp);
          } else {
            tempActive.push(comp);
          }
        });
        setActiveComps(tempActive);
        setPastComps(tempPast);
      } else {
        setError(true);
      }
    }
    getAllComps();
  }, []);

  if (error) {
    return <Redirect to={"/error"} />;
  }

  return (
    <div css={contentWrapper}>
      <h1>DRAWS</h1>
      <div css={buttonsCont}>
        <button
          className={`pointer ${showDraws === "all" && "selectedEntry"}`}
          onClick={() => setShowDraws("all")}
        >
          All
        </button>
        <button
          className={`pointer ${showDraws === "active" && "selectedEntry"}`}
          onClick={() => setShowDraws("active")}
        >
          Active
        </button>
        <button
          className={`pointer ${showDraws === "past" && "selectedEntry"}`}
          onClick={() => setShowDraws("past")}
        >
          Drawn
        </button>
      </div>
      <div css={drawWrap}>
        {allComps.length > 0 && showDraws === "all" ? (
          allComps.map((winner, index) => {
            return <DrawCard key={index} winner={winner} />;
          })
        ) : activeComps.length > 0 && showDraws === "active" ? (
          activeComps.map((winner, index) => {
            return <DrawCard key={index} winner={winner} />;
          })
        ) : pastComps.length > 0 && showDraws === "past" ? (
          pastComps.map((winner, index) => {
            return <DrawCard key={index} winner={winner} />;
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
      marginLeft: ["0rem", "0rem", "4rem", "4rem"],
      textAlign: ["center", "center", "left", "left"],
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

export default Draws;
