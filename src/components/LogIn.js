import React, { useState,useContext } from 'react';
import { ReactComponent as BigBossLogo } from "../resources/BigBossLogo.svg";
/** @jsx jsx */
import { jsx } from '@emotion/core';
import StyledInput from "./StyledInput";
import { post } from "../api/fetch";
import { Redirect,Link } from "react-router-dom";
import UserContext from "../context/UserContext";

const createAccountWrapper = {

  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
  padding: "3rem",
  margin: "1rem 4rem",
  width: "40%",
  boxShadow: "10px 10px 5px 5px rgba(0,0,0,16%)",
  height: "70vh"
}

function CreateAccountAccess() {

  const [message, setMessage] = useState({ color: "green", visibility: "hidden", message: "hidden" });
  const [redirect, setRedirect] = useState(false);
  const context = useContext(UserContext)


  const submit = async (e) => {

    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const result = await post("/users/signin", { email, password });

    if (!result.ok) {
      setMessage({ color: "red", visibility: "visible", message: "WRONG PASSWORD OR USERNAME" })
      setTimeout(() => setMessage({ color: "green", visibility: "hidden", message: "hidden" }), 1000)

    }
    else {
      context.activateUser(result.data.userData);
      localStorage.setItem("@auth_token",result.data.token)
      setMessage({ color: "green", visibility: "visible", message: "WELCOME!" });
      setTimeout(() => setRedirect(true), 1000);
    }


  }

  if (redirect) {

    return (
      <Redirect to="/home" />
    )
  }

  return (
    <div css={createAccountWrapper}>
      <BigBossLogo b height={"75px"} width={"75px"} />
      <h3 css={{ margin: "1rem 0" }}>LOG IN</h3>
      <form onSubmit={submit} css={{ width: "85%" }}>
        <div>
          <StyledInput innerName={"email"} width={"100%"} name={"EMAIL"} />
        </div>
        <StyledInput innerName={"password"} type={"password"} width={"100%"} name={"PASSWORD"} />
        <button css={{ width: "100%" }} className="button02">LOG IN</button>
        <div css={{width:"100%",display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center"}}>
        <p css={{color: message.color, visibility: message.visibility }}>{message.message}</p>
        <Link to="/forgotpass" css={{ width:"100%" ,padding: "0.5rem", textAlign: "center", color: "grey"}}>FORGOTTEN PASSWORD? CLICK HERE</Link>
      </div>
        </form>
    </div>
  );
}

export default CreateAccountAccess;