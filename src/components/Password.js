import React, { useState } from 'react';
/* @jsx jsx */
import { jsx } from '@emotion/core/';
import { post } from "../api/fetch";
import { verifyMatch, verifyPass } from "../utils/verifyFormData"
import StyledInput from "./StyledInput";
import facepaint from 'facepaint';

const breakpoints = [576, 950, 992, 1200]
const mq = facepaint(
  breakpoints.map(bp => `@media (min-width: ${bp}px)`));



const Password = () => {

  const [message, setMessage] = useState({ visibility: "hidden", message: "hidden", color: "red" })


  const submit = async (e) => {

    e.preventDefault();
    const oldpassword = e.target.currentPass.value.trim();
    const newpassword = e.target.newPass.value.trim();
    const confirmNewPass = e.target.confirmNewPass.value.trim();
    const passwordValid = verifyPass(newpassword);
    const passwordsMatch = verifyMatch(newpassword, confirmNewPass);

    if (passwordsMatch.ok && passwordValid.ok) {

      const result = await post("/users/newpassword", { oldpassword, newpassword, })
      if (result.status !== 200) {
        setMessage({ visibility: "visible", message: "WRONG PASSWORD", color: "red" });
        setTimeout(() => setMessage({ color: "green", visibility: "hidden", message: "hidden" }), 1000);

      }
      else {
        setMessage({ visibility: "visible", message: "PASSWORD CHANGED!", color: "green" });
        setTimeout(() => setMessage({ color: "green", visibility: "hidden", message: "hidden" }), 1000);
      }
    }
    else if (!passwordsMatch.ok) {
      setMessage({ visibility: "visible", message: "NEW PASSWORDS DONT MATCH", color: "red" });
      setTimeout(() => setMessage({ color: "green", visibility: "hidden", message: "hidden" }), 1000);

    }
    else if (!passwordValid.ok) {

      setMessage({ visibility: "visible", message: "NEW PASSWORD DOEST NOT CONTAIN MININUM REQUIREMENTS", color: "red" });
      setTimeout(() => setMessage({ color: "green", visibility: "hidden", message: "hidden" }), 1000);
    }

  }
  return (
    <form onSubmit={submit}
      css={mq({
        height: "50vh",
        marginLeft: ["0rem","0rem","3rem","3rem"],
        marginTop: "1rem",
        width: "25rem",
        display: "flex",
        flexDirection: "column"
      })}>
      <StyledInput
        innerName={"currentPass"}
        type={"password"}
        eye={true}
        css={{ margin: "0.75rem 0" }}
        width={"100%"}
        name={"CURRENT PASSWORD"} />
      <StyledInput
        innerName={"newPass"}
        type={"password"}
        eye={true}
        css={{ margin: "0.75rem 0" }}
        width={"100%"}
        name={"NEW PASSWORD"} />
      <StyledInput
        innerName={"confirmNewPass"}
        type={"password"}
        eye={true}
        css={{ margin: "0.75rem 0" }}
        width={"100%"}
        name={"CONFIRM PASSWORD"} />
      <button className="button01">SAVE NEW PASSWORD</button>
      <p css={{ marginTop: "1rem", visibility: message.visibility, color: message.color, textAlign: "center" }}>{message.message}</p>
    </form>
  );
}

export default Password;