import React, { useState, useEffect } from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { get } from "../api/fetch";
import CompetitionCard from "../components/CompetitionCard";
import { Redirect } from "react-router-dom"


const contentWrapper={

  margin:"4rem 0rem",

  "h1":{

    marginLeft:"4rem"
  }

}

const competitionsWrap={

  marginTop:"2rem",
  display:"flex",
  justifyContent:"space-evenly",
  flexWrap:"wrap"
}
function Competitions() {

  const [competitions, setCompetitions] = useState([]);
  const [error, setError] = useState(false);


  async function getAllCompetitions() {
    const competitions = await get("/competitions/all");

    if (competitions.ok) {
      setCompetitions(competitions.data);
    }
    else {
      setError(true);
    }
  }

  useEffect(() => {

    getAllCompetitions();

  },[])

  if (error) {
    return (
      <Redirect to={"/error"} />
    )
  }

  return (
    <div css={contentWrapper}>
      <h1>ALL COMPETITIONS</h1>

      <div css={competitionsWrap}> 

      {
        competitions.map((competition, index) => {
          return (<CompetitionCard key={index} competition={competition} />)
        })
      }
      </div>
    </div>
  );
}

export default Competitions;