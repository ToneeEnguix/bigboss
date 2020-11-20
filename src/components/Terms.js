import React from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core';
import facepaint from 'facepaint';


const breakpoints = [576, 950, 992, 1200]

const mq = facepaint(
  breakpoints.map(bp => `@media (min-width: ${bp}px)`));


function Terms() {
  return (
    <div css={mq({ marginLeft: ["0","0","4rem","4rem"], width:["100%","100%","70%","70%"] })}>
      <h1 css={mq({ marginBottom: "2rem",textAlign:["center","left","left","left"] })} >TERMS AND CONDITIONS</h1>
      <p css={mq({

        textAlign: "justify",
        paddingRight: ["0rem","2rem","2rem","2rem"],
        lineHeight: "2",
        fontWeight: "100",
        fontSize: "0.8rem",

        letterSpacing: "0rem !important"

      })}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus nisl ex, tempus vel lorem in, vestibulum egestas elit. Donec venenatis fringilla pellentesque. Sed ac rhoncus erat. Suspendisse hendrerit vestibulum ligula, quis laoreet ligula mattis sed. Fusce ullamcorper dui in justo ultrices, at rutrum libero posuere. Integer vitae nisl commodo, viverra ipsum ac, vehicula metus. In purus sapien, volutpat a elit ornare, volutpat efficitur risus.

Aliquam pretium nec felis nec efficitur. Suspendisse sed semper elit. Vestibulum vel felis suscipit, placerat elit quis, maximus neque. Aliquam dolor odio, dapibus et cursus nec, aliquet at sem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Curabitur laoreet malesuada elit vel auctor. Ut mollis rutrum leo, et tincidunt arcu ullamcorper non.</p>
    </div>
  );

}

export default Terms;