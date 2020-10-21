import React from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core';

const footerWrapper = {

  display: "flex",
  alignItems: "center",
  margin: "0 5%",
  justifyContent: "space-between",
  marginTop: "4rem",
  flexDirection:"column",

  "h1": {

    marginBottom: "2rem"
  }

}

const card = {
  boxShadow: "-1px 4px 22px 0px black",
  display: "flex",
  height:"8rem",
  alignItems: "center",
  width: "20rem",
  padding: "0 1rem",
  borderRadius: "4%",
  "span": {

    fontSize: "80px",
    borderRadius: "4%"
  }
}

const triangle = {

  width: "0",
  height: "0",
  borderTop: "1rem solid transparent",
  borderBottom: "1rem solid transparent",

  borderLeft: "1rem solid white"
}

function FooterLinks() {
  return (
    <div css={footerWrapper}>

      <div css={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center" }}>
        <div css={card}>
          <span className="material-icons">
            looks_one
</span>
          <div css={{ display: "flex", flexDirection: "column", padding: "0 0.5rem", margin: "1.5rem 0" }}>
            <p css={{ fontSize: "0.7rem" }}>CHOOSE YOUR DRAW</p>
            <p css={{ fontWeight: "500", fontSize: "0.6rem", paddingTop: "0.2rem" }}>Real Competitions! Real prizes! Absolutely guaranteed Giveaways and prices</p>
          </div>
        </div>
        <div css={triangle}></div>
        <div css={card}>
          <span className="material-icons">
            looks_two
</span>
          <div css={{ display: "flex", flexDirection: "column", padding: "0 0.5rem", margin: "1.5rem 0" }}>
            <p css={{ fontSize: "0.7rem" }}>ANSWER THE QUALIFIER</p>
            <p css={{ fontWeight: "500", fontSize: "0.6rem", paddingTop: "0.2rem" }}>We ensure the abolute best prizes and guarantee the totally most amazing items.</p>
          </div>
        </div>
        <div css={triangle}></div>
        <div css={card}>
          <span className="material-icons">
            looks_3
</span>
          <div css={{ display: "flex", flexDirection: "column", padding: "0 0.5rem", margin: "1.5rem 0" }}>
            <p css={{ fontSize: "0.7rem" }}>SIT TIGHT</p>
            <p css={{ fontWeight: "500", fontSize: "0.6rem", paddingTop: "0.2rem" }}>We make sure your safety and fun are protected. We encrypt all data keeping your protected.</p>
          </div>
        </div>
      </div>
      <div css={{ margin:"2rem 0", display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center" }}>
        <div css={card}>
          <span className="material-icons">
            looks_one
</span>
          <div css={{ display: "flex", flexDirection: "column", padding: "0 0.5rem", margin: "1.5rem 0" }}>
            <p css={{ fontSize: "0.7rem" }}>CHOOSE YOUR DRAW</p>
            <p css={{ fontWeight: "500", fontSize: "0.6rem", paddingTop: "0.2rem" }}>Real Competitions! Real prizes! Absolutely guaranteed Giveaways and prices</p>
          </div>
        </div>

        <div css={card}>
          <span className="material-icons">
            looks_two
</span>
          <div css={{ display: "flex", flexDirection: "column", padding: "0 0.5rem", margin: "1.5rem 0" }}>
            <p css={{ fontSize: "0.7rem" }}>ANSWER THE QUALIFIER</p>
            <p css={{ fontWeight: "500", fontSize: "0.6rem", paddingTop: "0.2rem" }}>We ensure the abolute best prizes and guarantee the totally most amazing items.</p>
          </div>
        </div>
       
        <div css={card}>
          <span className="material-icons">
            looks_3
</span>
          <div css={{  display: "flex", flexDirection: "column", padding: "0 0.5rem", margin: "1.5rem 0" }}>
            <p css={{ fontSize: "0.7rem" }}>SIT TIGHT</p>
            <p css={{ fontWeight: "500", fontSize: "0.6rem", paddingTop: "0.2rem" }}>We make sure your safety and fun are protected. We encrypt all data keeping your protected.</p>
          </div>
        </div>
      </div>
      <div css={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center" }}>
        <div css={card}>
          <span className="material-icons">
            looks_one
</span>
          <div css={{ display: "flex", flexDirection: "column", padding: "0 0.5rem", margin: "1.5rem 0" }}>
            <p css={{ fontSize: "0.7rem" }}>CHOOSE YOUR DRAW</p>
            <p css={{ fontWeight: "500", fontSize: "0.6rem", paddingTop: "0.2rem" }}>Real Competitions! Real prizes! Absolutely guaranteed Giveaways and prices</p>
          </div>
        </div>

        <div css={card}>
          <span className="material-icons">
            looks_two
</span>
          <div css={{ display: "flex", flexDirection: "column", padding: "0 0.5rem", margin: "1.5rem 0" }}>
            <p css={{ fontSize: "0.7rem" }}>ANSWER THE QUALIFIER</p>
            <p css={{ fontWeight: "500", fontSize: "0.6rem", paddingTop: "0.2rem" }}>We ensure the abolute best prizes and guarantee the totally most amazing items.</p>
          </div>
        </div>
      
        <div css={card}>
          <span className="material-icons">
            looks_3
</span>
          <div css={{ display: "flex", flexDirection: "column", padding: "0 0.5rem", margin: "1.5rem 0" }}>
            <p css={{ fontSize: "0.7rem" }}>SIT TIGHT</p>
            <p css={{ fontWeight: "500", fontSize: "0.6rem", paddingTop: "0.2rem" }}>We make sure your safety and fun are protected. We encrypt all data keeping your protected.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FooterLinks;