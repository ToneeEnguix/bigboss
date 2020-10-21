import React, { useEffect, useState } from "react";
/** @jsx jsx */
import { jsx } from "@emotion/core";
import { get } from "../api/fetch";
import { Redirect } from "react-router-dom";

function FAQ() {
  const [faqs, setFaqs] = useState([]);
  const [error, setError] = useState(false);

  async function getAllFaq() {
    const faq = await get("/faq/all");

    if (faq.ok) {
      setFaqs(faq.data);
    } else {
      setError(true);
    }
  }

  useEffect(() => {
    getAllFaq();
  }, []);

  if (error) {
    return <Redirect to={"/error"} />;
  }

  return (
    <div
      css={{
        marginLeft: "4rem",
        display: "flex",
        flexDirection: "column",
        width: "70%",
      }}
    >
      <h1 css={{ marginBottom: "2rem" }}>FAQ</h1>
      <div css={{ paddingRight: "2rem" }}>
        {faqs.map((faq, index) => {
          return (
            <div key={index}>
              <h5 css={{ textTransform: "uppercase", padding: "0.5rem 0" }}>
                Q{index + 1}. {faq.question}
              </h5>
              <p
                css={{
                  textAlign: "justify",
                  color: "#868686",
                  textTransform: "uppercase",
                  padding: "0.5rem 0",
                  lineHeight: "1.4",
                }}
              >
                {faq.answer}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FAQ;
