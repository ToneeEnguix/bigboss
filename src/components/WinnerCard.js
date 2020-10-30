import React, { useState, useEffect } from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core';



const card = {


    display: "flex",
    margin: "1.5rem 0",
    boxShadow: "0px 2px 4px 0px rgba(0,0,0,16%)" ,
    justifyContent: "center",
    maxWidth:"600px",
    margin: "4rem 0",
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

        margin:"1.25rem 0 0 0"
    }
}


function WinnerCard({ winner }) {

    return (
        <div css={card}>

            <img css={image} src={winner.winnerPic} />
            <div css={text}>

                <p>{winner.prize}</p>
    <p css={{color:"#666666"}}> WON BY {winner.winner.name} {winner.winner.lastName}</p>
            </div>

        </div>
    );
}

export default WinnerCard;