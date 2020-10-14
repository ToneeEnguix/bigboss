import React from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { ReactComponent as BigBossLogo } from "../resources/BigBossLogo.svg";
import { ReactComponent as GambleAware} from "../resources/GambleAware.svg";
import { ReactComponent as Google } from "../resources/Google.svg";

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
    <BigBossLogo x={"60px"} height={"60px"} />
    <Google x={"400px"} y={"50px"}height={"150px"}/>
    <GambleAware x={"60px"} height={"30px"}/>
    </div>
  );
}

export default FooterAds;