import React from "react";
/** @jsx jsx */
import { jsx } from "@emotion/core";
import facepaint from "facepaint";

function WinnerCard({ winner }) {
  return (
    <div css={card}>
      <img alt="description" css={image} src={winner.winnerPic} />
      <div css={text}>
        <p>{winner.prize}</p>
        <p css={{ color: "#666666" }}>
          {" "}
          WON BY {winner.winner.name} {winner.winner.lastName}
        </p>
      </div>
    </div>
  );
}

const breakpoints = [576, 950, 1200, 1300];
const mq = facepaint(breakpoints.map((bp) => `@media (min-width: ${bp}px)`));
const card = mq({
    display: "flex",
    boxShadow: "0px 2px 4px 0px rgba(0,0,0,16%)",
    justifyContent: "center",
    maxWidth: "600px",
    margin: ["3rem 1rem", "4rem 0rem", "4rem 1rem", "4rem 1rem"],
    flexDirection: "column",
    textTransform: "uppercase",
    borderRadius: "4%",
    overflow: "hidden",
  }),
  image = {
    maxWidth: "100%",
  },
  text = {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    padding: "2rem 0",
    p: {
      margin: "1.25rem 0 0 0",
    },
  };

export default WinnerCard;
