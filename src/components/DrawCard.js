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
    return (
      // <div css={card}>
      //   <h3 css={title}>{props.winner.title}</h3>
      //   <div css={text}>
      //     <p css={{ color: "#00FFFF" }}>DRAWN ON</p>
      //     <p>
      //       {dateFormat[1]} {dateFormat[2]} {dateFormat[0]}
      //     </p>
      //   </div>
      //   <div css={video}>
      //     <ReactPlayer
      //       width="auto"
      //       height="auto"
      //       url={props.winner.facebookURL}
      //       controls
      //     />
      //   </div>
      // </div>
      <Link css={card} to={`/competitions/${props.winner._id}`}>
        <div css={text}>
          <h3 css={title}>{props.winner.title}</h3>
          <div>
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
      </Link>
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
          <img alt="description" src={props.winner.pictures[0]} />
        </div>
      </Link>
    );
  }
}

const breakpoints = [576, 950, 1200, 1300];
const mq = facepaint(breakpoints.map((bp) => `@media (min-width: ${bp}px)`));
const card = mq({
    display: "flex",
    width: ["450px", "450px", "fit-content", "fit-content"],
    padding: "1.5rem",
    height: "446px",
    boxShadow: "0px 2px 4px 0px rgba(0,0,0,16%)",
    flexDirection: "column",
    textTransform: "uppercase",
    borderRadius: "4%",
    overflow: "hidden",
    margin: "0 auto 2rem",
  }),
  text = {
    display: "flex",
    flexDirection: "column",
    p: {
      margin: "1rem 0.5rem 0 0",
    },
    div: {
      display: "flex",
    },
  },
  video = {
    margin: "2rem 0 0",
  },
  card2 = mq({
    display: "flex",
    width: "450px",
    padding: "1.5rem",
    height: "446px",
    margin: "0 1rem 4rem 0",
    boxShadow: "0px 2px 4px 0px rgba(0,0,0,16%)",
    flexDirection: "column",
    textTransform: "uppercase",
    borderRadius: "4%",
    overflow: "hidden",
    boxSizing: "border-box",
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
    p: {
      margin: "1rem 0.5rem 0 0",
    },
    div: {
      display: "flex",
    },
  };

export default DrawCard;
