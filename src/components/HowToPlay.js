import React from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core';

const howToPlayWrapper = {

  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  margin: "0 5%",
  justifyContent: "center",
  marginTop: "4rem",
  padding: "2rem",

  "h1":{

    marginBottom:"2rem"
  }

}

const text = {
  display: "flex",
  flexDirection: "column"
}

const card = {
  boxShadow: "-1px 4px 22px 0px black",
  padding: "2rem",
  margin: "2rem 0",
  display: "flex",
  fontWeight:"600",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",

  "p": {

    fontWeight: "600",
    padding:"0.5rem 0"
  }
}


const icon = {}
function HowToPlay() {
  return (
    <div css={howToPlayWrapper} >
      <h1>HOW TO PLAY</h1>
      <div css={card}>
        <div css={text}>
          <p css={{ color: "#00FFFF" }}>1.SELECT</p>
          <p>SELECT THE COMPETITION AND THE DESIRED NUMBER OF ENTRIES</p>
        </div>
        <div css={icon}>1</div>
      </div>
      <div css={card}>
        <div css={text}>
          <p css={{ color: "#00FFFF" }}>2.ANSWER</p>
          <p>ANSWER THE QUALIFYING QUESTION AND COMPLETE PAYMENT</p>
        </div>
        <div css={icon}>2</div>
      </div>
      <div css={card}>
        <div css={text}>
          <p css={{ color: "#00FFFF" }}>3.WAIT</p>
          <p>WAIT FOR THE COMPETITION TO LIVESTREAM ON FACEBOOK</p>
        </div>
        <div css={icon}>3</div>
      </div>
    </div>
  );
}

export default HowToPlay;