/** @jsx jsx */
import { jsx } from "@emotion/core";
import "./adminheader.css";
import { Link } from "react-router-dom";
import power from "../resources/power.svg";
/* eslint-disable no-unused-vars */
var React = require("react");
/* eslint-enable no-unused-vars */

const Sidebar = (props) => {
  return (
    <div className="flexColumn" css={sidebarStyle}>
      <div className="bgtransparent">
        <div css={titleStyle}>Your Dashboard</div>
        <div className="flexColumn" css={contentStyle}>
          <Link
            className={`${
              props.selected === "activeCompetitions" && "thisblue"
            } bgtransparent`}
            css={contentLinks}
            to="/admindashboard/activecompetitions"
          >
            Active Competitions
          </Link>
          <Link
            className={`${
              props.selected === "pastCompetitions" && "thisblue"
            } bgtransparent`}
            css={contentLinks}
            to="/admindashboard/pastcompetitions"
          >
            Past Competitions
          </Link>
          <Link
            className={`${
              props.selected === "listOfEntries" && "thisblue"
            } bgtransparent`}
            css={contentLinks}
            to="/admindashboard/listofentries"
          >
            List of Entries
          </Link>
          <Link
            className={`${
              props.selected === "discounts" && "thisblue"
            } bgtransparent`}
            css={contentLinks}
            to="/admindashboard/discounts"
          >
            Discounts
          </Link>
          <Link
            className={`${
              props.selected === "faq" && "thisblue"
            } bgtransparent`}
            css={contentLinks}
            to="/admindashboard/faq"
          >
            FAQ
          </Link>
        </div>
      </div>
      <Link to="/" className="bgtransparent">
        <img
          alt="power"
          src={power}
          className="bgtransparent pointer"
          onClick={() => {
            localStorage.clear();
          }}
        />
      </Link>
    </div>
  );
};

const sidebarStyle = {
    position: "fixed",
    top: "90px",
    left: "0",
    height: "86.5vh",
    width: "237.75px",
    backgroundColor: "#262626",
    boxShadow: "0px 3px 6px #00000029",
    fontFamily: "Raleway",
    justifyContent: "space-between",
    color: "white",
    zIndex: "1",
    transition: "all 1s",
    fontWeight: "300",
    img: {
      margin: "0 9.5rem 1.5rem 0",
      width: "30px",
    },
    "img:hover": {
      filter:
        "blur(1px) sepia(1) saturate(5000) brightness(0.6) hue-rotate(135deg);",
    },
  },
  titleStyle = {
    margin: "2rem auto 1.4rem",
    fontSize: "1.24rem",
    fontFamily: "Raleway",
    letterSpacing: "0.004rem",
    backgroundColor: "#262626",
  },
  contentStyle = {
    alignItems: "flex-start",
    fontSize: "0.8rem",
    lineHeight: "1.7rem",
    width: "100%",
    backgroundColor: "#262626",
  },
  contentLinks = {
    fontSize: "0.77rem",
    fontFamily: "Raleway",
  };

export default Sidebar;
