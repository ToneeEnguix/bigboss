import React, { useEffect, useState } from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core';
import ReactPlayer from 'react-player/facebook'
import {formatDate} from "../utils/formatDate.js";



const card = {


    display: "flex",
    margin: "1.5rem 0",
    width:"45%",
    boxShadow: "-1px 4px 22px 0px black",
    flexDirection: "column",
    textTransform: "uppercase",
    borderRadius: "4%",
    overflow: "hidden",

}


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

        const array= formatDate(props.winner.dateFinishes)
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
                    url="https://www.facebook.com/earthescapevids/videos/764858494045462/"
                    controls
                />
            </div>


        </div>
    );
}

export default DrawCard;