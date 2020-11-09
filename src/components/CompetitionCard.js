import React from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Link } from "react-router-dom";
import Counter from "../utils/Counter";
import facepaint from "facepaint";

const breakpoints = [576, 950, 992, 1200];

const mq = facepaint(breakpoints.map((bp) => `@media (min-width: ${bp}px)`));


const card = mq({


    display: "flex",
  
    boxShadow: "0px 2px 4px 0px rgba(0,0,0,16%)",
    justifyContent: "center",
    flexDirection:"column",
    borderRadius: "4%",
    overflow:"hidden",
    maxWidth:"600px",
    margin: "4rem 0",

});

const textWrapper = {


    display: "flex",
    flexDirection: "column",
    padding: "1rem",

    marginBottom: "1rem",

    "a": {
        display: "flex",
        justifyContent: "center"
    }

}


function CompetitionCard({ competition }) {

    return (
        <div css={card}>
                <img css={{ maxWidth: "100%" }} src={competition.pictures[0]} />
     
            <div css={textWrapper}>
                <h4 css={{ letterSpacing: "0.2rem", color: "#00FFFF", margin: "0.5rem 0", fontSize: "0.8rem" }}> {competition.title} ENTRY</h4>
                <h4 css={{ letterSpacing: "0.2rem", margin: "0.5rem 0", fontSize: "0.8rem" }}>£{competition.ticketPrice} PER ENTRY</h4>
                <Counter date={competition.dateFinishes} />
                <Link to={{
                    pathname: `/competitions/${competition._id}`,
                    state: {
                        competition: competition,
                    }
                }}>
                    <button className="button01"> VIEW DETAILS</button>
                </Link>
            </div>

          

        </div>
    );
}

export default CompetitionCard;