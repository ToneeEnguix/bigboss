import React, { useEffect, useState } from "react";
/** @jsxFrag React.Fragment */
/** @jsx jsx */
import { jsx } from "@emotion/core";

const FAQ = (props) => {
  // const handleChange = (e, i) => {
  //   let tempFaq = faq;
  //   tempFaq[i][e.target.name] = e.target.value;
  //   setFaq(tempFaq);
  // };

  const handleChange = (e, i) => {
    props.setFaq("faq", e, i);
  };

  return (
    <div className="adminPage adminPage2">
      <h3 css={mainTitleStyle}>FAQ</h3>
      <div className="bgtransparent" style={{ padding: "1px .2rem" }}>
        {props.faq.length > 0 &&
          props.faq.map((item, i) => {
            return (
              <form
                key={i}
                className="bgtransparent"
                onChange={(e) => handleChange(e, i)}
              >
                <input
                  css={titleStyle}
                  defaultValue={item.question}
                  name="question"
                />
                <textarea
                  defaultValue={item.answer}
                  name="answer"
                  style={{ height: "182px", lineHeight: "1.4rem" }}
                  // value={business.address}
                ></textarea>
              </form>
            );
          })}
      </div>
    </div>
  );
};

export default FAQ;

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
    margin: "1.5rem auto 0",
  };
