import React, { useState, useEffect } from "react";
/** @jsx jsx */
import { jsx } from "@emotion/core";
import StyledInput from "../components/StyledInput";
import { Redirect, useParams } from "react-router-dom";
import { get, post } from "../api/fetch";
import { setToken } from "../api/token";
import { verifyPass, verifyMatch } from "../utils/verifyFormData";

function ForgotPass() {
  const params = useParams();
  const [redirect, setRedirect] = useState(false);
  const [validPass, setValidPass] = useState({
    color: "2px solid #00C6D6",
    ok: true,
  });
  const [validMatch, setValidMatch] = useState({
    color: "2px solid #00C6D6",
    ok: true,
  });
  const [errorMessage, setErrorMessage] = useState({
    visibility: "hidden",
    message: "hidden",
  });

  useEffect(() => {
    setToken(params.token);
    verifyToken();
  }, []);

  const verifyToken = async () => {
    const result = await get(
      `/token/verifytokenemail/${params.id}/${params.token}`
    );
    if (!result.ok) {
      setRedirect(true);
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    const newpassword = e.target.password.value;
    const passMatch = e.target.passconfirm.value;
    newpassword.trim();
    passMatch.trim();
    const passStatus = verifyPass(newpassword);
    const matchStatus = verifyMatch(newpassword, passMatch);
    setValidPass(passStatus);
    setValidMatch(matchStatus);

    if (passStatus.ok && matchStatus.ok) {
      // and this ❗️
      const result = await post(`/users/${params.id}/resetpassword`, {
        newpassword,
      });

      if (result.ok) {
        localStorage.clear();
        setErrorMessage({
          visibility: "visible",
          message: "PASSWORD CHANGED.",
        });
        setTimeout(() => {
          setErrorMessage({ visibility: "hidden", message: "hidden" });
        }, 5000);
      } else {
        localStorage.clear();
        setErrorMessage({
          visibility: "visible",
          message: "SOMETHING WENT WRONG. PLEASE TRY AGAIN LATER.",
        });
        setTimeout(() => {
          setErrorMessage({ visibility: "hidden", message: "hidden" });
        }, 5000);
      }
    } else {
      setErrorMessage({
        visibility: "visible",
        message: "THE INPUT FIELDS IN RED CONTAIN ERRORS,PLEASE CORRECT THEM",
      });
    }
  };

  if (redirect) {
    return <Redirect to="/home" />;
  }

  return (
    <React.Fragment>
      <h1 css={{ marginLeft: "4rem" }}>RESET PASSWORD</h1>
      <div css={wrapper}>
        <form
          onSubmit={submit}
          css={{
            width: "30%",
            display: "flex",
            justifyContent: "center",
            marginTop: "4rem",
            flexDirection: "column",
            textAlign: "center",
          }}
        >
          <StyledInput
            valid={validPass.color}
            type="password"
            eye={true}
            width="100%"
            name="NEW PASSWORD"
            innerName="password"
          />
          <StyledInput
            valid={validMatch.color}
            type="password"
            eye={true}
            width="100%"
            name="CONFIRM NEW PASSWORD"
            innerName="passconfirm"
          />
          <button css={{ margin: "2rem 0" }} className="button01">
            SUBMIT
          </button>
        </form>
        <p>
          PASSWORD MUST HAVE BOTH NUMBERS AND LETTERS AND BE AT LEAST 8 CHARS
          LONG
        </p>
        <p
          css={{
            fontSize: "0.7rem",
            color: errorMessage.color,
            marginTop: "0.5rem",
            visibility: errorMessage.visibility,
          }}
        >
          {errorMessage.message}
        </p>
      </div>
    </React.Fragment>
  );
}

const wrapper = {
  margin: "0 auto",
  padding: "2rem",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
};

export default ForgotPass;
