import React, { useState, useEffect } from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core';


const contentWrapper = {

  margin: "4rem 0rem",

  "h1": {

    marginLeft: "4rem"
  }

}

const errorWrap = {

  marginTop: "2rem",
  display: "flex",
  justifyContent: "space-evenly",
  flexWrap: "wrap"
}

function Error() {



  return (
    <div css={contentWrapper}>

      <h1>ERROR</h1>

      <div css={errorWrap}>

        <div css={{ padding: "4rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <h1 >SOMETHING WENT WRONG</h1>
          <p>Please try again later.</p>
        </div>

      </div>
    </div>
  );
}

export default Error;