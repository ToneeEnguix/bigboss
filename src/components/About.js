import React from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core';


function About() {
  return (
    <div css={{marginLeft:"4rem",display:"flex",flexDirection:"column",width:"70%"}}>
    <h1 css={{marginBottom:"2rem"}}>ABOUT US</h1>

    <p css={{paddingRight:"2rem",fontWeight:"600", lineHeight:"2"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus nisl ex, tempus vel lorem in, vestibulum egestas elit. Donec venenatis fringilla pellentesque. Sed ac rhoncus erat. Suspendisse hendrerit vestibulum ligula, quis laoreet ligula mattis sed. Fusce ullamcorper dui in justo ultrices, at rutrum libero posuere. Integer vitae nisl commodo, viverra ipsum ac, vehicula metus. In purus sapien, volutpat a elit ornare, volutpat efficitur risus.

Aliquam pretium nec felis nec efficitur. Suspendisse sed semper elit. Vestibulum vel felis suscipit, placerat elit quis, maximus neque. Aliquam dolor odio, dapibus et cursus nec, aliquet at sem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Curabitur laoreet malesuada elit vel auctor. Ut mollis rutrum leo, et tincidunt arcu ullamcorper non.</p>
    </div>
  );
}

export default About;