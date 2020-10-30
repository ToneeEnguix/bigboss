import React from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Link } from "react-router-dom";
import Counter from "../utils/Counter";


const card = {

    boxShadow: "0px 2px 4px 0px rgba(0,0,0,16%)",
    display: "flex",
margin:"0 2rem",
    justifyContent: "center",
 
}

const textWrapper = {


    display: "flex",
    flexDirection: "column",
    "a": {
        display: "flex",
        justifyContent: "center"
    },
    padding:"1rem"

}


function OtherCompCard({ competition }) {

    return (
        <div css={card}>   
            <div css={textWrapper}>
                <h4 css={{ letterSpacing: "0.2rem",paddingLeft:"1.1rem", color: "#00FFFF", margin: "0.5rem 0", fontSize: "0.8rem" }}> {competition.title} ENTRY</h4>
                <h4 css={{ letterSpacing: "0.2rem", paddingLeft:"1.1rem", margin: "0.5rem 0", fontSize: "0.8rem" }}>£{competition.ticketPrice} PER ENTRY</h4>
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
           <img src={competition.pictures[0]} css={{maxWidth:"50%"}}/>
        </div>
    );
}

export default OtherCompCard;