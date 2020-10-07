import React, { useEffect, useState } from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { formatDate } from "../utils/formatDate.js";

const card = {


    display: "flex",
    margin: "1.5rem 0",
    boxShadow: "15px 10px 30px 0px rgba(0,0,0,16%)",
    flexDirection: "column",
    textTransform: "uppercase",
    borderRadius: "4%",
    overflow: "hidden",
    width: "45%"

}


const text = {

    display: "flex",
    flexDirection: "column",
    padding: "2rem 4rem 3rem 4rem",

    "p": {

        margin: "1rem 0 0 0"
    }
}

const video = {

    padding: "0 2rem",

}


function EntryCard(props) {

    const [dateFormat, setDateFormat] = useState([0, 0, 0, 0])

    useEffect(() => {

        const array = formatDate(props.winner.entriesDate)
        setDateFormat(array);
    }, [props])




    return (
        <div css={card}>
            <div css={text}>
                <p css={{ color: "grey" }}>{props.winner.title} ENTRY</p>
                <p >{props.winner.prize}</p>
                <p css={{ color: "#00C6D6" }}>PUBLISHED ON {dateFormat[1]} {dateFormat[2]} {dateFormat[0]}</p>
            </div>
            <a css={{ width: "100%", display: "flex", justifyContent: "center", paddingBottom:"3rem"}} href={props.winner.entriesURL}>
                <p css={{ color: "#00C6D6" }}>
                    VIEW ENTRIES
                    </p>
            </a>

        </div>
    );
}

export default EntryCard;