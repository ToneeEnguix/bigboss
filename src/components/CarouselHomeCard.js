import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
/** @jsx jsx */
import { jsx } from "@emotion/core";
import CountDown from "../utils/CounterTransparent";
import { Link } from "react-router-dom";
/* eslint-disable no-unused-vars */
var React = require("react");
/* eslint-enable no-unused-vars */

const info = {
  backgroundColor: "rgba(37, 37, 37, 0.9)",
  margin: "5rem",
  padding: "2rem 1rem",
};
function CarouselCard(props) {
  const carouselCard = {
    backgroundImage: `url("${props.competition.pictures[0]}")`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundPosition: "center",
  };

  return (
    <div key={props.competition._id} css={carouselCard}>
      <div css={info}>
        <h1 css={{ marginBottom: "0.5rem" }}>{props.competition.title}</h1>
        <h5
          css={{
            backgroundColor: "transparent",
            marginBottom: "1.4rem",
            fontWeight: "600",
            letterSpacing: "0.1rem",
            color: "#00FFFF",
            tWeight: "600",
          }}
        >
          £{props.competition.ticketPrice} PER ENTRY
        </h5>
        <CountDown date={props.competition.dateFinishes} />
        <Link
          to={{
            pathname: `/competitions/${props.competition._id}`,
            state: {
              competition: props.competition,
            },
          }}
        >
          <button className="button01">VIEW DETAILS</button>
        </Link>
      </div>
    </div>
  );
}

export default CarouselCard;
