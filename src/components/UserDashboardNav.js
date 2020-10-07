import React from 'react';
/* @jsx jsx */
import { jsx } from '@emotion/core/';
import {
    NavLink,
} from "react-router-dom";

const style = {
    display: "flex",
    justifyContent: "space-between",

    width:"80%",
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

    "ul:first-child": {

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

export default class UserDashboardNav extends React.Component {

    render() {

        return (
            <div  css={{borderRight:"1px solid #868686", width:"20%"}}>  
                <nav css={style}>
                    <ul>
                        <li>
                            <NavLink activeClassName={"active"} to="./details">ACCOUNT DETAILS</NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName={"active"} to="./orders">ORDER HISTORY</NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName={"active"} to="./password">PASSWORD</NavLink>
                        </li>
                    </ul>
                </nav>
            
            </div>
        )
    }

}
