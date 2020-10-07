import React from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Link } from "react-router-dom";
import Counter from "../utils/Counter";


const card = {


    display: "flex",
    margin: "1.5rem 0",
    boxShadow: "15px 10px 30px 0px rgba(0,0,0,16%)",
    justifyContent: "center",
    flexDirection:"column",
    borderRadius: "4%",
    overflow:"hidden",
    width:"45%"

}

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
                <h4 css={{ letterSpacing: "0.2rem", color: "#00C6D6", margin: "0.5rem 0", fontSize: "0.8rem" }}> {competition.title} ENTRY</h4>
                <h4 css={{ letterSpacing: "0.2rem", margin: "0.5rem 0", fontSize: "0.8rem" }}>£{competition.ticketPrice} PER ENTRY</h4>
                <Counter date={competition.dateFinishes} />
                <Link to={{
                    pathname: "/competitiondetails",
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