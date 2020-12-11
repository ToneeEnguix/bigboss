import React from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core';
import facepaint from 'facepaint';

const breakpoints = [576, 950, 992, 1200]

const mq = facepaint(
  breakpoints.map(bp => `@media (min-width: ${bp}px)`));



function Privacy() {
  return (
    <div css={mq({ marginLeft: ["0","0","4rem","4rem"], width:["100%","100%","70%","70%"] })}>
    <h1 css={{marginBottom:"2rem"}}>PRIVACY POLICY</h1>

    <p css={mq({
      textAlign:"justify",
      paddingRight: ["0rem","2rem","2rem","2rem"],
       lineHeight:"2",
       fontWeight: "100",
       fontSize: "0.8rem", 

       letterSpacing:"0rem !important"
      })}>You are not bound by this website in any way and are free to use it however you please. This website does not collect information. This website does not retain any personal data. This website has been created in accordance with the laws surrounding GDPR and works in accordance with them. In the instance you choose to create an account, your name and email is retained by us. This facility is used to alert you in the instance that you are a winner. This information is purged from databases within 30 days in accordance with the laws surrounding GDPR as governed by the United Kingdom of Great Britain and Northern Ireland. Titantic Solutions Ltd Trading As Big Boss Competitions. Company Number NI655510. All Rights Reserved. 2020.</p>
    </div>
  );

}

export default Privacy;