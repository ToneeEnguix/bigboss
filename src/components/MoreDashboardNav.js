import React from 'react';
/* @jsx jsx */
import { jsx } from '@emotion/core/';
import {
    NavLink,
} from "react-router-dom";

const style = {
    display: "flex",
    justifyContent: "space-between",

    width:"100%",
    marginTop: "2rem",
    alignItems: "center",
    color: "black",
    paddingBottom:"10rem",

    "ul": {

        width:"100%",
        display: "flex",
        flexDirection: "column",
        listStyle: "none"

    },

    "ul:first-of-type": {

        marginTop: "1rem"
    },

    "li": {
        padding: "0.5rem 0",
        width:"100%",
    },
    "a": {
        color: "inherit",
        textDecoration: "none",
        fontWeight:"bold",
        fontSize:"0.8rem",
        letterSpacing:"0.1rem"

    },

    ".active": {

        color: "#00C6D6"
    }


}

export default class MoreDashboardNav extends React.Component {

    render() {

        return (
            <div  css={{borderRight:"1px solid #868686", width:"15%" , minHeight:"50vh"}}>  
                <nav css={style}>
                    <ul>
                        <li>
                            <NavLink activeClassName={"active"} to="./about">ABOUT US</NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName={"active"} to="./faq">FAQ</NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName={"active"} to="./terms">TERMS</NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName={"active"} to="./privacy">PRIVACY</NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName={"active"} to="./careers">CAREERS</NavLink>
                        </li>
                    </ul>
                </nav>
            
            </div>
        )
    }

}
