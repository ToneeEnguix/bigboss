import React, { useState, useEffect } from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { get } from "../api/fetch";
import EntryCard from "../components/EntryCard";
import { Redirect } from "react-router-dom"


const contentWrapper = {

  margin: "4rem 0rem",

  "h1": {

    marginLeft: "4rem"
  }

}

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
    const entries = await get("/competitions/entries");

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

        {entries.length < 0 ?
          entries.map((winner, index) => {
            return (<EntryCard key={index} winner={winner} />)
          }) :
          <div css={{ padding: "4rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <h1 >NOTHING TO SEE HERE YET!!</h1>
            <p>Soon this section will have something for you!</p>
          </div>
        }
      </div>
    </div>
  );
}

export default Entries;