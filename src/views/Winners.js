import React, { useState, useEffect } from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { get } from "../api/fetch";
import WinnerCard from "../components/WinnerCard";
import { Redirect } from "react-router-dom";
import facepaint from 'facepaint';
const breakpoints = [576, 950, 992, 1200]

const mq = facepaint(
  breakpoints.map(bp => `@media (min-width: ${bp}px)`));


const contentWrapper=mq({

  margin:"4rem 0rem",

  "h1":{

    marginLeft:["0rem","0rem","4rem","4rem"],
    textAlign:["center","center","left","left"]
  }

})
const winnersWrap = {

  marginTop: "2rem",
  display: "flex",
  justifyContent: "space-evenly",
  flexWrap: "wrap"
}
function Winners() {

  const [winners, setWinners] = useState([]);
  const [error, setError] = useState(false)


  async function getAllWinners() {
    const winners = await get("/competitions/winners");

    if (winners.ok) {
      setWinners(winners.data);
    }
    else {
      setError(true);
    }
  }

  useEffect(() => {

    getAllWinners();

  })

  if (error) {
    return (
      <Redirect to={"/error"} />
    )
  }

  return (
    <div css={contentWrapper}>

      <h1>WINNERS</h1>

      <div css={winnersWrap}>

        {winners.length > 0 ?
          winners.map((winner, index) => {
            return (<WinnerCard key={index} winner={winner} />)
          }) :
          <div css={{ padding: "4rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <h1 >NOTHING TO SEE HERE YET!!</h1>
            <p css={{textAlign:"center"}}>Soon this section will have something for you!</p>
          </div>
        }
      </div>
    </div>
  );
}

export default Winners;