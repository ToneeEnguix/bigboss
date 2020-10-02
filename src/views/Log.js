import React from 'react';

/** @jsx jsx */
import { jsx } from '@emotion/core';
import LogIn from "../components/LogIn.js";
import CreateAccountAccess from "../components/CreateAccountAccess.js";

const logWrapper={

  display:"flex",
  alignItems:"center",



}
function Log() {
  return (
    <div css={logWrapper}>
      <LogIn/>
      <CreateAccountAccess/>
    </div>
  );
}

export default Log;