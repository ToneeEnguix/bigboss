import React, { useState } from "react";
/* @jsx jsx */
import { jsx } from "@emotion/core/";
import { post } from "../api/fetch";

const accountInput = {
  border: "none",
  borderBottom: "1px dashed white !important",
  boxShadow: "none",
  outline: "none",
  padding: "0.75rem 0.75rem 0.5rem 0",
};

const inputWrapper = {
  margin: "0.5rem 1rem",
  display: "flex",
  flexDirection: "column",

  "input:-webkit-autofill,input:-webkit-autofill:hover,input:-webkit-autofill:focus,input:-webkit-autofill:active": {
    boxShadow: "0 0 0 30px #252525 inset !important;",
    WebkitTextFillColor: "white !important",
    appearance: "none",
    borderBottom: "none",
  },
};

const columns = {
  marginLeft: "3rem",
  display: "grid",
  gridTemplateRows: "repeat(3, 1fr)",
  gridTemplateColumns: "repeat(3,1fr)",
  gridAutoFlow: "column",
  width: "100%",
  marginBottom: "3rem",

  "div label": {
    fontWeight: "600",
    fontSize: "0.7rem",
    letterSpacing: "0.1rem",
  },
};
function Account() {
  return (
    <form
      css={{
        height: "50vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "70%",
      }}
    >
      <div css={columns}>
        <div css={inputWrapper}>
          <label htmlFor="name">FORENAME</label>
          <input css={accountInput} />
        </div>
        <div css={inputWrapper}>
          <label htmlFor="surName">SURNAME</label>
          <input css={accountInput} />
        </div>
        <div css={inputWrapper}>
          <label htmlFor="email">EMAIL</label>
          <input css={accountInput} />
        </div>
        <div css={inputWrapper}>
          <label htmlFor="phone">TELEPHONE NUMBER</label>
          <input css={accountInput} />
        </div>
        <div css={inputWrapper}>
          <label htmlFor="adress">ADRESS</label>
          <input css={accountInput} />
        </div>
        <div css={inputWrapper}>
          <label htmlFor="city">CITY</label>
          <input css={accountInput} />
        </div>
        <div css={inputWrapper}>
          <label htmlFor="county">COUNTY</label>
          <input css={accountInput} />
        </div>
        <div css={inputWrapper}>
          <label htmlFor="postcode">POSTCODE</label>
          <input css={accountInput} />
        </div>
        <div css={inputWrapper}>
          <label htmlFor="country">COUNTRY</label>
          <input css={accountInput} />
        </div>
      </div>
      <button css={{ width: "50%" }} className="button01">
        SAVE DETAILS
      </button>
    </form>
  );
}

export default Account;
