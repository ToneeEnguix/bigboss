/** @jsx jsx */
import { jsx } from "@emotion/core";
/* eslint-disable no-unused-vars */
var React = require("react");
/* eslint-enable no-unused-vars */

function Careers() {
  return (
    <div
      css={{
        marginLeft: "4rem",
        display: "flex",
        flexDirection: "column",
        width: "70%",
      }}
    >
      <h1 css={{ marginBottom: "2rem" }}>CAREERS</h1>

      <p
        css={{
          textAlign: "justify",
          paddingRight: "2rem",
          fontWeight: "600",
          lineHeight: "2",
        }}
      >
        KEEP POSTED HERE FOR FUTURE CAREER OPENINGS.
      </p>
    </div>
  );
}

export default Careers;
