import { useEffect, useState } from "react";
/** @jsx jsx */
import { jsx } from "@emotion/core";
import ReactPlayer from "react-player/facebook";
import { formatDate } from "../utils/formatDate.js";
import facepaint from "facepaint";
import { Link } from "react-router-dom";
/* eslint-disable no-unused-vars */
var React = require("react");
/* eslint-enable no-unused-vars */

function DrawCard(props) {
  const [dateFormat, setDateFormat] = useState([0, 0, 0]);

  useEffect(() => {
    const array = formatDate(props.winner.dateFinishes);
    setDateFormat(array);
  }, [props]);

  if (props.winner.winner) {
    console.log(props.winner)
    return (
      <div css={card}>
        <div css={text}>
          <p css={{ color: "#00FFFF" }}>DRAWN ON</p>
          <p>
            {dateFormat[1]} {dateFormat[2]} {dateFormat[0]}
          </p>
        </div>
        <div css={video}>
          <ReactPlayer
            width="auto"
            height="auto"
            url={props.winner.facebookURL}
            controls
          />
        </div>
      </div>
    );
  } else {
    return (
      <Link css={card2} to={`/competitions/${props.winner._id}`}>
        <div css={text2}>
          <h3 css={title}>{props.winner.title}</h3>
          <div>
            <p css={{ color: "#00FFFF" }}>DRAW ON</p>
            <p>
              {dateFormat[1]} {dateFormat[2]} {dateFormat[0]}
            </p>
          </div>
          <img src={props.winner.pictures[0]} />
        </div>
      </Link>
    );
  }
}

const breakpoints = [576, 950, 1200, 1300];
const mq = facepaint(breakpoints.map((bp) => `@media (min-width: ${bp}px)`));
const card = mq({
    display: "flex",
    minWidth: ["550px", "550px", "600px", "650px"],
    maxHeight: ["450px", "400px", "550px", "550px"],
    margin: "4rem 0",
    boxShadow: "0px 2px 4px 0px rgba(0,0,0,16%)",
    flexDirection: "column",
    textTransform: "uppercase",
    borderRadius: "4%",
    overflow: "hidden",
  }),
  text = {
    display: "flex",
    flexDirection: "column",
    padding: "1rem",
    p: {
      margin: "1rem 0 0 0",
    },
  },
  video = {
    padding: "0 2rem",
  },
  card2 = mq({
    display: "flex",
    minWidth: "450px",
    padding: "1.5rem",
    // minWidth: ["550px", "550px", "600px", "650px"],
    // maxHeight: ["450px", "400px", "550px", "550px"],
    margin: "0 1rem 4rem 0",
    boxShadow: "0px 2px 4px 0px rgba(0,0,0,16%)",
    flexDirection: "column",
    textTransform: "uppercase",
    borderRadius: "4%",
    overflow: "hidden",
    img: {
      margin: "2rem 0 0",
      maxHeight: "300px",
    },
  }),
  title = {
    margin: "1rem 0 0",
  },
  text2 = {
    display: "flex",
    flexDirection: "column",
    padding: "1rem",
    p: {
      margin: "1rem 2rem 0 0",
    },
    div: {
      display: "flex",
    },
  };

export default DrawCard;
