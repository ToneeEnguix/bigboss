<<<<<<< HEAD
import React, { useState } from "react";
=======
import React, { useState, useContext } from 'react';
>>>>>>> 2be4926319ba214fddc4701872770b57da8c9b48
/** @jsx jsx */
import { jsx } from "@emotion/core";
import StyledInput from "../components/StyledInput";
import { post } from "../api/fetch";
import { Redirect } from "react-router-dom";
<<<<<<< HEAD
=======
import UserContext from "../context/UserContext"
>>>>>>> 2be4926319ba214fddc4701872770b57da8c9b48

const contentWrapper = {
  margin: "4rem 0rem",

  h1: {
    marginLeft: "4rem",
  },
};

const formStyles = {
  width: "627.75px",
  display: "flex",
  justifyContent: "center",
  margin: "12% auto",
  flexDirection: "column",
  backgroundColor: "#212121",
  borderRadius: "10px",
  textAlign: "center",
  boxShadow: "0px 3px 6px #00000029",
  padding: "2rem",
  input: {
    minHeight: "36.75px",
    width: "486.75px",
    outline: "none",
    border: "none",
    backgroundColor: "#262626",
    boxShadow: "0px 3px 6px #00000029",
    borderRadius: "8px",
    padding: "0.5rem 1.5rem",
    color: "white",
    margin: "0.5rem auto",
    fontWeight: "300",
    fontFamily: "Raleway, sans-seriff",
    "::-webkit-input-placeholder": {
      /* Chrome/Opera/Safari */
      fontSize: "0.8rem",
      fontFamily: "Raleway, sans-seriff",
      fontWeight: "300",
    },
  },
  div: {
    backgroundColor: "transparent",
  },
  button: {
    border: "1px solid transparent",
    boxShadow: "0px 3px 6px #00000029",
    borderRadius: "8px",
    width: "123px",
    height: "36.75px",
    textAlign: "center",
    padding: "0.6rem 0",
    boxSizing: "border-box",
    margin: "1rem auto 0",
    fontSize: "12px",
    fontWeight: "300",
    letterSpacing: ".01rem",
    backgroundColor: "#212121",
  },
  "button:hover": {
    border: "1px solid #1d8cde",
    backgroundColor: "#262626",
  },
};

function AdminLogin() {
<<<<<<< HEAD
  const [message, setMessage] = useState({
    color: "green",
    visibility: "hidden",
    message: "hidden",
  });
  const [redirect, setRedirect] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const password = e.target.password.value;
    const result = await post("/admin/signin", { name, password });

    if (result.ok) {
      localStorage.setItem("@auth_token", result.token);
      setRedirect(true);
    } else {
      setMessage({
        color: "red",
        visibility: "visible",
        message: "WRONG CREDENTIALS",
      });
=======

    const [message, setMessage] = useState({ color: "green", visibility: "hidden", message: "hidden" });
    const [redirect, setRedirect] = useState(false);
    const context = useContext(UserContext);

    const submit = async (e) => {

        e.preventDefault();
        const name = e.target.name.value;
        const password = e.target.password.value;
        const result = await post("/admin/signin", { name, password });

        if (result.ok) {

            localStorage.setItem("@auth_token2", result.data.token);
            context.setAdminStatus();
            setRedirect(true)
        }
        else {
            setMessage({ color: "red", visibility: "visible", message: "WRONG CREDENTIALS" })
        }

>>>>>>> 2be4926319ba214fddc4701872770b57da8c9b48
    }
  };

<<<<<<< HEAD
  if (redirect) {
    return (
      <Redirect
        to={{
          pathname: "/admindashboard/activecompetitions",
          state: { admin: true },
        }}
      />
    );
  }
  return (
    <div css={contentWrapper}>
      <div
        css={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#212121 !important",
          width: "100vw",
          height: "100vh",
          position: "absolute",
          top: "0",
        }}
      >
        <form onSubmit={submit} css={formStyles}>
          <div
            css={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "1rem auto 2rem",
            }}
          >
            <p css={{ fontFamily: "Anurati", fontSize: "32px" }}>NI</p>
            <div
              css={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "center",
                marginLeft: "1rem",

                p: {
                  fontFamily: "Raleway !important",
                  fontWeight: "300",
                  letterSpacing: ".01rem",
                },
              }}
            >
              <p css={{ fontSize: "18px" }}>Nebula Industries Ltd.</p>
              <p css={{ fontSize: "9px", letterSpacing: "0.03rem !important" }}>
                Trading as Marley Media
              </p>
=======
    if (redirect) {

        return (

            <Redirect
                to={{
                    pathname: "/admindashboard",
                }}
            />
        )
    }
    return (



        <div css={contentWrapper}>

            <h1>ADMIN LOGIN</h1>
            <div css={{ display: "flex", justifyContent: "center" }}>
                <form onSubmit={submit} css={{ width: "30%", display: "flex", justifyContent: "center", marginTop: "4rem", flexDirection: "column", textAlign: "center" }}>

                    <StyledInput type="text" width="100%" name="NAME" innerName="name" />
                    <StyledInput type="password" eye={true} width="100%" name="PASSWORD" innerName="password" />
                    <button css={{ marginTop: "1rem" }} className="button01">SUBMIT</button>
                    <p css={{ color: message.color, visibility: message.visibility }}>{message.message}</p>
                </form>
>>>>>>> 2be4926319ba214fddc4701872770b57da8c9b48
            </div>
          </div>
          <input className="cl_input" placeholder="Email" name="name" />
          <input
            className="cl_input"
            placeholder="Customer ID: EXAMPLE12345"
            name="password"
          />
          {/* <StyledInput type="text" width="100%" name="NAME" innerName="name" /> */}
          {/* <StyledInput
            type="password"
            eye={true}
            width="100%"
            name="PASSWORD"
            innerName="password"
          /> */}
          <button css={{ marginTop: "1rem" }} className="button01">
            Start
          </button>
          <p css={{ color: message.color, visibility: message.visibility }}>
            {message.message}
          </p>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
