import React from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Link } from "react-router-dom";
import Counter from "../utils/Counter";


const card = {


    display: "flex",
margin:"0 2rem",
    justifyContent: "center",
 
}

const textWrapper = {

  boxShadow: "-1px 2px 2px 0px black",
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
           <img src={competition.pictures[0]} css={{maxWidth:"50%"}}/>
        </div>
    );
}

export default OtherCompCard;