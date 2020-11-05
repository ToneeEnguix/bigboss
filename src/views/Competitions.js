import React, { useState, useEffect } from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { get } from "../api/fetch";
import CompetitionCard from "../components/CompetitionCard";
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
    const competitions = await get("/competitions/active");

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

    
      { competitions.length>0 ?
        competitions.map((competition, index) => {
          return (<CompetitionCard key={index} competition={competition} />)
        }):
        <div css={{padding:"4rem", display:"flex", flexDirection:"column", alignItems:"center"}}>
        <h1 >NOTHING TO SEE HERE YET!!</h1>
        <p>Soon this section will have something for you!</p>
        </div>
      }
      </div>
    </div>
  );
}

export default Competitions;