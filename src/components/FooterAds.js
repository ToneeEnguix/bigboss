import React from "react";
/** @jsx jsx */
import { jsx } from "@emotion/core";
import { ReactComponent as BigBossLogo } from "../resources/BigBossLogo.svg";
import { ReactComponent as GambleAware } from "../resources/GambleAware.svg";
import googlepng from "../resources/googlepng.png";
import { useLocation } from "react-router-dom";

const footerWrapper = {
  display: "flex",
  alignItems: "center",
  margin: "0 5%",
  justifyContent: "space-between",
  marginTop: "4rem",
  borderTop: "2px solid grey",

  h1: {
    marginBottom: "2rem",
  },

  ">*": {
    paddingTop: "2rem",
  },
};

function FooterAds() {
  const location = useLocation();

  return (
    <div
      css={footerWrapper}
      style={{
        display: location.pathname.includes("admin") && "none",
      }}
    >
      <BigBossLogo height={"100px"} />
      <img
        css={{ height: "100px", alignSelf: "center" }}
        src={googlepng}
        alt="Google logo"
      />

      <GambleAware x={"100px"} height={"100px"} />
    </div>
  );
}

export default FooterAds;
