import React, { useState, useEffect } from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core';



const card = {


    display: "flex",
    margin: "1.5rem 0",
    boxShadow: "15px 10px 30px 0px rgba(0,0,0,16%)",
    justifyContent: "center",
 
    width: "45%",
    flexDirection: "column",
    textTransform:"uppercase",
    borderRadius: "4%",
    overflow:"hidden"

}

const image = {

    maxWidth: "100%",

}

const text = {

    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    padding:"2rem 0",

    "p":{

        margin:"0.25rem 0 0 0"
    }
}


function WinnerCard({ winner }) {

    return (
        <div css={card}>

            <img css={image} src={winner.winnerPic} />
            <div css={text}>

                <p>{winner.prize}</p>
    <p css={{color:"#373737"}}> WON BY {winner.winner.name} {winner.winner.lastName}</p>
            </div>

        </div>
    );
}

export default WinnerCard;