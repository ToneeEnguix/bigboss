/** @jsx jsx */
import { jsx } from "@emotion/core";
import LogIn from "../components/LogIn.js";
import CreateAccountAccess from "../components/CreateAccountAccess.js";
/* eslint-disable no-unused-vars */
var React = require("react");
/* eslint-enable no-unused-vars */

function Log() {
  return (
    <div css={logWrapper}>
      <LogIn />
      <CreateAccountAccess />
    </div>
  );
}

const logWrapper = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-around",
  flexWrap: "wrap",
};

export default Log;
