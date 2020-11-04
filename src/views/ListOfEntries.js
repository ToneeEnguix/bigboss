import React, { useEffect, useState } from "react";
/** @jsx jsx */
import { jsx } from "@emotion/core";
import ReactModal from "react-modal";
import close from "../resources/close.svg";
import axios from "axios";
import { URL } from "../config";
import "../components/domain.css";

const ListOfEntries = () => {
  const [allCompetitions, setAllCompetitions] = useState([{ _id: "" }]);
  const [listOfEntries, setListOfEntries] = useState([]);
  const [i, setI] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const getCompsAndEntries = async () => {
      let resAll = await axios.get(`${URL}/competitions/all`);
      setAllCompetitions(resAll.data);
      let resEntries = await axios.get(`${URL}/orders/${resAll.data[i]._id}`);
      setListOfEntries(resEntries.data);
    };
    getCompsAndEntries();
  }, [i]);

  return (
    <div className="adminPage" css={sectionStyle}>
      <div className="flexColumn" css={secondSidebarStyle}>
        <div css={titleStyle2}>List Of Entries</div>
        <div className="flexColumn scrollbar" css={contentStyle}>
          {allCompetitions[i] &&
            allCompetitions.map((item, idx) => {
              return (
                <div
                  className={`${
                    allCompetitions[i]._id === item._id && "blueBorder"
                  } flexCenter`}
                  onClick={() => {
                    setI(idx);
                  }}
                  css={selectorContStyle}
                  key={idx}
                >
                  <p>{item.title}</p>
                </div>
              );
            })}
        </div>
      </div>
      <div css={entriesStyle}>
        <h3>Entries</h3>
        {listOfEntries.map((item, idx) => {
          return <p key={idx}>{item.user.name}</p>;
        })}
      </div>
      <div css={entriesStyle}>
        <h3>Email</h3>
        {listOfEntries.map((item, idx) => {
          return <p key={idx}>{item.user.email}</p>;
        })}
      </div>
      <div css={entriesStyle}>
        <h3>Bought</h3>
        {listOfEntries.map((item, idx) => {
          return item.productsBought.map((item) => {
            return <p key={idx}>{item.amount}</p>;
          });
        })}
      </div>
      <div css={entriesStyle}>
        <h3>Spent</h3>
        {listOfEntries.map((item, idx) => {
          return item.productsBought.map((item) => {
            return <p key={idx}>{item.amount * item.product.ticketPrice}</p>;
          });
        })}
      </div>
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
    </div>
  );
};

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
  },
  entriesStyle = {
    backgroundColor: "#212121 !important",
    paddingLeft: "1rem",
    p: {
      fontFamily: "Raleway",
      letterSpacing: "0.02rem",
      fontWeight: "300",
      marginBottom: ".9rem",
      fontSize: "0.75rem",
    },
  };

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
  },
  titleStyle2 = {
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
    p: {
      lineHeight: "32px",
    },
  };

export default ListOfEntries;
