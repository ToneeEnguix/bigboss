import React, { useState, useEffect } from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core';
import StyledInput from "../components/StyledInput";
import {Redirect,useParams} from "react-router-dom";
import {get} from "../api/fetch";


const wrapper = {
  margin: "0 auto",
  padding: "2rem",
  display: "flex",
  justifyContent: "center"
}

function ForgotPass(props) {

  const [message,setMessage]=useState({visibility:"hidden",message:"hidden"})

  const submit = async (e) => {

    e.preventDefault();
    const email = e.target.email.value;
    const result = await get(`/users/${email}/askpasswordreset`)

    if (result.ok){

      setMessage({visibility:"visible", message:"EMAIL SENT"})
    }
    else{

      setMessage({visibility:"visible",message:"SOMETHING WAS WRONG"})
    }

    setTimeout(()=>{ setMessage({visibility:"hidden",message:"hidden"})},3000)


  }

  return (
    <React.Fragment>
      <h1 css={{marginLeft:"4rem"}}>FORGOTTEN PASSWORD</h1>
      <div css={wrapper}>

        <form onSubmit={submit} css={{ width: "30%", display: "flex", justifyContent: "center", marginTop: "4rem", flexDirection: "column", textAlign: "center" }}>
          <StyledInput type="text" width="100%" name="EMAIL" innerName="email" />
          <button css={{ margin: "2rem 0" }} className="button01">SUBMIT</button>
        </form>
        <p css={{visibility:message.visibility}}>{message.message}</p>
      </div>
    </React.Fragment>
  );
}

export default ForgotPass;