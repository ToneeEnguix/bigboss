import React, { useState, useEffect } from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { get } from "../api/fetch";
import EntryCard from "../components/EntryCard";
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
const drawWrap = {

  marginTop: "2rem",
  display: "flex",
  justifyContent: "space-evenly",
  flexWrap: "wrap"
}
function Entries() {

  const [entries, setEntries] = useState([]);
  const [error, setError] = useState(false)


  async function getAllEntries() {
    const entries = await get("/competitions/past");

    if (entries.ok) {

      setEntries(entries.data);
    }
    else {
      setError(true);
    }
  }

  useEffect(() => {

    getAllEntries();

  }, [])

  if (error) {
    return (
      <Redirect to={"/error"} />
    )
  }

  return (
    <div css={contentWrapper}>

      <h1>ENTRIES</h1>

      <div css={drawWrap}>

        {entries.length > 0 ?
          entries.map((winner, index) => {
            return (<EntryCard key={index} winner={winner} />)
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

export default Entries;