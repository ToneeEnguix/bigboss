/** @jsx jsx */
import { jsx } from "@emotion/core";
/* eslint-disable no-unused-vars */
var React = require("react");
/* eslint-enable no-unused-vars */

const howToPlayWrapper = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "0 5%",
    justifyContent: "center",
    marginTop: "4rem",
    padding: "2rem",
    h1: {
      marginBottom: "2rem",
    },
  },
  text = {
    display: "flex",
    flexDirection: "column",
  },
  card = {
    boxShadow: "0px 2px 4px 0px rgba(0,0,0,16%)",
    padding: "2rem",
    margin: "1rem 0",
    display: "flex",
    fontWeight: "600",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    borderRadius: "6px",
    p: {
      fontWeight: "500",
      padding: "0.5rem 0",
      letterSpacing: "0.1rem",
    },
    span: {
      fontSize: "42px",
    },
  };

function HowToPlay() {
  return (
    <div css={howToPlayWrapper}>
      <h1>HOW TO PLAY</h1>
      <div css={card}>
        <div css={text}>
          <p css={{ color: "#00FFFF" }}>1.SELECT</p>
          <p>SELECT THE COMPETITION AND THE DESIRED NUMBER OF ENTRIES</p>
        </div>
        <span className="material-icons">looks_one</span>
      </div>
      <div css={card}>
        <div css={text}>
          <p css={{ color: "#00FFFF" }}>2.ANSWER</p>
          <p>ANSWER THE QUALIFYING QUESTION AND COMPLETE PAYMENT</p>
        </div>
        <span className="material-icons">looks_two</span>
      </div>
      <div css={card}>
        <div css={text}>
          <p css={{ color: "#00FFFF" }}>3.WAIT</p>
          <p>WAIT FOR THE COMPETITION TO LIVESTREAM ON FACEBOOK</p>
        </div>
        <span className="material-icons">looks_3</span>
      </div>
    </div>
  );
}

export default HowToPlay;
