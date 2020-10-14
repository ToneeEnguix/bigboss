import React, { useState, useEffect } from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core';
import StyledInput from "../components/StyledInput";


const wrapper = {
  margin: "0 auto",
  padding: "2rem",
  display: "flex",
  justifyContent: "center"
}

function ForgotPass() {

  const submit = async () => {

  }

  return (
    <React.Fragment>
      <h1 css={{marginLeft:"4rem"}}>FORGOTTEN PASSWORD</h1>
      <div css={wrapper}>

        <form onSubmit={submit} css={{ width: "30%", display: "flex", justifyContent: "center", marginTop: "4rem", flexDirection: "column", textAlign: "center" }}>

          <StyledInput type="text" width="100%" name="EMAIL" innerName="email" />
          <button css={{ margin: "2rem 0" }} className="button01">SUBMIT</button>
          <p>WE WILL SEND YOU AN EMAIL TO THE PROVIDED ADRESS IF FOUND IN OUR DATABASE WITH FURTHER INSTRUCTIONS</p>
        </form>
      </div>
    </React.Fragment>
  );
}

export default ForgotPass;