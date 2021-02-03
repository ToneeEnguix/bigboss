import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
/** @jsx jsx */
import { jsx } from "@emotion/core";
/* eslint-disable no-unused-vars */
var React = require("react");
/* eslint-enable no-unused-vars */

function CarouselWinnerCard(props) {
  return (
    <div css={carouselCard}>
      <img
        css={{ maxWidth: "100%" }}
        src={props.competition.winnerPic}
        alt="winner"
      />
      <h2 css={{ padding: "4rem 0 1rem 0" }}>{props.competition.title}</h2>
      <p css={winner}>
        WON BY {props.competition.winner.name}{" "}
        {props.competition.winner.lastName}
      </p>
    </div>
  );
}

const carouselCard = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: "1rem",
  },
  winner = {
    textTransform: "uppercase",
    color: "#00FFFF",
  };

export default CarouselWinnerCard;
