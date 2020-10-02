import React from 'react';
import { ReactComponent as BigBossLogo } from "../resources/BigBossLogo.svg";
/** @jsx jsx */
import { jsx } from '@emotion/core';
import StyledInput from "./StyledInput"

const createAccountWrapper = {

  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
  padding: "3rem",
  margin: "1rem 4rem",
  width: "40%",
  boxShadow: "10px 10px 5px 5px rgba(0,0,0,16%)",
  height:"70vh"
}

function CreateAccountAccess() {

  const submit=(e)=>{

    e.preventDefault();

  }

  
  return (
    <div css={createAccountWrapper}>
      <BigBossLogo b height={"75px"} width={"75px"} />
      <h3 css={{ margin: "1rem 0" }}>LOG IN</h3>
      <form onSubmit={submit}css={{width:"85%"}}>
        <div>
        <StyledInput width={"100%"}name={"USERNAME"}/>
        </div>
        <StyledInput width={"100%"} name={"PASSWORD"}/>
        <button css={{width:"100%"}}className="button02">LOG IN</button>
      </form>
    </div>
  );
}

export default CreateAccountAccess;