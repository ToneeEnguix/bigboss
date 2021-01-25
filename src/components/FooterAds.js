import React from "react";
/** @jsx jsx */
import { jsx } from "@emotion/core";
import { ReactComponent as BigBossLogo } from "../resources/BigBossLogo.svg";
import { ReactComponent as GambleAware } from "../resources/GambleAware.svg";
import googlepng from "../resources/googlepng.png";
import { useLocation } from "react-router-dom";
import facepaint from "facepaint";

function FooterAds() {
  const location = useLocation();

  return (
    <div
      css={footerWrapper}
      style={{
        display: location.pathname.includes("admin") && "none",
      }}
    >
      <div
        css={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <BigBossLogo height={"100px"} />
      </div>
      <div
        css={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          css={{ height: "100px", alignSelf: "center" }}
          src={googlepng}
          alt="Google logo"
        />
      </div>
      <div
        css={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <GambleAware x={"50px"} height={"50px"} />
      </div>
    </div>
  );
}

const breakpoints = [838, 950];
const mq = facepaint(breakpoints.map((bp) => `@media (min-width: ${bp}px)`));
const footerWrapper = mq({
  display: ["flex", "grid"],
  flexDirection: "column",
  alignItems: "center",
  margin: "0 5% 40px",
  gridTemplateColumns: "1fr 1fr 1fr",
  marginTop: "4rem",
  borderTop: "2px solid grey",
  h1: {
    marginBottom: "2rem",
  },
  ">*": {
    paddingTop: "2rem",
  },
});

export default FooterAds;
