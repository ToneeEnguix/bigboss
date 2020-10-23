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
    { title: "", discount: 0, expires: "10-12-20" },
  ]);
  const [i, setI] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const getPastCompetitions = async () => {
      let resAll = await axios.get(`${URL}/competitions/past`);
      setPastCompetitions(resAll.data);
    };
    getPastCompetitions();
  }, [i]);

  useEffect(() => {
    console.log("i: ", i);
    console.log(pastCompetitions);
  }, [i, pastCompetitions]);

  return (
    <div className="adminPage">
      <div className="flexColumn" css={secondSidebarStyle}>
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
        <div css={titleStyle2}>Past Competitions</div>
        <div className="flexColumn" css={contentStyle}>
          {pastCompetitions[i] &&
            pastCompetitions.map((item, idx) => {
              return (
                <div
                  className={`${
                    pastCompetitions[i].title === item.title && "blueBorder"
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
          />
          <h3 className="default" css={titleStyle}>
            Price
          </h3>
          <input
            className="default"
            readOnly
            defaultValue={pastCompetitions[i].ticketPrice}
          />
          <h3 className="default" css={titleStyle}>
            Description
          </h3>
          <textarea
            className="default"
            readOnly
            defaultValue={pastCompetitions[i].description}
            name="address"
            style={{ height: "100px", lineHeight: "1.4rem" }}
          ></textarea>
          <h3 className="default" css={titleStyle}>
            Finish Date
          </h3>
          <input
            className="default"
            readOnly
            defaultValue="DD / HH / MM / SS"
          />
          <h3 className="default" css={titleStyle}>
            How many tickets will be available?
          </h3>
          <input
            className="default"
            readOnly
            defaultValue={pastCompetitions[i].ticketsAvailable}
          />
          <hr css={hrStyle} />
          <h3 className="default" css={titleStyle}>
            Recorded Facebook Video
          </h3>
          <input
            className="default"
            readOnly
            defaultValue="Enter the link to the video, I.e. https://www.youtube.com"
          />
          <input readOnly defaultValue="And the ... DD / MM / YYYY" />
          <h3 className="default" css={titleStyle}>
            Spreadsheet Link
          </h3>
          <input
            readOnly
            defaultValue="Enter the link to the video, I.e. https://www.youtube.com"
          />
          <h3 className="default" css={titleStyle}>
            Photo of the Winner
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
            <div>
              <div css={photoContStyle} className="flexCenter">
                <img src={insert} css={imgStyle} />
              </div>
              <button css={buttonStyle}>Select Files</button>
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
            <div>
              <h3 className="default" css={titleStyle}>
                Winner Name
              </h3>
              <input readOnly defaultValue="i.e. Jane Doe" />
              <h3 className="default" css={titleStyle}>
                Email
              </h3>
              <input readOnly defaultValue="i.e. jane@janedoe.com" />
            </div>
          </div>
        </div>
        <div style={{ paddingLeft: "2.5rem" }}>
          <div>
            <div css={photoContStyle} className="flexCenter">
              <img src={insert} css={imgStyle} />
            </div>
            <button css={buttonStyle}>Select Files</button>
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
          <div>
            <div css={photoContStyle} className="flexCenter">
              <img src={insert} css={imgStyle} />
            </div>
            <button css={buttonStyle}>Select Files</button>
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
          <div>
            <div css={photoContStyle} className="flexCenter">
              <img src={insert} css={imgStyle} />
            </div>
            <button css={buttonStyle}>Select Files</button>
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
          <div>
            <div css={photoContStyle} className="flexCenter">
              <img src={insert} css={imgStyle} />
            </div>
            <button css={buttonStyle}>Select Files</button>
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
        </div>
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
  imgStyle = {
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
  };

export default PastCompetitions;
