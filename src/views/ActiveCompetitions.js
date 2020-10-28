import React, { useEffect, useState, useCallback } from "react";
/** @jsx jsx */
import { jsx } from "@emotion/core";
import "./dashboardstyles.css";
import ReactModal from "react-modal";
import close from "../resources/close.svg";
import axios from "axios";
import { URL } from "../config";
import "../components/domain.css";
import ImagePicker from "./imagePicker";

const ActiveCompetitions = (props) => {
  const [activeCompetitions, setActiveCompetitions] = useState([
    {
      title: "",
      ticketPrice: 0,
      maxTickets: 10,
      dateFinishes: "",
      description: ["", "", "", "", ""],
      facebookURL: "",
      entriesDate: "",
      entriesURL: "",
      pictures: ["", "", "", "", "", ""],
    },
  ]);
  const [i, setI] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [today, setToday] = useState("");
  const [remove, setRemove] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    getActiveCompetitions();
  }, [i]);

  const getActiveCompetitions = async () => {
    let resAll = await axios.get(`${URL}/competitions/active`);
    resAll.data.map((item) => {
      item.dateFinishes = item.dateFinishes.slice(0, -8);
      item.entriesDate = item.entriesDate.slice(0, -8);
    });
    resAll.data.map((item) => {
      item.pictures.push("");
    });
    setRemove("");
    setActiveCompetitions(resAll.data);
  };

  useEffect(() => {
    const updateActiveCompetitions = async () => {
      props.setUpdate();
      await axios.post(`${URL}/competitions/update`, {
        competition: activeCompetitions[i],
      });
      getActiveCompetitions();
    };
    props.update && updateActiveCompetitions();
  }, [props.update]);

  const handleChange = (e, i, idx) => {
    let tempActiveCompetitions = [...activeCompetitions];
    if (e.target.name === "dateFinishes" || e.target.name === "entriesDate") {
      e.target.value = new Date(e.target.value).toISOString().slice(0, -8);
    } else if (e.target.name === "description") {
      tempActiveCompetitions[i][e.target.name][idx] = e.target.value;
      return setActiveCompetitions(tempActiveCompetitions);
    }
    tempActiveCompetitions[i][e.target.name] = e.target.value;
    setActiveCompetitions(tempActiveCompetitions);
  };

  useEffect(() => {
    let today = new Date(Date.now()).toISOString().slice(0, -8);
    setToday(today);
  }, []);

  const removePicture = () => {
    let tempActiveCompetitions = [...activeCompetitions];
    tempActiveCompetitions[i].pictures.splice(index, 1);
    setActiveCompetitions(tempActiveCompetitions);
    setOpenModal(false);
  };

  return (
    <div className="adminPage">
      <div className="flexColumn" css={secondSidebarStyle}>
        <div css={titleStyle2}>Active Competitions</div>
        <div className="flexColumn" css={contentStyle}>
          {props.activeCompetitions[i] &&
            props.activeCompetitions.map((item, idx) => {
              return (
                <div
                  className={`${
                    props.activeCompetitions[i]._id === item._id && "blueBorder"
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
                    <img
                      src={close}
                      onClick={() => {
                        setRemove("competition");
                        setOpenModal(true);
                      }}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <h3 css={mainTitleStyle}>{activeCompetitions[i].title}</h3>
      <div css={mainContentStyle} className="grid2">
        <div>
          <h3 css={titleStyle}>Title</h3>
          <input
            value={activeCompetitions[i].title}
            onChange={(e) => handleChange(e, i)}
            name="title"
            className="styledInput"
          />
          <h3 css={titleStyle}>Price</h3>
          <input
            value={activeCompetitions[i].ticketPrice}
            onChange={(e) => handleChange(e, i)}
            name="ticketPrice"
            className="styledInput"
          />
          <h3 css={titleStyle}>Description</h3>
          <input
            value={activeCompetitions[i].description[0]}
            name="description"
            className="styledInput"
            onChange={(e) => handleChange(e, i, 0)}
          />
          <input
            value={activeCompetitions[i].description[1]}
            name="description"
            className="styledInput"
            onChange={(e) => handleChange(e, i, 1)}
          />
          <input
            value={activeCompetitions[i].description[2]}
            name="description"
            className="styledInput"
            onChange={(e) => handleChange(e, i, 2)}
          />
          <input
            value={activeCompetitions[i].description[3]}
            name="description"
            className="styledInput"
            onChange={(e) => handleChange(e, i, 3)}
          />
          <input
            value={activeCompetitions[i].description[4]}
            name="description"
            className="styledInput"
            onChange={(e) => handleChange(e, i, 4)}
          />
          <h3 css={titleStyle}>Date Finishes</h3>
          <input
            type="datetime-local"
            name="dateFinishes"
            min={today}
            value={activeCompetitions[i].dateFinishes}
            onChange={(e) => handleChange(e, i)}
            className="styledInput"
          />
          <h3 css={titleStyle}>How many tickets will be available?</h3>
          <input
            value={activeCompetitions[i].maxTickets}
            onChange={(e) => handleChange(e, i)}
            name="maxTickets"
            className="styledInput"
          />
          <hr css={hrStyle} />
          <h3 css={titleStyle}>Recorded Facebook Video</h3>
          <input
            value={activeCompetitions[i].facebookURL}
            onChange={(e) => handleChange(e, i)}
            name="facebookURL"
            className="styledInput"
          />
          <input
            type="datetime-local"
            name="entriesDate"
            min={today}
            value={activeCompetitions[i].entriesDate}
            onChange={(e) => handleChange(e, i)}
            className="styledInput"
          />
          <h3 css={titleStyle}>Spreadsheet Link</h3>
          <input
            value={activeCompetitions[i].entriesURL}
            onChange={(e) => handleChange(e, i)}
            name="entriesURL"
            className="styledInput"
          />
        </div>
        <div style={{ paddingLeft: "2.5rem" }}>
          {/* here it goes */}
          {activeCompetitions[i].pictures.map((image, idx) => {
            console.log(image);
            return (
              <div key={idx}>
                <ImagePicker
                  setState={(uploadedFile) => {
                    let tempActive = activeCompetitions;
                    tempActive[i].pictures[idx] = uploadedFile.secure_url;
                    setRemove(" ");
                    console.log(tempActive);
                    console.log(image);
                    setActiveCompetitions(tempActive);
                  }}
                  image={image}
                />
                <p
                  style={{
                    display:
                      (image !== "" || (image === "" && remove === "")) &&
                      "none",
                    position: "relative",
                    top: "0",
                    zIndex: "10",
                  }}
                >
                  Click top right corner to save changes
                </p>
                <div
                  style={{
                    display: image === "" && "none",
                    width: "100%",
                    height: "300px",
                  }}
                  className="flexColumn bgtransparent"
                >
                  <img
                    src={close}
                    style={{
                      alignSelf: "flex-end",
                      position: "relative",
                      top: "22px",
                      right: "5px",
                      borderRadius: "100px",
                    }}
                    className="pointer"
                    onClick={() => {
                      setRemove("image");
                      setIndex(idx);
                      setOpenModal(true);
                    }}
                  />
                  <div
                    css={photoContStyle}
                    className="flexCenter"
                    style={{ width: "100%" }}
                  >
                    <img src={image} css={imgStyle} style={{ width: "100%" }} />
                  </div>
                  <p
                    style={{
                      display:
                        idx !== activeCompetitions[i].pictures.length - 1 &&
                        "none",
                      position: "relative",
                      top: "0",
                      zIndex: "10",
                    }}
                  >
                    Click top right corner to save changes
                  </p>
                </div>
              </div>
            );
          })}
        </div>
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
            Are you sure you want to delete this {remove}?
          </h3>
        </div>
        <div className="flexCenter bgtransparent">
          <button
            className="raleway dm_modalBtn dm_modalBtn1 pointer"
            onClick={() => removePicture()}
          >
            Yes
          </button>
          <button
            className="raleway dm_modalBtn dm_modalBtn2 pointer"
            onClick={() => {
              setRemove("");
              setOpenModal(false);
            }}
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
    margin: "0 0 1.7rem",
    borderRadius: "7px",
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
  imgStyle = {
    width: "200px",
    height: "200px",
    boxShadow: "5px 5px 10px #111",
    borderRadius: "0 0 5px 5px",
  };

export default ActiveCompetitions;
