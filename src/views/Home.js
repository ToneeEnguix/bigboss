import { useState } from "react";
import HomeCarousel from "../components/HomeCarousel";
import OtherCompetitions from "../components/OtherCompetitions";
import RecentWinners from "../components/RecentWinners";
import HowToPlay from "../components/HowToPlay";
/** @jsx jsx */
import { jsx } from "@emotion/core";
import filmed from "../resources/googlepng.png";
import facepaint from "facepaint";
/* eslint-disable no-unused-vars */
var React = require("react");
/* eslint-enable no-unused-vars */

function Home() {
  return (
    <div>
      <HomeCarousel />
      <AnnoyingBanner />
      <OtherCompetitions />
      <RecentWinners />
      <HowToPlay />
    </div>
  );
}

const AnnoyingBanner = () => {
  const [animation, setAnimation] = useState("translate3d(0, 0, 0)");

  return (
    <div
      onClick={() => {
        setAnimation("translate3d(-100vw, 0, 0)");
      }}
      css={mq({
        display: ["none", "none", "inline", "inline"],
        transform: animation,
        transition: "transform 2s",
        borderTopRightRadius: "12px",
        borderBottomRightRadius: "12px",
        cursor: "pointer",

        position: "fixed",
        boxShadow: "0px 2px 4px 0px rgba(0,0,0,16%)",
        top: "50vh",
        zIndex: "50",
        padding: "0.5rem 0rem 0.5rem 1rem",
      })}
    >
      <span
        css={{ float: "right", fontSize: "12px", marginRight: "0.5rem" }}
        className="material-icons"
      >
        highlight_off
      </span>
      <img alt="filmed" css={{ width: "250px" }} src={filmed} />
    </div>
  );
};

const breakpoints = [576, 950, 992, 1200];
const mq = facepaint(breakpoints.map((bp) => `@media (min-width: ${bp}px)`));

export default Home;
