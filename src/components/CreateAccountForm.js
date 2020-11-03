import React, { useState,useContext } from 'react';
import { ReactComponent as BigBossLogo } from "../resources/BigBossLogo.svg";
/** @jsx jsx */
import { jsx } from '@emotion/core';
import StyledInput from "./StyledInput";
import { verifyEmail, verifyPass, verifyMatch, verifyName } from "../utils/verifyFormData";
import { post } from "../api/fetch";
import { Redirect } from "react-router-dom";
import UserContext from "../context/UserContext";
import facepaint from 'facepaint';


const breakpoints = [576, 950, 992, 1200]

const mq = facepaint(
  breakpoints.map(bp => `@media (min-width: ${bp}px)`));

const createAccountWrapper = mq({

  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  alignItems: "center",
  padding: "2.5rem 3rem",
  margin: ["0rem","0rem","0rem 4rem","0rem 4rem"],
  width: "90%",
  boxShadow: "-1px 4px 22px 0px black",

})

function CreateAccountForm() {


  const [validName, setValidName] = useState({ color: "2px solid #00C6D6", ok: true })
  const [validEmail, setValidEmail] = useState({ color: "2px solid #00C6D6", ok: true })
  const [validPass, setValidPass] = useState({ color: "2px solid #00C6D6", ok: true })
  const [validMatch, setValidMatch] = useState({ color: "2px solid #00C6D6", ok: true })
  const [errorMessage, setErrorMessage] = useState({ visibility: "hidden", message: "hidden" });
  const [redirect, setRedirect] = useState(false);
  const context = useContext(UserContext)

  const submit = async (e) => {

    e.preventDefault();
    const email = e.target.email.value;
    const name = e.target.name.value;
    const password = e.target.password.value;
    const passMatch = e.target.verifyPass.value;
    name.trim();
    email.trim();
    password.trim();
    passMatch.trim();

    const nameStatus = verifyName(name);
    const emailStatus = verifyEmail(email);
    const passStatus = verifyPass(password);
    const matchStatus = verifyMatch(password, passMatch)
    setValidName(nameStatus)
    setValidEmail(emailStatus);
    setValidPass(passStatus);
    setValidMatch(matchStatus);

    if (nameStatus.ok === true && emailStatus.ok === true && passStatus.ok === true && matchStatus.ok === true) {

      const result = await post("/users/signup", { email, name, password, passMatch });
   
      if (result.status === 400) {

        
        setErrorMessage({ visibility: "visible", message: "EMAIL ADRESS ALREADY TAKEN",color:"red" });
      }
      else if (result.status === 500) {

        setErrorMessage({ visibility: "visible", message: "SOMETHING WENT WRONG TRY AGAIN LATER",color:"red" });
      }
      else {

        localStorage.setItem("@auth_token",result.data.token);
        context.activateUser(result.data.userData);
        setErrorMessage({ visibility: "visible", message: "CORRECT SIGN UP" ,color:"green"});
        setTimeout(()=>{setRedirect(true)},1000);

      }
    }
    else {

      setErrorMessage({ visibility: "visible", message: "THE INPUT FIELDS IN RED CONTAIN ERRORS,PLEASE CORRECT THEM" })
    }

  }

  if (redirect) {

    return (
      <Redirect to="/home" />
    )
  }
  return (
    <div css={createAccountWrapper}>
      <BigBossLogo b height={"50px"} width={"50px"} />
      <h3 css={{ margin: "1rem 0" }}>CREATE ACCOUNT</h3>
      <form onSubmit={submit} css={{ width: "85%" }}>
        <div css={mq({ flexDirection:["column","column","row","row"],
        margin: "1rem 0", 
        display: "flex", 
        justifyContent: "space-around" })}>
          <StyledInput width={"45%"}  valid={validEmail.color} innerName={"email"} name={"EMAIL"} />

          <StyledInput width={"45%"}  valid={validPass.color} type={"password"} innerName={"password"} name={"CREATE PASSWORD"} />


        </div>
        <div css={mq({ flexDirection:["column","column","row","row"],
        margin: "1rem 0", 
        display: "flex", 
        justifyContent: "space-around" })}>
          <StyledInput width={"45%"} valid={validName.color} innerName={"name"} name={"USER NAME"} />
          <StyledInput width={"45%"}  valid={validMatch.color} innerName={"verifyPass"} type={"password"} name={"REPEAT PASSWORD"} />
        </div>
        <div css={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
          <button css={mq({ width: ["auto","auto","50%","50%"] })} className="button02">CREATE YOUR ACCOUNT</button>
          <p css={{ textAlign:"center", padding: "0.5rem", color: "grey", fontSize: "0.7rem" }}>PASSWORD MUST BE 8 CHARS LONG AND CONTAIN BOTH LETTERS AND NUMBERS</p>
          <p css={{ fontSize: "0.7rem", color: errorMessage.color, marginTop: "0.5rem", visibility: errorMessage.visibility }}>{errorMessage.message}</p>
        </div>
      </form>
    </div>
  );
}

export default CreateAccountForm;