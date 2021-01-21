import { useEffect } from "react";
/** @jsx jsx */
import { jsx } from "@emotion/core";
/* eslint-disable no-unused-vars */
var React = require("react");
/* eslint-enable no-unused-vars */

function Bye() {
  useEffect(() => {
    sessionStorage.setItem("bye", true);
  }, []);

  return (
    <div css={contentWrapper}>
      <h1>Thank you for your purchase.</h1>
      <p>
        Your tickets have been sucessfully bought. You may close this window
        now.
      </p>
    </div>
  );
}

const contentWrapper = {
  margin: "4rem 4rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

export default Bye;
