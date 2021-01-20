import React, { useState, useEffect } from "react";
/** @jsx jsx */
import { jsx } from "@emotion/core";
import { get } from "../api/fetch";
import { Redirect, useParams } from "react-router-dom";
import facepaint from "facepaint";
import back from "../resources/arrow.svg";

function EntryDetails(props) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const { id } = useParams();
  const [title, setTitle] = useState("");

  useEffect(() => {
    getData();
    if (props.location.state === undefined) {
      getName();
    } else {
      setTitle(props.location.state.competitionName);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getName = async () => {
    const result = await get(`/competitions/${id}`);
    if (result.ok) {
      setTitle(result.data.title);
    } else {
      setError(true);
    }
  };

  const getData = async () => {
    const result = await get(`/orders/${id}`);
    if (result.ok) {
      setData(result.data);
    } else {
      setError(true);
    }
  };

  const censor = (string) => {
    const shortenedName = string.substring(0, 4);
    return shortenedName + "**********";
  };

  if (error) {
    return <Redirect to={"/home"} />;
  }

  return (
    <div css={contentWrapper}>
      <h1>ENTRIES</h1>
      <div css={titleCont} className="flexCenter">
        <img
          src={back}
          alt="back"
          className="pointer"
          onClick={() => props.history.goBack()}
        />
        <h3>{title.toUpperCase()}</h3>
      </div>
      <div css={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
        <div css={{ marginRight: "4rem" }}>
          <p>{data.length} Entries</p>
        </div>
      </div>
      {data.length > 0 ? (
        <div
          css={{ marginTop: "2rem", marginLeft: "4rem", marginRight: "4rem" }}
        >
          <table css={{ width: "100%" }}>
            <thead>
              <tr>
                <th css={th}>Name</th>
                <th css={th}>Email</th>
                <th css={th}>Tickets Bought</th>
                <th css={th}>Date Purchased</th>
              </tr>
            </thead>
            <tbody>
              {data.map((order, index) => {
                return (
                  <tr css={tr} key={index}>
                    <td>{censor(order.userName)}</td>
                    <td>{censor(order.email)}</td>
                    <td>{order.ticketsBought}</td>
                    <td css={{ textTransform: "uppercase", color: "#00FFFF" }}>
                      {order.dateofPurchase.substring(0, 10)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div
          css={{
            padding: "4rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h1>NOTHING TO SEE HERE YET!!</h1>
          <p css={{ textAlign: "center" }}>
            Soon this section will have something for you!
          </p>
        </div>
      )}
    </div>
  );
}

const breakpoints = [576, 950, 992, 1200];
const mq = facepaint(breakpoints.map((bp) => `@media (min-width: ${bp}px)`));
const contentWrapper = mq({
    margin: "4rem 0rem",
    h1: {
      marginLeft: ["0rem", "0rem", "4rem", "4rem"],
      textAlign: ["center", "center", "left", "left"],
    },
  }),
  th = {
    color: "#868686",
    fontSize: "0.8rem",
    paddingRight: "4rem",
    paddingBottom: "1rem",
    textAlign: "left",
    width: "25%",
  },
  tr = {
    margin: "2rem 4rem",
    width: "100%",

    td: {
      fontSize: "0.8rem",
      fontWeight: "600",
      padding: "0.5rem 0",
    },
  },
  titleCont = {
    marginLeft: "4rem",
    justifyContent: "flex-start",
    marginTop: "0.5rem",
    img: {
      filter: "invert(100%)",
      backgroundColor: "transparent",
      marginRight: ".8rem",
    },
  };

export default EntryDetails;
