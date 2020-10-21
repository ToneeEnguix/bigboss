import React, { useState, useEffect } from "react";
/** @jsx jsx */
import { jsx } from "@emotion/core";
import "./adminheader.css";
import close from "../resources/close.svg";
import ReactModal from "react-modal";
import "./domain.css";

const SecondSidebar = (props) => {
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (props.selected === "listOfEntries") {
      props.allCompetitions[0] &&
        props.setSection(props.allCompetitions[0].title);
    }
    props[props.selected] &&
      props[props.selected][0] &&
      props.setSection(props[props.selected][0].title);
  }, [props.selected, props.allCompetitions]);

  return (
    <div
      className="flexColumn"
      css={secondSidebarStyle}
      style={{ display: props.selected === "faq" && "none" }}
    >
      <ReactModal
        isOpen={openModal}
        style={{
          overlay: {
            backgroundColor: "#2626266d",
          },
          content: {
            position: "relative",
            top: "50%",
            left: "1020px",
            right: "auto",
            bottom: "auto",
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
            Are you sure you want to delete this competition?
          </h3>
        </div>
        <div className="flexCenter bgtransparent">
          <button
            className="raleway dm_modalBtn dm_modalBtn1 pointer"
            onClick={() => setOpenModal(false)}
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
      <div css={titleStyle}>
        {props.selected === "activeCompetitions"
          ? "Active Competitions"
          : props.selected === "pastCompetitions"
          ? "Past Competitions"
          : props.selected === "listOfEntries"
          ? "List Of Entries"
          : props.selected === "discounts"
          ? "Active Discounts"
          : props.selected === "faq" && "FAQ"}
      </div>
      {/* {props.selected === "activeCompetitions" ? ( */}
      <div className="flexColumn" css={contentStyle}>
        {props.selected !== "listOfEntries"
          ? props[props.selected] &&
            props[props.selected].map((item, i) => {
              return (
                <div
                  className={`${
                    props.section === item.title && "blueBorder"
                  } flexCenter`}
                  onClick={() => {
                    props.setSection(item.title);
                  }}
                  css={selectorContStyle}
                  key={i}
                >
                  <p>{item.title}</p>
                  <div
                    className="flexCenter"
                    onClick={() => setOpenModal(true)}
                  >
                    <img src={close} onClick={() => setOpenModal(true)} />
                  </div>
                </div>
              );
            })
          : props.allCompetitions.map((item, i) => {
              return (
                <div
                  className={`${
                    props.section === item.title && "blueBorder"
                  } flexCenter`}
                  onClick={() => {
                    props.setSection(item.title);
                  }}
                  css={selectorContStyle}
                  key={i}
                >
                  <p>{item.title}</p>
                  <div
                    className="flexCenter"
                    onClick={() => setOpenModal(true)}
                  >
                    <img src={close} onClick={() => setOpenModal(true)} />
                  </div>
                </div>
              );
            })}
      </div>
      {/* ) : props.selected === "pastCompetitions" ? (
        <div className="flexColumn" css={contentStyle}>
          {props.pastCompetitions.map((item, i) => {
            return (
              <div
                className={`${
                  props.section === item.title && "blueBorder"
                } flexCenter`}
                onClick={() => {
                  props.setSection(item.title);
                }}
                css={selectorContStyle}
                key={i}
              >
                <p>{item.title}</p>
                <div className="flexCenter" onClick={() => setOpenModal(true)}>
                  <img src={close} onClick={() => setOpenModal(true)} />
                </div>
              </div>
            );
          })}
        </div>
      ) : props.selected === "listOfEntries" ? (
        <div className="flexColumn" css={contentStyle}>
          {props.allCompetitions.map((item, i) => {
            return (
              <div className="flexCenter" css={selectorContStyle} key={i}>
                <p>{item.title}</p>
                <div className="flexCenter" onClick={() => setOpenModal(true)}>
                  <img src={close} onClick={() => setOpenModal(true)} />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        props.selected === "discounts" && (
          <div className="flexColumn" css={contentStyle}>
            {props.discounts.length > 0 &&
              props.discounts.map((item, i) => {
                return (
                  <div
                    className={`${
                      props.section === item.title && "blueBorder"
                    } flexCenter`}
                    css={selectorContStyle}
                    key={i}
                    onClick={() => {
                      props.setSection(item.title);
                    }}
                  >
                    <p>{item.title}</p>
                    <div
                      className="flexCenter"
                      onClick={() => setOpenModal(true)}
                    >
                      <img src={close} onClick={() => setOpenModal(true)} />
                    </div>
                  </div>
                );
              })}
          </div>
        )
      )} */}
    </div>
  );
};
export default SecondSidebar;

const secondSidebarStyle = {
  position: "fixed",
  top: "90px",
  left: "237.75px",
  height: "86.5vh",
  width: "360px",
  backgroundColor: "#262626",
  boxShadow: "0px 3px 6px #00000029",
  fontFamily: "Raleway",
  justifyContent: "flex-start",
  color: "white",
  zIndex: "1",
  transition: "all 1s",
  fontWeight: "300",
};
const titleStyle = {
    margin: "2.2rem 0 1.1rem 0",
    fontSize: "1.23rem",
    fontFamily: "Raleway",
    letterSpacing: "0.004rem",
    alignSelf: "flex-start",
    paddingLeft: "2.9rem",
    backgroundColor: "#262626",
  },
  contentStyle = {
    alignItems: "flex-start",
    lineHeight: "1.7rem",
    width: "60%",
    backgroundColor: "#262626",
    width: "100%",
    padding: "0 3rem",
    "div:hover": {
      borderColor: "#2680eb !important",
    },
    p: {
      fontFamily: "Raleway",
      fontWeight: "300",
      letterSpacing: "0.01rem",
      fontSize: "0.75rem",
      backgroundColor: "#262626",
    },
  },
  selectorContStyle = {
    margin: "0 auto 1.2rem",
    border: "1px solid transparent",
    borderRadius: "100px",
    boxShadow: "0px 2px 3px #202020",
    padding: "0 0 0 1.8rem",
    width: "100%",
    justifyContent: "space-between",
    boxSizing: "border-box",
    height: "34px",
    cursor: "pointer",
    div: {
      backgroundColor: "#333333",
      height: "100%",
      borderRadius: "100px",
      height: "32px",
      width: "32px",
    },
    "div:hover img": {
      width: "20px",
    },
    img: {
      backgroundColor: "#333333",
    },
  };
