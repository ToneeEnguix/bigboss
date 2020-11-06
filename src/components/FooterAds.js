import React from "react";
/** @jsx jsx */
import { jsx } from "@emotion/core";
import { ReactComponent as BigBossLogo } from "../resources/BigBossLogo.svg";
import { ReactComponent as GambleAware } from "../resources/GambleAware.svg";
import googlepng from "../resources/googlepng.png";
import { useLocation } from "react-router-dom";

const footerWrapper = {
  display: "grid",

  margin: "0 5%",
  gridTemplateColumns: "1fr 1fr 1fr",
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
      <div css={{display:"flex", justifyContent:"flex-start", alignItems:"center"}}>
        <BigBossLogo height={"100px"} />
      </div>
      <div css={{display:"flex", justifyContent:"center",alignItems:"center"}}>
        <img
          css={{ height: "100px", alignSelf: "center" }}
          src={googlepng}
          alt="Google logo"
        />
      </div>
      <div css={{display:"flex", justifyContent:"flex-end",alignItems:"center"}}>
        <GambleAware x={"50px"} height={"50px"} />
      </div>
    </div>
  );
}

export default FooterAds;
