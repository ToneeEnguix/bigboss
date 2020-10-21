import React from "react";
/** @jsx jsx */
import { jsx } from "@emotion/core";

const ListOfEntries = () => {
  const sectionStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    paddingRight: "0",
    h3: {
      fontFamily: "Raleway",
      letterSpacing: "0.02rem",
      fontWeight: "300",
      marginBottom: "1.5rem",
      fontSize: "1.25rem",
    },
    p: {
      fontFamily: "Raleway",
      letterSpacing: "0.02rem",
      fontWeight: "300",
      marginBottom: ".9rem",
      fontSize: "0.75rem",
    },
    div: {
      backgroundColor: "#212121 !important",
      paddingLeft: "1rem",
    },
  };

  return (
    <div className="adminPage" css={sectionStyle}>
      <div>
        <h3>Entries</h3>
        <p>Jon Doe</p>
        <p>Jon Doe</p>
        <p>Jon Doe</p>
        <p>Jon Doe</p>
        <p>Jon Doe</p>
        <p>Jon Doe</p>
      </div>
      <div>
        <h3>Email</h3>
        <p>jon@jondoe.com</p>
        <p>jon@jondoe.com</p>
        <p>jon@jondoe.com</p>
        <p>jon@jondoe.com</p>
        <p>jon@jondoe.com</p>
        <p>jon@jondoe.com</p>
      </div>
      <div>
        <h3>Bought</h3>
        <p>01</p>
        <p>03</p>
        <p>04</p>
        <p>02</p>
        <p>01</p>
        <p>02</p>
      </div>
      <div>
        <h3>Spent</h3>
        <p>£30</p>
        <p>£54</p>
        <p>£30</p>
        <p>£54</p>
        <p>£30</p>
        <p>£54</p>
      </div>
    </div>
  );
};

export default ListOfEntries;
