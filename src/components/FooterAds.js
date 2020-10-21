import React from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { ReactComponent as BigBossLogo } from "../resources/BigBossLogo.svg";
import { ReactComponent as GambleAware} from "../resources/GambleAware.svg";
import googlepng from "../resources/googlepng.png"

const footerWrapper = {

  display: "flex",
  alignItems: "center",
  margin: "0 5%",
  justifyContent: "space-between",
  marginTop: "4rem",
  borderTop:"2px solid grey",


  "h1":{

    marginBottom:"2rem"
  }

}

function FooterAds() {
  return (
    <div css={footerWrapper}>
    <BigBossLogo height={"70px"} />
    <img css={{height:"70px"}} src={googlepng} alt="Google logo"/>

    <GambleAware x={"70px"} height={"30px"}/>
    </div>
  );
}

export default FooterAds;