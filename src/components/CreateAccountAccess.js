import React, { useState } from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { ReactComponent as BigBossLogo } from "../resources/BigBossLogo.svg";
import { Link, useHistory } from "react-router-dom"

const createAccountWrapper = {

  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  padding: "3rem 6rem",
  margin: "1rem 4rem",
  boxShadow: "0px 2px 4px 0px rgba(0,0,0,16%)",
  height: "27rem"
}

const terms = {

  fontSize: "0.8rem",
  fontWeight: "600",
  letterSpacing: "0.1rem",
  textDecoration: "underline"

}

const container = {

  display: "block",
  position: "relative",
  paddingLeft: "35px",
  marginBottom: "12px",
  cursor: "pointer",
  fontSize: "22px",
  userSelect: "none",

  input: {
    position: "absolute",
    opacity: "0",
    cursor: "pointer",
    height: "0",
    width: "0"
  },

  "input:checked ~ span": {
    backgroundColor: "#00FFFF"
  },

  "span": {
    position: "absolute",
    top: "0",
    left: "0",
    height: "20px",
    width: "20px",
    backgroundColor: "white",

  },

  "& span:after": {
    left: "8px",
    top: "3px",
    width: "3px",
    height: "10px",
    border: "solid white",
    borderWidth: "0 3px 3px 0",
    transform: "rotate(45deg)",
    display:"block",
    position:"absolute",
    content: '""',
  },

  "input:checked ~ .span:after": {
    display: "block"
  }

}

function CreateAccountAccess() {


  const history = useHistory();
  const [radio, setRadio] = useState(true);
  const [alert, setAlert] = useState(false)


  const gotoCreate = () => {

    if (radio) {

      history.push("/createaccount")
    }
    else {

      setAlert(true, setTimeout(() => { setAlert(false) }, 2000))

    }

  }

  return (


    <div css={createAccountWrapper}>
      <BigBossLogo height={"75px"} width={"75px"} />
      <h3 css={{ marginTop: "1rem" }}>CREATE ACCOUNT</h3>
      <div css={{
        margin: "1rem 0", width: "100%",
        "p": { margin: "0.7rem 0" }
      }}>
        <p>NEW CUSTOMER?</p>
        <p>SET UP AN ACCOUNT FOR </p>
        <p css={{ color: "#00FFFF" }}>EXTRA FEATURES,PROMOTIONS AND MORE!</p>
      </div>

      <div css={{ display: "flex", justifyContent: "space-between", width: "100%" }}>

        <div css={{ display: "inline-block" }}>
          <p css={{ display: "inline-block" }}>ACCEPT &nbsp;</p>
          <Link to="/more/terms" css={terms}>TERMS AND CONDITIONS</Link>
        </div>
        <div>
        <label className="container" css={container}  >
          <input type="checkbox" checked={radio} />
          <span onClick={() => { setRadio(!radio) }}></span>
        </label>
        </div>
      </div>

      <button css={{ width: "100%", margin: "1rem 0" }} onClick={gotoCreate} className="button01">CREATE NEW ACCOUNT</button>
      {alert ? <p css={{fontWeight:"300", letterSpacing:"0.1rem"}}>Please accept the Terms before proceeding</p> : <p css={{ visibility: "hidden" }}>hidden</p>}
    </div>
  );

}

export default CreateAccountAccess;