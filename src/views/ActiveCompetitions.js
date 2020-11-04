import React, { useEffect, useState, useCallback } from "react";
/** @jsxFrag React.Fragment */
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
      dateFinishes: "",
      maxTickets: 10,
      prize: "",
      description: ["", "", "", "", ""],
      pictures: ["", "", "", "", "", ""],
    },
  ]);
  const [newComp, setNewComp] = useState({
    title: "New title",
    ticketPrice: 10,
    dateFinishes: new Date(Date.now()).toISOString().slice(0, -8),
    prize: "Motorcycle",
    maxTickets: 10,
    description: ["", "", "", "", ""],
    pictures: [
      "https://res.cloudinary.com/ckellytv/image/upload/v1600421103/LOGO_BIG_BOSS_j9riqf.png",
      "",
      "",
      "",
    ],
  });
  const [i, setI] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [today, setToday] = useState("");
  const [remove, setRemove] = useState("");
  const [index, setIndex] = useState(0);
  const [halfSubmit, setHalfSubmit] = useState(false);
  const [unsaved, setUnsaved] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getActiveCompetitions();
  }, [i]);

  const getActiveCompetitions = async () => {
    let resAll = await axios.get(`${URL}/competitions/active`);
    resAll.data.map((item) => {
      item.dateFinishes = item.dateFinishes.slice(0, -8);
      item.pictures.push("");
    });
    setRemove("");
    setActiveCompetitions(resAll.data);
  };

  useEffect(() => {
    const updateActiveCompetitions = async () => {
      props.setUpdate();
      let res = await axios.post(`${URL}/competitions/update`, {
        competition: activeCompetitions[i],
      });
      if (res.data.ok) {
        setSaved(true);
        getActiveCompetitions();
      }
    };
    props.update && updateActiveCompetitions();
  }, [props.update]);

  const handleChange = (e, i, idx) => {
    setUnsaved(true);
    let tempActiveCompetitions = [...activeCompetitions];
    if (e.target.name === "dateFinishes") {
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
    setUnsaved(true);
    let tempActiveCompetitions = [...activeCompetitions];
    tempActiveCompetitions[i].pictures.splice(index, 1);
    setActiveCompetitions(tempActiveCompetitions);
    setOpenModal(false);
  };

  const handleChange2 = (e) => {
    setUnsaved(true);
    setNewComp({ ...newComp, [e.target.name]: e.target.value });
  };

  const submitNewComp = async () => {
    newComp.pictures.map((item, idx) => {
      item === "" && newComp.pictures.splice(idx, 1);
    });
    try {
      let res = await axios.post(`${URL}/competitions/create`, {
        competition: newComp,
      });
      if (res.data.ok) {
        props.setCreate();
        setSaved(true);
        getActiveCompetitions();
        setHalfSubmit(false);
      }
    } catch (err) {
      setHalfSubmit(true);
      console.error(err);
    }
  };

  const removeCompetition = async () => {
    let res = await axios.post(`${URL}/competitions/delete`, {
      competition: activeCompetitions[i],
    });
    if (res.data.ok) {
      props.setRefresh();
      setOpenModal(false);
      setI(0);
      getActiveCompetitions();
    }
  };

  useEffect(() => {
    setUnsaved(false);
    if (saved) {
      setTimeout(() => {
        setSaved(false);
      }, 1000);
    }
  }, [saved]);

  return (
    <>
      {props.create ? (
        <div className="adminPage adminPage2">
          <div
            className="bgtransparent flexCenter"
            style={{ justifyContent: "space-between" }}
          ></div>
          <div css={mainContentStyle} className="grid2">
            <div>
              <h3 className="raleway">New Competition</h3>
              <h3 css={titleStyle}>Title</h3>
              <input
                value={newComp.title}
                onChange={(e) => handleChange2(e)}
                name="title"
                className="styledInput"
              />
              <h3 css={titleStyle}>Price</h3>
              <input
                value={newComp.ticketPrice}
                onChange={(e) => handleChange2(e)}
                name="ticketPrice"
                className="styledInput"
                type="number"
              />
              <h3 css={titleStyle}>Prize</h3>
              <input
                value={newComp.prize}
                onChange={(e) => handleChange2(e)}
                name="prize"
                className="styledInput"
              />
              <h3 css={titleStyle}>Description</h3>
              <input
                value={newComp.description[0]}
                name="description"
                placeholder="Write description here"
                className="styledInput"
                onChange={(e) => {
                  let newDescription = newComp.description;
                  newDescription[0] = e.target.value;
                  setNewComp({ ...newComp, description: newDescription });
                }}
              />
              <input
                value={newComp.description[1]}
                name="description"
                placeholder="Write description here"
                className="styledInput"
                onChange={(e) => {
                  let newDescription = newComp.description;
                  newDescription[1] = e.target.value;
                  setNewComp({ ...newComp, description: newDescription });
                }}
              />
              <input
                value={newComp.description[2]}
                name="description"
                placeholder="Write description here"
                className="styledInput"
                onChange={(e) => {
                  let newDescription = newComp.description;
                  newDescription[2] = e.target.value;
                  setNewComp({ ...newComp, description: newDescription });
                }}
              />
              <input
                value={newComp.description[3]}
                name="description"
                placeholder="Write description here"
                className="styledInput"
                onChange={(e) => {
                  let newDescription = newComp.description;
                  newDescription[3] = e.target.value;
                  setNewComp({ ...newComp, description: newDescription });
                }}
              />
              <input
                value={newComp.description[4]}
                name="description"
                placeholder="Write description here"
                className="styledInput"
                onChange={(e) => {
                  let newDescription = newComp.description;
                  newDescription[4] = e.target.value;
                  setNewComp({ ...newComp, description: newDescription });
                }}
              />
              <h3 css={titleStyle}>Date Finishes</h3>
              <input
                type="datetime-local"
                name="dateFinishes"
                min={today}
                value={newComp.dateFinishes}
                onChange={(e) => handleChange2(e)}
                className="styledInput"
              />
              <h3 css={titleStyle}>How many tickets will be available?</h3>
              <input
                value={newComp.maxTickets}
                onChange={(e) => handleChange2(e)}
                name="maxTickets"
                className="styledInput"
                type="number"
              />
              <hr css={hrStyle} />
            </div>
            <div
              style={{
                paddingLeft: "2.5rem",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* here it goes */}
              <button
                className="styledInput submitBtn pointer"
                style={{
                  width: "100px",
                  margin: "0 0 0 3.3rem",
                  backgroundColor: halfSubmit && "gray",
                }}
                onClick={() => submitNewComp()}
              >
                Submit
              </button>
              {newComp.pictures.map((image, idx) => {
                return (
                  <div key={idx}>
                    <ImagePicker
                      setState={(uploadedFile) => {
                        let tempNewComp = newComp;
                        tempNewComp.pictures[idx] = uploadedFile.secure_url;
                        setRemove(idx);
                        setNewComp(tempNewComp);
                      }}
                      image={image}
                    />

                    <div
                      style={{
                        display: image === "" && "none",
                        width: "200px",
                        height: "300px",
                      }}
                      className="flexColumn bgtransparent"
                    >
                      <img
                        src={close}
                        style={{
                          alignSelf: "flex-end",
                          position: "relative",
                          top: "27px",
                          right: "10px",
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
                        style={{ justifyContent: "flex-start" }}
                      >
                        <img
                          src={image}
                          css={imgStyle}
                          style={{ width: "200px", height: "200px" }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : activeCompetitions.length !== 0 ? (
        <div className="adminPage">
          <div className="flexColumn" css={secondSidebarStyle}>
            <div css={titleStyle2}>Active Competitions</div>
            <div className="flexColumn scrollbar" css={contentStyle}>
              {props.activeCompetitions[i] &&
                props.activeCompetitions.map((item, idx) => {
                  return (
                    <div
                      className={`${
                        props.activeCompetitions[i]._id === item._id &&
                        "blueBorder"
                      } flexCenter`}
                      onClick={() => {
                        setI(idx);
                      }}
                      css={selectorContStyle}
                      key={idx}
                    >
                      <p>{item.title}</p>
                      <div
                        className={`${
                          props.activeCompetitions[i]._id !== item._id && "none"
                        } flexCenter`}
                        onClick={() => setOpenModal(true)}
                        style={{ height: "32px", width: "32px" }}
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
                placeholder="Enter title"
                onChange={(e) => handleChange(e, i)}
                name="title"
                className="styledInput"
              />
              <h3 css={titleStyle}>Prize</h3>
              <input
                value={activeCompetitions[i].prize}
                placeholder="Enter prize"
                onChange={(e) => handleChange(e, i)}
                name="prize"
                className="styledInput"
              />
              <h3 css={titleStyle}>Price</h3>
              <input
                value={activeCompetitions[i].ticketPrice}
                placeholder="Enter price"
                onChange={(e) => handleChange(e, i)}
                name="ticketPrice"
                className="styledInput"
              />
              <h3 css={titleStyle}>Description</h3>
              <input
                value={activeCompetitions[i].description[0]}
                name="description"
                placeholder="Write description here"
                className="styledInput"
                onChange={(e) => handleChange(e, i, 0)}
              />
              <input
                value={activeCompetitions[i].description[1]}
                name="description"
                placeholder="Write description here"
                className="styledInput"
                onChange={(e) => handleChange(e, i, 1)}
              />
              <input
                value={activeCompetitions[i].description[2]}
                name="description"
                placeholder="Write description here"
                className="styledInput"
                onChange={(e) => handleChange(e, i, 2)}
              />
              <input
                value={activeCompetitions[i].description[3]}
                name="description"
                placeholder="Write description here"
                className="styledInput"
                onChange={(e) => handleChange(e, i, 3)}
              />
              <input
                value={activeCompetitions[i].description[4]}
                name="description"
                placeholder="Write description here"
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
                placeholder="Number of tickets"
                onChange={(e) => handleChange(e, i)}
                name="maxTickets"
                className="styledInput"
              />
            </div>
            <div style={{ paddingLeft: "2.5rem" }}>
              {activeCompetitions[i].pictures.map((image, idx) => {
                return (
                  <div key={idx}>
                    <ImagePicker
                      setState={(uploadedFile) => {
                        let tempActive = activeCompetitions;
                        tempActive[i].pictures[idx] = uploadedFile.secure_url;
                        setUnsaved(true);
                        setRemove(" ");
                        setActiveCompetitions(tempActive);
                      }}
                      image={image}
                    />
                    {/* <p
                      style={{
                        display:
                          (image !== "" || (image === "" && remove === "")) &&
                          "none",
                        marginTop: "1rem",
                      }}
                      className="raleway blue"
                    >
                      Click top right corner to save changes.
                    </p> */}
                    <div
                      style={{
                        display: image === "" && "none",
                        width: "100%",
                        height: "300px",
                        alignItems: "flex-start",
                      }}
                      className="flexColumn bgtransparent"
                    >
                      <img
                        src={close}
                        style={{
                          alignSelf: "flex-end",
                          position: "relative",
                          top: "27px",
                          right: "30px",
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
                        style={{ justifyContent: "flex-start" }}
                      >
                        <img
                          src={image}
                          css={imgStyle}
                          style={{ width: "200px", height: "200px" }}
                        />
                      </div>
                      {/* <p
                        style={{
                          display:
                            idx !== activeCompetitions[i].pictures.length - 1 &&
                            "none",
                          marginTop: "1rem",
                        }}
                        className="raleway blue"
                      >
                        Click top right corner to save changes.
                      </p> */}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="adminPage adminPage2 bg">
          <h3 className="bgtransparent raleway" css={noCompTitleStyle}>
            No active competitions. Click button on top to create one.
          </h3>
        </div>
      )}
      <div className={`${unsaved ? "unsaved" : "none"}`}>Unsaved changes!</div>
      <div className={`${saved ? "saved" : "none"}`}>Changes saved!</div>
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
            onClick={() => {
              setRemove("");
              setOpenModal(false);
            }}
          >
            No
          </button>
          <button
            className="raleway dm_modalBtn dm_modalBtn2 pointer"
            onClick={() => {
              if (remove === "image") {
                removePicture();
              } else if (remove === "competition") {
                removeCompetition();
              }
            }}
          >
            Yes
          </button>
        </div>
      </ReactModal>
    </>
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
    input: {
      "::-webkit-input-placeholder": {
        /* Edge */ fontSize: "0.9rem",
      },
      ":-ms-input-placeholder": {
        /* Internet Explorer 10-11 */ fontSize: "0.9rem",
      },
      "::placeholder": {
        fontSize: "0.9rem",
      },
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
    boxSizing: "content-box",
    alignItems: "flex-start",
    lineHeight: "1.7rem",
    width: "360px",
    backgroundColor: "#262626",
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
    margin: "0 auto 1.4rem",
    border: "1px solid transparent",
    borderRadius: "100px",
    boxShadow: "0px 2px 3px #202020",
    padding: "0 0 0 1.8rem",
    width: "80%",
    justifyContent: "space-between",
    boxSizing: "border-box",
    height: "34px !important",
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
  },
  imgStyle = {
    width: "200px",
    height: "200px",
    boxShadow: "5px 5px 10px #111",
    borderRadius: "0 0 5px 5px",
  },
  noCompTitleStyle = {
    lineHeight: "2rem",
  };

export default ActiveCompetitions;
