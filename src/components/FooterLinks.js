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
  flexWrap:"wrap",

  "h1": {

    marginBottom: "2rem"
  }

}

const card = {
  boxShadow: "0px 2px 4px 0px rgba(0,0,0,16%)",
  display: "flex",
  alignItems: "center",
  width: "20rem",
  margin:"1rem 2rem",
  padding: "0 1rem",
  borderRadius: "6px",
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


const hiddentriangle = {

  visibility:"hidden",
  width: "0",
  height: "0",
  borderTop: "1rem solid transparent",
  borderBottom: "1rem solid transparent",

  borderLeft: "1rem solid white"
}

const descriptions={

   fontWeight: "100",
    fontSize: "0.6rem", 
    paddingTop: "0.2rem",
    lineHeight:"1rem",
    letterSpacing:"0rem !important"
}
function FooterLinks() {
  return (
    <div css={footerWrapper}>

      <div css={{ flexWrap:"wrap", display: "flex", width: "100%", justifyContent: "center", alignItems: "center" }}>
        <div css={card}>
          <span  css={{fontSize:"50px !important"}} className="material-icons">
            looks_one
</span>
          <div css={{ display: "flex", flexDirection: "column", padding: "0 0.5rem", margin: "1.5rem 0" }}>
            <p css={{ fontSize: "0.7rem" }}>CHOOSE YOUR DRAW</p>
            <p css={descriptions}>Real Competitions! Real prizes! Absolutely guaranteed Giveaways and prices</p>
          </div>
        </div>
        <div css={triangle}></div>
        <div css={card}>
          <span css={{fontSize:"50px !important"}} className="material-icons">
            looks_two
</span>
          <div css={{ display: "flex", flexDirection: "column", padding: "0 0.5rem", margin: "1.5rem 0" }}>
            <p css={{ fontSize: "0.7rem" }}>ANSWER THE QUALIFIER</p>
            <p css={descriptions}>We ensure the abolute best prizes and guarantee the totally most amazing items.</p>
          </div>
        </div>
        <div css={triangle}></div>
        <div css={card}>
          <span  css={{fontSize:"50px !important"}} className="material-icons">
            looks_3
</span>
          <div css={{ display: "flex", flexDirection: "column", padding: "0 0.5rem", margin: "1.5rem 0" }}>
            <p css={{ fontSize: "0.7rem" }}>SIT TIGHT</p>
            <p css={descriptions}>We make sure your safety and fun are protected. We encrypt all data keeping your protected.</p>
          </div>
        </div>
      </div>
      <div css={{ flexWrap:"wrap", margin:"2rem 0", display: "flex", width: "100%", justifyContent: "center", alignItems: "center" }}>
        <div css={card}>
      
          <div css={{ display: "flex", flexDirection: "column", padding: "0 0.5rem", margin: "1.5rem 0" }}>
            <p css={{ fontSize: "0.7rem" }}>WE ARE SO SOCIAL</p>
           <div css={{display:"flex"}}>


           </div>
          </div>
        </div>
        <div css={hiddentriangle}></div>
        <div css={card}>
          <span css={{fontSize:"50px !important"}} className="material-icons">
            business
</span>
          <div css={{ display: "flex", flexDirection: "column", padding: "0 0.5rem", margin: "1.5rem 0" }}>
            <p css={{ fontSize: "0.7rem" }}>ANSWER THE QUALIFIER</p>
            <p css={descriptions}>We ensure the abolute best prizes and guarantee the totally most amazing items.</p>
          </div>
        </div>
        <div css={hiddentriangle}></div>
        <div css={card}>
          <span css={{fontSize:"50px !important"}}  className="material-icons">
            help_outline
</span>
          <div css={{  display: "flex", flexDirection: "column", padding: "0 0.5rem", margin: "1.5rem 0" }}>
            <p css={{ fontSize: "0.7rem" }}>SIT TIGHT</p>
            <p css={descriptions}>We make sure your safety and fun are protected. We encrypt all data keeping your protected.</p>
          </div>
        </div>
      </div>
      <div css={{ flexWrap:"wrap", display: "flex", width: "100%", justifyContent: "center", alignItems: "center" }}>
        <div css={card}>
          <span css={{fontSize:"50px !important"}}  className="material-icons">
            biotech
</span>
          <div css={{ display: "flex", flexDirection: "column", padding: "0 0.5rem", margin: "1.5rem 0" }}>
            <p css={{ fontSize: "0.7rem" }}>CHOOSE YOUR DRAW</p>
            <p css={descriptions}>Real Competitions! Real prizes! Absolutely guaranteed Giveaways and prices</p>
          </div>
        </div>
        <div css={hiddentriangle}></div>
        <div css={card}>
        <span css={{fontSize:"50px !important"}} className="material-icons">
card_giftcard
</span>
          <div css={{ display: "flex", flexDirection: "column", padding: "0 0.5rem", margin: "1.5rem 0" }}>
            <p css={{ fontSize: "0.7rem" }}>ANSWER THE QUALIFIER</p>
            <p css={descriptions}>We ensure the abolute best prizes and guarantee the totally most amazing items.</p>
          </div>
        </div>
        <div css={hiddentriangle}></div>
        <div css={card}>
         <span css={{fontSize:"50px !important"}} className="material-icons">
verified_user
</span>
          <div css={{ display: "flex", flexDirection: "column", padding: "0 0.5rem", margin: "1.5rem 0" }}>
            <p css={{ fontSize: "0.7rem" }}>PRIVACY</p>
            <p css={descriptions}>We ensure your safety and fun. We encrypt all data keeping your protected.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FooterLinks;