import React, { useEffect, useState } from "react";
/** @jsx jsx */
import { jsx } from "@emotion/core";
import { formatDate } from "../utils/formatDate.js";
import facepaint from "facepaint";
import { Link } from "react-router-dom";

const breakpoints = [576, 950, 1200, 1300];

const mq = facepaint(breakpoints.map((bp) => `@media (min-width: ${bp}px)`));

const card = mq({
  display: "flex",
  margin: ["3rem 1rem", "4rem 0rem", "4rem 1rem", "4rem 1rem"],
  boxShadow: "0px 2px 4px 0px rgba(0,0,0,16%)",
  flexDirection: "column",
  textTransform: "uppercase",
  borderRadius: "4%",
  overflow: "hidden",
  maxWidth: "600px",
  margin: "4rem 0",
});

const text = {
  display: "flex",
  flexDirection: "column",
  padding: "2rem 4rem 3rem 4rem",

  p: {
    margin: "1rem 0 0 0",
  },

  span: {
    cursor: "pointer",
  },
};

function EntryCard(props) {
  const [dateFormat, setDateFormat] = useState([0, 0, 0, 0]);

  useEffect(() => {
    const array = formatDate(props.winner.dateFinishes);
    setDateFormat(array);
  }, [props]);

  return (
    <div css={card}>
      <div css={text}>
        <p css={{ color: "grey" }}>{props.winner.title} ENTRY</p>
        <p>{props.winner.prize}</p>
        <p css={{ color: "#00FFFF", marginBottom: "1rem !important" }}>
          PUBLISHED ON {dateFormat[1]} {dateFormat[2]} {dateFormat[0]}
        </p>
      </div>
      <a
        css={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          paddingBottom: "3rem",
        }}
        href={props.winner.entriesURL}
      >
        <Link
          to={{
            pathname: `/entries/${props.winner._id}`,
            state: {
              competitionName: props.winner.title,
            },
          }}
          css={{ color: "#00FFFF" }}
        >
          <p>VIEW ENTRIES</p>
        </Link>
      </a>
    </div>
  );
}

export default EntryCard;
