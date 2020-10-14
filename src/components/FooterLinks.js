import React from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core';

const footerWrapper = {

  display: "flex",
  alignItems: "center",
  margin: "0 5%",
  justifyContent: "space-between",
  marginTop: "4rem",

  "h1":{

    marginBottom:"2rem"
  }

}


function FooterLinks() {
  return (
    <div css={footerWrapper}>
    FooterLinks
    </div>
  );
}

export default FooterLinks;