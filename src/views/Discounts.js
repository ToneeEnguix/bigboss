import React from "react";
/** @jsx jsx */
import { jsx } from "@emotion/core";

const Discounts = (props) => {
  const handleChange = (e) => {
    props.setDiscounts("discounts", e);
  };

  return (
    <div className="adminPage">
      <h3 css={mainTitleStyle}>
        {props.discounts[0] && props.discounts[0].title}
      </h3>
      <div className="grid2 bgtransparent">
        <form className="bgtransparent" onChange={(e) => handleChange(e)}>
          <h3 css={titleStyle}>Discount Code</h3>
          <input
            defaultValue={props.discounts[0] && props.discounts[0].title}
            name="title"
          />
          <h3 css={titleStyle}>Value Calculated in %</h3>
          <input
            defaultValue={props.discounts[0] && props.discounts[0].discount}
            name="discount"
          />
          <h3 css={titleStyle}>Date of Expiry</h3>
          <input
            defaultValue={
              props.discounts[0] && props.discounts[0].expires.slice(0, 10)
            }
            name="expires"
          />
        </form>
        <div className="bgtransparent"></div>
      </div>
    </div>
  );
};

const mainTitleStyle = {
    marginBottom: "1rem",
    fontFamily: "Raleway",
    letterSpacing: "0.05rem",
    fontWeight: "300",
    fontSize: "1.15rem",
  },
  titleStyle = {
    fontFamily: "Raleway",
    letterSpacing: "0.05rem",
    fontWeight: "300",
    fontSize: "1.15rem",
    margin: "1.7rem auto 0",
  };

export default Discounts;
