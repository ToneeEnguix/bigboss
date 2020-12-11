import React from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core';
import facepaint from 'facepaint';


const breakpoints = [576, 950, 992, 1200]

const mq = facepaint(
  breakpoints.map(bp => `@media (min-width: ${bp}px)`));


function About() {
  return (
    <div  css={mq({ marginLeft: ["0","0","4rem","4rem"], width:["100%","100%","70%","70%"] })}>
      <h1 css={{ marginBottom: "2rem" }}>ABOUT US</h1>

      <p css={{
        textAlign: "justify",
        paddingRight: ["0rem","2rem","2rem","2rem"],
        lineHeight: "2",
        fontWeight: "100",
        fontSize: "0.8rem",

        letterSpacing: "0rem !important"
      }}>We are a brand new company designed to bring you the latest and greatest in awesome prizes. All draws are recorded in real time using Google random number generator and streamed on Facebook ensuring you can judge for yourself the authenticity of our giveaways. 100% totally transparent giveaways and prizes. Please, please gamble responsibly and when the fun stops, stop! So have fun. That's what we want you to do but be responsible aswell! Thanks guys. Enjoy the website!
      </p>
    </div>
  );
}

export default About;