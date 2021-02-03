/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useState, useContext } from "react";
import { post } from "../api/fetch";
import UserContext from "../context/UserContext";
import { useInputChange } from "../utils/useInputChange";
import facepaint from "facepaint";
/* eslint-disable no-unused-vars */
var React = require("react");
/* eslint-enable no-unused-vars */

const breakpoints = [650, 950, 992, 1200];
const mq = facepaint(breakpoints.map((bp) => `@media (min-width: ${bp}px)`));

const accountInput = mq({
    border: "none",
    borderBottom: "1px dashed white !important",
    boxShadow: "none",
    outline: "none",
    padding: "0.75rem 0.75rem 0.5rem 0",
    width: ["100%", "100%", "auto", "auto"],
  }),
  inputWrapper = {
    margin: "1.5rem 1rem",
    display: "flex",
    flexDirection: "column",
    "input:-webkit-autofill,input:-webkit-autofill:hover,input:-webkit-autofill:focus,input:-webkit-autofill:active": {
      boxShadow: "0 0 0 30px #252525 inset !important;",
      WebkitTextFillColor: "white !important",
      appearance: "none",
      borderBottom: "none",
    },
  },
  columns = mq({
    marginLeft: ["0rem", "0rem", "3rem", "3rem"],
    display: "grid",
    gridTemplateRows: [
      "repeat(9,1fr)",
      "repeat(3,1fr)",
      "repeat(3,1fr)",
      "repeat(3,1fr)",
    ],
    gridTemplateColumns: [
      "repeat(1,1fr)",
      "repeat(3,1fr)",
      "repeat(3, 1fr)",
      "repeat(3, 1fr)",
    ],
    gridAutoFlow: "column",
    width: "100%",
    marginBottom: "3rem",
    "div label": {
      fontWeight: "600",
      fontSize: "0.7rem",
      letterSpacing: "0.1rem",
    },
  });

function Account() {
  const context = useContext(UserContext);
  const [input, handleInputChange] = useInputChange();
  const inputNames = [
    { title: "NAME", inner: "name" },
    { title: "LAST NAME", inner: "lastName" },
    { title: "EMAIL", inner: "email" },
    { title: "TELEPHONE NUMBER", inner: "phone" },
    { title: "ADRESS", inner: "adress" },
    { title: "CITY", inner: "city" },
    { title: "COUNTY", inner: "county" },
    { title: "POST CODE", inner: "postcode" },
    { title: "COUNTRY", inner: "country" },
  ];
  const [message, setMessage] = useState({
    visibility: "hidden",
    message: "hidden",
  });

  const submit = async (e) => {
    e.preventDefault();
    const userData = {};
    inputNames.forEach((input) => {
      userData[input.inner] = e.target[input.inner].value;
    });
    const result = await post("/users/save", userData);
    if (result.ok) {
      const currentCart = [...context.user.cart];
      const newUserData = result.data.userData;
      newUserData.cart = currentCart;
      context.activateUser(newUserData);
      setMessage({ visibility: "visible", message: "SAVED SUCCESSFULLY" });
      setTimeout(() => {
        setMessage({ visibility: "hidden", message: "hidden" });
      }, 2000);
    } else {
      setMessage({
        visibility: "visible",
        message: "SOMETHING WENT WRONG,TRY AGAIN",
      });
      setTimeout(() => {
        setMessage({ visibility: "hidden", message: "hidden" });
      }, 2000);
    }
  };

  return (
    <React.Fragment>
      <form
        onSubmit={submit}
        css={mq({
          height: ["auto", "auto", "auto", "auto"],
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: ["100%", "100%", "70%", "70%"],
        })}
      >
        <div css={columns}>
          {inputNames.map((name) => {
            return (
              <div key={name.inner} css={inputWrapper}>
                <label htmlFor={name.inner}>{name.title}</label>
                <input
                  name={name.inner}
                  onChange={handleInputChange}
                  defaultValue={context.user[name.inner]}
                  css={accountInput}
                />
              </div>
            );
          })}
        </div>
        <button css={{ width: "50%" }} className="button01">
          SAVE DETAILS
        </button>
        <p css={{ marginTop: "0.5rem", visibility: message.visibility }}>
          {message.message}
        </p>
      </form>
    </React.Fragment>
  );
}

export default Account;
