import React from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core';

const recentWinnersWrapper={

  display:"flex",
  justifyContent:"center",
  width:"100%"
}
function RecentWinners() {
  return (
    <div css={recentWinnersWrapper}>
        <h1> RECENT WINNERS</h1>
    </div>
  );
}
export default RecentWinners;