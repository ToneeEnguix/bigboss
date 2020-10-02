/** @jsx jsx */
import { jsx } from '@emotion/core';


import React, { useContext } from 'react'
import { ReactComponent as BigBossLogo } from "../resources/BigBossLogo.svg";

import UserContext from "../context/UserContext"
import { NavLink } from "react-router-dom";

const flexContainer = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  boxShadow: "10px 10px 5px 0px rgba(0,0,0,16%)",
  marginBottom:"1.3rem",

  padding: "0.5rem",

  "a": {

    textDecoration: "none"
  }

}

const menu = {

  display: "flex",
  listStyle: "none",
  width: "60%",
  marginRight: "10rem",
  justifyContent: "space-between",

  "& li:hover": {
    cursor: "pointer",

  },

  "a, strong": {

    fontWeight: "600",
    fontSize: "0.7rem",
    letterSpacing: "0.3rem"
  },

  "& a:after,strong:after": {
    display: "block",
    content: '""',
    position: "relative",
    top: "2rem",
    borderBottom: "solid 3px #00C6D6",
    transform: "scaleX(0)",
    transition: "transform 100ms ease-in-out"
  },

  "a:hover:after,strong:hover:after": {

    transform: "scaleX(1)"
  },

  ".active:after": {
    display: "block",
    content: '""',
    position: "relative",
    top: "2rem",
    borderBottom: "solid 3px #00C6D6",
    transform: "scaleX(1)",
    transition: "transform 100ms ease-in-out"

  }

}



const icons = {

  display: "flex",
  marginRight:"1rem",



  "div": {

    cursor: "pointer",
  },
  "a,span": {
    fontWeight: "600",
    fontSize: "0.7rem",
    letterSpacing: "0.3rem"
  },


  ".icon:after": {
    display: "block",
    content: '""',
    position: "relative",
    top: "2rem",
    borderBottom: "solid 3px #00C6D6",
    transform: "scaleX(0)",
    transition: "transform 100ms ease-in-out"
  },

  ".icon:hover:after": {

    transform: "scaleX(1)"
  },

  ".active:after": {
    display: "block",
    content: '""',
    position: "relative",
    top: "2rem",
    borderBottom: "solid 3px #00C6D6",
    transform: "scaleX(1)",
    transition: "transform 100ms ease-in-out"

  }
}


function NavBar() {

  const context = useContext(UserContext)

  return (
    <div css={flexContainer}>
      <BigBossLogo css={{marginLeft:"1rem"}}height={"65px"} width={"65px"}/>

      <ul css={menu}>
        <li>
          <NavLink activeClassName={"active"} to="/home">
            HOME
            </NavLink>
        </li>
        <li>
          <NavLink activeClassName={"active"} to="/competitions">
            COMPETITIONS
            </NavLink>
        </li>
        <li>
          <NavLink activeClassName={"active"} to="/winners">
            WINNERS
            </NavLink>
        </li>
        <li>
          <NavLink activeClassName={"active"} to="/draws">
            DRAWS
            </NavLink>
        </li>
        <li>
          <NavLink activeClassName={"active"} to="/entries">
            ENTRIES
            </NavLink>
        </li>
        <li>
          <strong>
            MORE
            </strong>
        </li>
      </ul>
      <div css={icons}>

        {context.user.id === undefined ?
          <NavLink className={"icon"}
            activeClassName={"active"}
            to="/log">
            <div css={{ display: "flex", alignItems: "center", "i": { marginRight: "0.5rem" } }}>
            <i className="material-icons-outlined">person</i>
            <span>LOG IN</span>
            </div>
          </NavLink>
          :
          <div>
            <i className="material-icons-outlined">person</i>
            <span>{context.user.userName}</span>
          </div>
        }
        <div css={{display:"hidden", width:"2rem"}}></div>
        <div className={"icon"}>
          <div css={{ display: "flex", alignItems: "center", "i": { marginRight: "0.5rem" } }}>
            <i className="material-icons-outlined">shopping_cart</i>
            <span>03</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;