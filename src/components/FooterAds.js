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
  },

  ">*":{

    paddingTop:"2rem"
  }

}

function FooterAds() {
  return (
    <div css={footerWrapper}>
    <BigBossLogo height={"100px"} />
    <img css={{height:"100px", alignSelf:"center"}} src={googlepng} alt="Google logo"/>

    <GambleAware x={"100px"} height={"100px"}/>
    </div>
  );
}

export default FooterAds;