import { React, useState, useContext, useEffect } from "react";
/** @jsx jsx */
import { jsx } from "@emotion/core";
import UserContext from "../context/UserContext";

const textWrapper = {
  display: "flex",
  flexDirection: "column",
  padding: "1rem",

  marginBottom: "1rem",

  a: {
    display: "flex",
    justifyContent: "center",
  },
};

function BasketCard(props) {
  const [amount, setAmount] = useState(props.competition.amount);
  const [message, setMessage] = useState({
    visible: "hidden",
    message: "hidden",
  });
  const context = useContext(UserContext);
  const [animation, setAnimation] = useState("translate3d(0, 0, 0)");

  useEffect(() => {
    setAmount(props.competition.amount);
  }, [props.competition.amount]);
  const card = {
    padding: "2rem 2rem 2rem 2rem",
    width: "100%",
    display: "flex",
    margin: "0rem 1.5rem 1.5rem 0",
    boxShadow: "-1px 4px 22px 0px black",
    justifyContent: "center",
    flexDirection: "column",
    borderRadius: "4%",
    overflow: "hidden",
    minWidth: "450px",
    transform: animation,
    transition: "transform 2s",
  };

  const setValue = (amount) => {
    let value = String(amount);
    while (value.length < 2) {
      value = "0" + value;
    }
    return value;
  };

  const add = () => {
    const newValue = Number(amount) + 1;
    setAmount(newValue);
  };

  const substract = () => {
    if (amount !== 1) {
      const newValue = Number(amount) - 1;
      setAmount(newValue);
    }
  };

  const saveUpdate = () => {
    context.updateCart(props.competition.competition, amount);
    setMessage({ visible: "visible", message: "SAVED!" });
    setTimeout(
      () => setMessage({ visible: "hidden", message: "hidden" }),
      2000
    );
  };

  const remove = () => {
    setAnimation("translate3d(-100vw, 0, 0)");
    setTimeout(() => {
      context.remove(props.competition.competition);
    }, 2000);
  };
  return (
    <div css={card}>
      <div css={textWrapper}>
        <h4
          css={{
            letterSpacing: "0.1rem",
            margin: "0.5rem 0",
            fontSize: "0.7rem",
          }}
        >
          {" "}
          {props.competition.competition.title} ENTRY
        </h4>
        <h4
          css={{
            color: "#00C6D6",
            letterSpacing: "0.1rem",
            margin: "0.5rem 0",
            fontSize: "0.7rem",
          }}
        >
          £{props.competition.competition.ticketPrice.toFixed(2)} PER TICKET
        </h4>
        <h4
          onClick={remove}
          css={{
            cursor: "pointer",
            textDecoration: "underline",
            color: "grey",
            letterSpacing: "0.1rem",
            margin: "0.5rem 0",
            fontSize: "0.7rem",
          }}
        >
          REMOVE
        </h4>
        <h4
          css={{
            marginTop: "2rem !important ",
            letterSpacing: "0.1rem",
            margin: "0.5rem 0",
            fontSize: "0.7rem",
          }}
        >
          QUANTITY OF TICKETS
        </h4>
        <div
          css={{
            width: "100%",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <p css={{ fontWeight: "500" }}>LESS</p>
          <button onClick={substract} className="roundButtonSmall">
            -
          </button>
          <p css={{ fontWeight: "500" }}>MORE</p>
          <button onClick={add} className="roundButtonSmall">
            +
          </button>
          <input
            readOnly={true}
            value={setValue(amount)}
            className="inputAmountSmallRect"
          />
        </div>
        <button
          onClick={saveUpdate}
          css={{ marginTop: "2rem" }}
          className="button02"
        >
          SAVE YOUR UPDATE
        </button>
        <p
          css={{
            marginTop: "0.3rem",
            fotWeight: "500",
            textAlign: "center",
            visibility: message.visible,
          }}
        >
          {message.message}
        </p>
      </div>
    </div>
  );
}

export default BasketCard;
