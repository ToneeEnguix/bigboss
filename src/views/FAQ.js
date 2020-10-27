import React, { useEffect, useState } from "react";
/** @jsxFrag React.Fragment */
/** @jsx jsx */
import { jsx } from "@emotion/core";
import axios from "axios";
import { URL } from "../config";
import "../components/domain.css";
import ReactModal from "react-modal";
import close from "../resources/close.svg";

const FAQ = (props) => {
  const [faq, setFaq] = useState([
    { title: "", discount: 0, expires: "10-12-20" },
    { title: "", discount: 0, expires: "10-12-20" },
  ]);
  const [i, setI] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    getFaq();
  }, []);

  const getFaq = async () => {
    let resFaq = await axios.get(`${URL}/faq/all`);
    setFaq(resFaq.data);
  };

  useEffect(() => {
    const updateFaq = async () => {
      props.setUpdate();
      await axios.post(`${URL}/faq/update`, { faq });
    };
    props.update && updateFaq();
  }, [props.update]);

  useEffect(() => {
    const createFaq = async () => {
      props.setCreate();
      await axios.get(`${URL}/faq/create`);
      getFaq();
    };
    props.create && createFaq();
  }, [props.create]);

  const deleteFaq = async () => {
    await axios.post(`${URL}/faq/delete`, {
      faq: faq[i],
    });
    getFaq();
  };

  const handleChange = (e, i) => {
    let tempFaq = [...faq];
    tempFaq[i][e.target.name] = e.target.value;
    setFaq(tempFaq);
  };

  useEffect(() => {
    console.log(i);
  }, [i]);

  return (
    <div className="adminPage adminPage2">
      <h3 css={mainTitleStyle}>FAQ</h3>
      <div className="bgtransparent" style={{ padding: "1px .2rem" }}>
        {faq.length > 0 &&
          faq.map((item, i) => {
            return (
              <form
                key={i}
                className="bgtransparent"
                onChange={(e) => handleChange(e, i)}
              >
                <div
                  className="flexCenter bgtransparent"
                  css={{ justifyContent: "space-between" }}
                >
                  <input
                    css={titleStyle}
                    defaultValue={item.question}
                    name="question"
                    className="styledInput"
                  />
                  <button
                    className="pointer styledInput"
                    css={buttonStyle}
                    type="button"
                    onClick={() => {
                      setI(i);
                      setOpenModal(true);
                    }}
                  >
                    Delete
                  </button>
                </div>
                <textarea
                  defaultValue={item.answer}
                  name="answer"
                  style={{ height: "182px", lineHeight: "1.4rem" }}
                  className="styledInput raleway"
                ></textarea>
              </form>
            );
          })}
      </div>
      <ReactModal
        ariaHideApp={false}
        isOpen={openModal}
        style={{
          overlay: {
            backgroundColor: "#2626266d",
          },
          content: {
            position: "relative",
            top: "50%",
            left: "50%",
            right: "50%",
            bottom: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#212121",
            borderColor: "#707070",
            color: "white",
            fontFamily: "Raleway",
            padding: "6rem 0",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "340px",
            width: "640px",
            zIndex: "100",
          },
        }}
      >
        <img
          src={close}
          className="bgtransparent pointer"
          style={{ margin: "-5rem -26.8rem 3rem 10rem" }}
          onClick={() => setOpenModal(false)}
        />
        <div className="bgtransparent flexCenter">
          <h3
            className="inline bgtransparent raleway"
            style={{ fontSize: "1.2rem" }}
          >
            Are you sure you want to delete this question?
          </h3>
        </div>
        <div
          className="flexColumn bgtransparent justifyText"
          css={{ margin: "3rem auto 2rem", padding: "0 2rem", width: "100%" }}
        >
          <p css={{ fontFamily: "Raleway", marginBottom: "1rem" }}>
            {faq[i] && faq[i].question}
          </p>
          <p css={{ fontFamily: "Raleway" }}>{faq[i] && faq[i].answer}</p>
        </div>
        <div className="flexCenter bgtransparent">
          <button
            className="raleway dm_modalBtn dm_modalBtn1 pointer"
            onClick={() => {
              deleteFaq();
              setOpenModal(false);
            }}
          >
            Yes
          </button>
          <button
            className="raleway dm_modalBtn dm_modalBtn2 pointer"
            onClick={() => setOpenModal(false)}
          >
            No
          </button>
        </div>
      </ReactModal>
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
    margin: "1.5rem 15px 0 0",
    width: "100%",
  },
  buttonStyle = {
    fontFamily: "Raleway",
    letterSpacing: "0.05rem",
    fontWeight: "300",
    fontSize: ".8rem",
    margin: "1.5rem 0 0",
    width: "15%",
    "&:hover": {
      border: "1px solid rgba(255, 41, 41, .7)",
    },
  };
