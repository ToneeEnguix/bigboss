import React, { useEffect, useState } from "react";
/** @jsx jsx */
import { jsx } from "@emotion/core";
import "./dashboardstyles.css";
import insert from "../resources/insert.svg";
import ReactModal from "react-modal";
import close from "../resources/close.svg";
import axios from "axios";
import { URL } from "../config";
import "../components/domain.css";

const PastCompetitions = () => {
  const [pastCompetitions, setPastCompetitions] = useState([
    {
      title: "",
      discount: 0,
      expires: "10-12-20",
      pictures: ["https://picsum.photos/300/200"],
      dateFinishes: "",
      entriesDate: "",
      description: [""],
      winner: {
        name: "",
        email: "",
      },
    },
  ]);
  const [i, setI] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const getPastCompetitions = async () => {
      let resPast = await axios.get(`${URL}/competitions/past`);
      setPastCompetitions(resPast.data);
      console.log(resPast.data);
    };
    getPastCompetitions();
  }, [i]);

  return (
    <div className="adminPage">
      <div className="flexColumn" css={secondSidebarStyle}>
        <div css={titleStyle2}>Past Competitions</div>
        <div className="flexColumn" css={contentStyle}>
          {pastCompetitions[i] &&
            pastCompetitions.map((item, idx) => {
              return (
                <div
                  className={`${
                    pastCompetitions[i]._id === item._id && "blueBorder"
                  } flexCenter`}
                  onClick={() => {
                    setI(idx);
                  }}
                  css={selectorContStyle}
                  key={idx}
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
      </div>
      <h3 css={mainTitleStyle}>{pastCompetitions[i].title}</h3>
      <div css={mainContentStyle} className="grid2">
        <div>
          <h3 className="default" css={titleStyle}>
            Title
          </h3>
          <input
            className="default"
            readOnly
            defaultValue={pastCompetitions[i].title}
            className="styledInput"
          />
          <h3 className="default" css={titleStyle}>
            Price
          </h3>
          <input
            className="default"
            readOnly
            defaultValue={pastCompetitions[i].ticketPrice}
            className="styledInput"
          />
          <h3 className="default" css={titleStyle}>
            Description
          </h3>
          <p className="styledInput raleway">
            {pastCompetitions[i].description[0]}
          </p>
          <p className="styledInput raleway">
            {pastCompetitions[i].description[1]}
          </p>
          <p className="styledInput raleway">
            {pastCompetitions[i].description[2]}
          </p>
          <p className="styledInput raleway">
            {pastCompetitions[i].description[3]}
          </p>
          <p className="styledInput raleway">
            {pastCompetitions[i].description[4]}
          </p>
          <h3 className="default" css={titleStyle}>
            Finish Date
          </h3>
          <p className="styledInput raleway">
            {pastCompetitions[i].dateFinishes.slice(0, -14) +
              " " +
              pastCompetitions[i].dateFinishes.slice(-10, -5)}
          </p>
          <h3 className="default" css={titleStyle}>
            How many tickets were available?
          </h3>
          <input
            className="default"
            readOnly
            defaultValue={pastCompetitions[i].ticketsAvailable}
            className="styledInput"
          />
          <hr css={hrStyle} />
          <h3 className="default" css={titleStyle}>
            Recorded Facebook Video
          </h3>
          <a href={pastCompetitions[i].facebookURL} target="_blank">
            <p className="styledInput raleway">
              {pastCompetitions[i].facebookURL}
            </p>
          </a>
          <p className="styledInput raleway">
            {pastCompetitions[i].entriesDate.slice(0, -14) +
              " " +
              pastCompetitions[i].entriesDate.slice(-10, -5)}
          </p>
          <h3 className="default" css={titleStyle}>
            Spreadsheet Link
          </h3>
          <a href={pastCompetitions[i].entriesURL} target="_blank">
            <p className="styledInput raleway">
              {pastCompetitions[i].entriesURL}
            </p>
          </a>
          <h3 className="default" css={titleStyle}>
            Photo of the Winner
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
            {pastCompetitions[i].winnerPic ? (
              <div css={imgContStyle}>
                <img src={pastCompetitions[i].winnerPic} css={winnerImgStyle} />
              </div>
            ) : (
              <div>
                <div css={photoContStyle} className="flexCenter">
                  <img src={insert} css={noImgStyle} />
                </div>
                <button css={buttonStyle} className="styledInput">
                  Select Files
                </button>
                <p className="gray raleway" css={pStyle}>
                  Maximum upload file size: 512 MB. Make sure you logo is a .PNG
                </p>
                <p className="gray raleway" css={pStyle}>
                  A .PNG is a logo with a transparent background.
                </p>
                <p className="blue raleway" css={pStyle}>
                  Successfully saved!
                </p>
              </div>
            )}

            <div>
              <h3 className="default" css={titleStyle}>
                Winner Name
              </h3>
              <input
                readOnly
                defaultValue={
                  pastCompetitions[i].winner
                    ? pastCompetitions[i].winner.name
                    : "No winner yet"
                }
                className={`${
                  !pastCompetitions[i].winner && "gray"
                } styledInput`}
              />
              <h3 className="default" css={titleStyle}>
                Email
              </h3>
              <input
                readOnly
                defaultValue={
                  pastCompetitions[i].winner
                    ? pastCompetitions[i].winner.email
                    : "No winner yet"
                }
                className={`${
                  !pastCompetitions[i].winner && "gray"
                } styledInput`}
              />
            </div>
          </div>
        </div>
        <div style={{ paddingLeft: "2.5rem", width: "100%" }}>
          {pastCompetitions[i].pictures.map((item, idx) => {
            return (
              <div
                className="flexColumn"
                style={{
                  backgroundColor: "#F1F1F1",
                  margin: "0 auto 4rem",
                  borderRadius: "10px",
                }}
                key={idx}
              >
                <h4
                  className="raleway"
                  css={{
                    color: "black",
                    padding: "0.7rem 0",
                    fontSize: "1rem",
                  }}
                >
                  Image {idx}
                </h4>
                <img src={item} css={imgStyle} />
              </div>
            );
          })}
        </div>
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

const mainTitleStyle = {
    marginBottom: "1rem",
    fontFamily: "Raleway",
    letterSpacing: "0.05rem",
    fontWeight: "300",
    fontSize: "1.15rem",
    height: "21px",
  },
  mainContentStyle = {
    backgroundColor: "#212121",
    div: {
      backgroundColor: "#212121",
    },
  },
  titleStyle = {
    fontFamily: "Raleway",
    letterSpacing: "0.05rem",
    fontWeight: "300",
    fontSize: "1.15rem",
    margin: "1.7rem auto 0",
  },
  hrStyle = {
    display: "block",
    height: "1px",
    border: "0",
    borderTop: "1px dashed #ccc",
    margin: "2rem 0 1rem",
    width: "40%",
    padding: "0",
  },
  photoContStyle = {
    border: "1px dashed gray",
    height: "200px",
    width: "200px",
    margin: "1.7rem 0 0",
    borderRadius: "7px",
  },
  noImgStyle = {
    width: "100px",
    backgroundColor: "transparent",
    filter: "invert(70%)",
  },
  buttonStyle = {
    width: "70%",
    backgroundColor: "transparent",
  },
  pStyle = {
    marginTop: "1rem",
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
  },
  imgContStyle = {
    padding: "2rem 3rem 0 0",
  },
  imgStyle = {
    width: "100%",
    boxShadow: "5px 5px 10px #111",
    borderRadius: "0 0 5px 5px",
  },
  winnerImgStyle = {
    width: "100%",
    boxShadow: "5px 5px 10px #111",
    borderRadius: "10px",
  };

export default PastCompetitions;
