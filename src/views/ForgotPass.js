import React, { useState, useEffect } from "react";
/** @jsx jsx */
import { jsx } from "@emotion/core";
import StyledInput from "../components/StyledInput";
import { Redirect, useParams } from "react-router-dom";
import { get } from "../api/fetch";
import facepaint from "facepaint";

const breakpoints = [576, 950, 992, 1200];

const mq = facepaint(breakpoints.map((bp) => `@media (min-width: ${bp}px)`));

const wrapper = {
  margin: "0 auto",
  padding: "2rem",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
};

function ForgotPass(props) {
  const [message, setMessage] = useState({
    visibility: "hidden",
    message: "hidden",
  });

  const submit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const result = await get(`/users/${email}/askpasswordreset`);

    if (result.ok) {
      setMessage({
        visibility: "visible",
        message: "CHECK YOUR EMAIL ACCOUNT FOR FURTHER INSTRUCTIONS.",
      });
    } else {
      setMessage({
        visibility: "visible",
        message:
          "SOMETHING WENT WRONG,NO EMAIL SENT. MAKE SURE THE EMAIL PROVIDED IS CORRECT.",
      });
    }

    setTimeout(() => {
      setMessage({ visibility: "hidden", message: "hidden" });
    }, 3000);
  };

  return (
    <React.Fragment>
      <h1 css={{ marginLeft: "4rem" }}>FORGOTTEN PASSWORD</h1>
      <div css={wrapper}>
        <form
          onSubmit={submit}
          css={mq({
            width: ["auto", "auto", "30%", "30%"],
            display: "flex",
            justifyContent: "center",
            marginTop: "4rem",
            flexDirection: "column",
            textAlign: "center",
          })}
        >
          <StyledInput
            type="text"
            width="100%"
            name="EMAIL"
            innerName="email"
          />
          <button css={{ margin: "2rem 0" }} className="button01">
            SUBMIT
          </button>
        </form>
        <p css={{ textAlign: "center" }}>
          PLEASE PROVIDE US WITH THE EMAIL ASSOCIATED TO YOUR ACCOUNT.
        </p>
        <p css={{ marginTop: "0.5rem", visibility: message.visibility }}>
          {message.message}
        </p>
      </div>
    </React.Fragment>
  );
}

export default ForgotPass;
