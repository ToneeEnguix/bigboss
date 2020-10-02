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
  padding: "3rem",
  margin: "1rem 4rem",
  width: "40%",
  boxShadow: "10px 10px 5px 5px rgba(0,0,0,16%)",
  height:"70vh"
}

const terms = {

  fontSize: "0.8rem",
  fontWeight: "600",
  letterSpacing: "0.1rem",
  textDecoration: "underline"

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
      <BigBossLogo b height={"75px"} width={"75px"} />
      <h3 css={{ marginTop: "1rem" }}>CREATE ACCOUNT</h3>
      <div css={{
        margin: "1rem 0", width: "80%",
        "p": { margin: "0.7rem 0" }
      }}>
        <p>NEW CUSTOMER?</p>
        <p>SET UP AN ACCOUNT FOR </p>
        <p css={{ color: "#00C6D6" }}>EXTRA FEATURES,PROMOTIONS AND MORE!</p>
      </div>

      <div css={{ display: "flex", justifyContent: "space-between", width: "80%" }}>

        <div css={{ display: "inline-block" }}>
          <p css={{ display: "inline-block" }}>ACCEPT &nbsp;</p>
          <Link css={terms}>TERMS AND CONDITIONS</Link>
        </div>
        <input onClick={() => { setRadio(!radio) }} type="checkbox" checked={radio} />


      </div>

      <button css={{width:"85%", margin:"1rem 0"}} onClick={gotoCreate} className="button01">CREATE NEW ACCOUNT</button>
      {alert ? <p>Please accept the Terms before proceeding</p> : <p css={{ visibility: "hidden" }}>hidden</p>}
    </div>
  );

}

export default CreateAccountAccess;