import { useState, useContext } from "react";
import { ReactComponent as BigBossLogo } from "../resources/BigBossLogo.svg";
/** @jsx jsx */
import { jsx } from "@emotion/core";
import StyledInput from "./StyledInput";
import { post } from "../api/fetch";
import { Link, Redirect } from "react-router-dom";
import UserContext from "../context/UserContext";
/* eslint-disable no-unused-vars */
var React = require("react");
/* eslint-enable no-unused-vars */

function CreateAccountAccess() {
  const [redirect, setRedirect] = useState(false);
  const [message, setMessage] = useState({
    color: "green",
    visibility: "hidden",
    message: "hidden",
  });
  const context = useContext(UserContext);

  const submit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const result = await post("/users/signin", { email, password });
    if (!result.ok) {
      setMessage({
        color: "red",
        visibility: "visible",
        message: "WRONG PASSWORD OR USERNAME",
      });
      setTimeout(
        () =>
          setMessage({
            color: "green",
            visibility: "hidden",
            message: "hidden",
          }),
        2000
      );
    } else {
      context.activateUser(result.data.userData);
      localStorage.setItem("@auth_token", result.data.token);
      setRedirect(true);
    }
  };

  if (redirect) {
    return <Redirect to="/home" />;
  }

  return (
    <div css={createAccountWrapper}>
      <BigBossLogo height={"175px"} width={"175px"} />
      <h3 css={{ margin: "1rem 0" }}>LOG IN</h3>
      <form onSubmit={submit} css={{ width: "100%" }}>
        <div>
          <StyledInput innerName={"email"} width={"100%"} name={"EMAIL"} />
        </div>
        <StyledInput
          innerName={"password"}
          type={"password"}
          width={"100%"}
          name={"PASSWORD"}
        />
        <button css={{ width: "100%" }} className="button02">
          LOG IN
        </button>
        <div
          css={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            css={{
              marginTop: "0.5rem",
              display: "flex",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <p
              css={{
                fontSize: "0.7rem",
                textAlign: "center",
                color: "white",
                marginRight: "0.2rem",
              }}
            >
              FORGOTTEN PASSWORD?{" "}
            </p>
            <Link
              to="/forgotpass"
              css={{
                fontSize: "0.7rem",
                textAlign: "center",
                color: "#00FFFF",
              }}
            >
              {" "}
              CLICK HERE
            </Link>
          </div>
          <p
            css={{
              letterSpacing: "0.1rem",
              fontWeight: "300",
              marginTop: "0.5rem",
              color: message.color,
              visibility: message.visibility,
            }}
          >
            {message.message}
          </p>
        </div>
      </form>
    </div>
  );
}

const createAccountWrapper = {
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
  padding: "3rem 6rem",
  margin: "1rem 0.5rem",
  minWidth: "525px",
  boxShadow: "0px 2px 4px 0px rgba(0,0,0,16%)",
  height: "27rem",
};

export default CreateAccountAccess;
