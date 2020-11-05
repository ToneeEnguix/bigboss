import React, { useEffect, useState } from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core';
import ReactPlayer from 'react-player/facebook'
import {formatDate} from "../utils/formatDate.js";
import facepaint from 'facepaint';

const breakpoints = [576, 950, 1200, 1300]

const mq = facepaint(
  breakpoints.map(bp => `@media (min-width: ${bp}px)`));




const card = mq({


    display: "flex",
    margin: "2rem 4rem",
    minWidth:["550px","550px","600px","650px"],
    maxHeight:["450px","400px","550px","550px"],
    margin: "4rem 0",
    boxShadow: "0px 2px 4px 0px rgba(0,0,0,16%)",
    flexDirection: "column",
    textTransform: "uppercase",
    borderRadius: "4%",
    overflow: "hidden",

});


const text = {

    display: "flex",

    flexDirection: "column",
    padding: "1rem",

    "p": {

        margin: "1rem 0 0 0"
    }
}

const video = {

    padding: "0 2rem",



}


function DrawCard(props) {

    const [dateFormat, setDateFormat] = useState([0, 0, 0, 0])

    useEffect(() => {

        const array= formatDate(props.winner.entriesDate)
        setDateFormat(array);
    }, [props])

    

 


    return (
        <div css={card}>
            <div css={text}>
                <p css={{ color: "#00FFFF" }}>DRAWN ON</p>
                <p>{dateFormat[1]} {dateFormat[2]} {dateFormat[0]}</p>
            </div>
            <div css={video}>
                <ReactPlayer
                    width="auto"
                    url={props.winner.facebookURL}
                    controls
                />
            </div>


        </div>
    );
}

export default DrawCard;