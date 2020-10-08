import React from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Link } from "react-router-dom";
import Counter from "../utils/Counter";

const card = {


    display: "flex",
    margin: "1.5rem 0",
    boxShadow: "-1px 4px 22px 0px black",
    justifyContent: "center",
    flexDirection:"column",
    borderRadius: "4%",
    overflow:"hidden",
    width:"100%"

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


function BasketCard({ competition }) {

    return (
        <div css={card}>
             HOLA
            </div>

          

    
    );
}

export default BasketCard;