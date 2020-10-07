import React, { useState, useEffect } from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { get } from "../api/fetch";
import WinnerCard from "../components/WinnerCard";
import { Redirect } from "react-router-dom"


const contentWrapper={

  margin:"4rem 0rem",

  "h1":{

    marginLeft:"4rem"
  }

}

const winnersWrap={

  marginTop:"2rem",
  display:"flex",
  justifyContent:"space-evenly",
  flexWrap:"wrap"
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

      {
        winners.map((winner, index) => {
          return (<WinnerCard key={index} winner={winner} />)
        })
      }
      </div>
    </div>
  );
}

export default Winners;