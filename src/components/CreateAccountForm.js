import React from 'react';
import { ReactComponent as BigBossLogo } from "../resources/BigBossLogo.svg";
/** @jsx jsx */
import { jsx } from '@emotion/core';
import StyledInput from "./StyledInput"

const createAccountWrapper = {

  display: "flex",
  justifyContent: "center",
  alignItems:"center",
  flexDirection: "column",
  alignItems: "center",
  padding: "3rem",
  margin: "1rem 4rem",
 
  width: "90%",
  boxShadow: "10px 10px 5px 5px rgba(0,0,0,16%)",

}

function CreateAccountForm() {

  const submit=(e)=>{

    e.preventDefault();

  }

  
  return (
    <div css={createAccountWrapper}>
      <BigBossLogo b height={"50px"} width={"50px"} />
      <h3 css={{ margin: "1rem 0" }}>CREATE ACCOUNT</h3>
      <form onSubmit={submit}css={{width:"85%"}}>
        <div  css={{margin:"1rem 0", display:"flex", justifyContent:"space-around"}}>
        <StyledInput  width={"45%"}name={"EMAIL"}/>
        <StyledInput width={"45%"}name={"CREATE PASSWORD"}/>
        </div>
        <div  css={{margin:"1rem 0", display:"flex", justifyContent:"space-around"}}>
        <StyledInput width={"45%"} name={"FULL NAME"}/>
        <StyledInput width={"45%"} name={"REPEAT PASSWORD"}/>
        </div>
        <div css={{display:"flex", justifyContent:"center"}}>
        <button css={{width:"50%"}}className="button02">CREATE YOUR ACCOUNT</button>
        </div>
      </form>
    </div>
  );
}

export default CreateAccountForm;