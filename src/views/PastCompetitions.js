import React, { useEffect, useState } from "react";
/** @jsx jsx */
/** @jsxFrag React.Fragment */
import { jsx } from "@emotion/core";
import "./dashboardstyles.css";
import ReactModal from "react-modal";
import close from "../resources/close.svg";
import axios from "axios";
import { URL } from "../config";
import "../components/domain.css";
import ImagePicker from "./imagePicker";

const PastCompetitions = (props) => {
  const [pastCompetitions, setPastCompetitions] = useState([
    {
      title: "",
      discount: 0,
      expires: "10-12-20",
      pictures: [""],
      dateFinishes: "",
      entriesDate: "",
      description: [""],
      winner: {
        name: "",
        email: "",
      },
      facebookURL: "",
      entriesDate: "",
    },
  ]);
  const [i, setI] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [remove, setRemove] = useState("");
  const [today, setToday] = useState("");
  const [unsaved, setUnsaved] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getPastCompetitions();
  }, [i]);

  useEffect(() => {
    props.update && updateWinner();
  }, [props.update]);

  const getPastCompetitions = async () => {
    try {
      let resPast = await axios.get(`${URL}/competitions/past`);
      resPast.data.map((item) => {
        item.dateFinishes = item.dateFinishes.slice(0, -14);
        // item.entriesDate = item.entriesDate.slice(0, -8);
      });
      setPastCompetitions(resPast.data);
    } catch (err) {
      console.error(err);
    }
    setRemove("");
  };

  const handleChange = (e) => {
    setUnsaved(true);
    let tempPastCompetitions = [...pastCompetitions];
    if (e.target.name === "email") {
      tempPastCompetitions[i].winner = {
        name: "",
        email: "",
      };
      tempPastCompetitions[i].winner[e.target.name] = e.target.value;
      pastCompetitions[i].winner.email !== "" && findWinner();
    }
    // else if (e.target.name === "entriesDate") {
    //   e.target.value = new Date(e.target.value).toISOString().slice(0, -8);
    // }
    tempPastCompetitions[i][e.target.name] = e.target.value;
    setPastCompetitions(tempPastCompetitions);
  };

  const findWinner = async () => {
    try {
      let res = await axios.get(
        `${URL}/users/${pastCompetitions[i].winner.email}`
      );
      let tempPastComp = [...pastCompetitions];
      if (res.data.ok) {
        setUnsaved(true);
        tempPastComp[i].winner = res.data.user;
      } else {
        tempPastComp[i].winner.name = "";
      }
      setPastCompetitions(tempPastComp);
    } catch (err) {
      console.error(err);
    }
  };

  const updateWinner = async () => {
    props.setUpdate();
    if (
      !pastCompetitions[i].winnerPic ||
      !pastCompetitions[i].winner ||
      !pastCompetitions[i].facebookURL ||
      // !pastCompetitions[i].entriesDate ||
      !pastCompetitions[i].facebookURL.includes("facebook.com/")
    ) {
      return false;
    }
    try {
      let res = await axios.post(`${URL}/competitions/updatewinner`, {
        competition: pastCompetitions[i],
      });
      if (res.data.ok) {
        setOpenModal(false);
        getPastCompetitions();
        setRemove("");
        setUnsaved(false);
        setSaved(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    let today = new Date(Date.now()).toISOString().slice(0, -8);
    setToday(today);
  }, []);

  useEffect(() => {
    if (saved) {
      setTimeout(() => {
        setSaved(false);
      }, 1000);
    }
  }, [saved]);

  return (
    <>
      {pastCompetitions.length !== 0 ? (
        <div className="adminPage">
          <div className="flexColumn" css={secondSidebarStyle}>
            <div css={titleStyle2}>Past Competitions</div>
            <div className="flexColumn scrollbar" css={contentStyle}>
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
                className="styledInput gray"
              />
              <h3 css={titleStyle}>Photo of the Winner</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                <div>
                  <ImagePicker
                    setState={(uploadedFile) => {
                      let tempPast = pastCompetitions;
                      tempPast[i].winnerPic = uploadedFile.secure_url;
                      setRemove(" ");
                      setPastCompetitions(tempPast);
                      setUnsaved(true);
                    }}
                    image={pastCompetitions[i].winnerPic}
                  />
                  <div
                    style={{
                      display:
                        (pastCompetitions[i].winnerPic === "" ||
                          !pastCompetitions[i].winnerPic) &&
                        "none",
                      width: "200px",
                      height: "200px",
                      margin: "2rem 0 0",
                    }}
                    className="flexColumn bgtransparent"
                  >
                    <img
                      src={close}
                      style={{
                        alignSelf: "flex-end",
                        position: "relative",
                        top: "26px",
                        right: "7px",
                        borderRadius: "100px",
                      }}
                      className="pointer"
                      onClick={() => {
                        setRemove("winner's image");
                        setUnsaved(true);
                        setOpenModal(true);
                      }}
                    />
                    <div css={photoContStyle} className="flexCenter">
                      <img
                        src={pastCompetitions[i].winnerPic}
                        css={imgStyle}
                        style={{
                          width: "200px",
                          height: "200px",
                          alignSelf: "flex-start",
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div css={placeholderStyle}>
                  <h3 css={titleStyle}>Email</h3>
                  <input
                    value={
                      pastCompetitions[i].winner
                        ? pastCompetitions[i].winner.email
                        : ""
                    }
                    placeholder="No winner yet"
                    className={`${
                      !pastCompetitions[i].winner && "gray"
                    } styledInput`}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    name="email"
                  />
                  <h3 css={titleStyle}>Winner Name</h3>
                  <input
                    value={
                      pastCompetitions[i].winner &&
                      pastCompetitions[i].winner.name
                        ? pastCompetitions[i].winner.name +
                          " " +
                          pastCompetitions[i].winner.lastName
                        : "No winner yet"
                    }
                    readOnly
                    className={`${
                      (!pastCompetitions[i].winner ||
                        !pastCompetitions[i].winner.name) &&
                      "gray"
                    } styledInput default`}
                    name="name"
                  />
                </div>
              </div>
              <h3 css={titleStyle}>Recorded Facebook Video</h3>
              <input
                value={
                  pastCompetitions[i].facebookURL
                    ? pastCompetitions[i].facebookURL
                    : ""
                }
                placeholder="Paste link here"
                onChange={(e) => handleChange(e)}
                name="facebookURL"
                className="styledInput"
              />
              {/* <input
                type="datetime-local"
                name="entriesDate"
                min={today}
                value={pastCompetitions[i].entriesDate}
                onChange={(e) => handleChange(e)}
                className="styledInput"
              /> */}
              <h3 className="default" css={titleStyle}>
                Price
              </h3>
              <input
                readOnly
                defaultValue={pastCompetitions[i].ticketPrice}
                className="styledInput default gray"
                type="number"
                min="0"
              />
              <h3 className="default" css={titleStyle}>
                Prize
              </h3>
              <input
                readOnly
                defaultValue={pastCompetitions[i].prize}
                className="styledInput default gray"
              />
              <h3 className="default" css={titleStyle}>
                Description
              </h3>
              <p className="styledInput raleway gray">
                {pastCompetitions[i].description[0]}
              </p>
              <p className="styledInput raleway gray">
                {pastCompetitions[i].description[1]}
              </p>
              <p className="styledInput raleway gray">
                {pastCompetitions[i].description[2]}
              </p>
              <p className="styledInput raleway gray">
                {pastCompetitions[i].description[3]}
              </p>
              <p className="styledInput raleway gray">
                {pastCompetitions[i].description[4]}
              </p>
              <h3 className="default" css={titleStyle}>
                Finish Date
              </h3>
              <p className="styledInput raleway gray">
                {pastCompetitions[i].dateFinishes}
              </p>
              <h3 className="default" css={titleStyle}>
                How many tickets were available?
              </h3>
              <input
                readOnly
                defaultValue={pastCompetitions[i].maxTickets}
                placeholder="No tickets available"
                className="styledInput default gray"
              />
            </div>
            <div style={{ paddingLeft: "2.5rem", width: "100%" }}>
              {pastCompetitions[i].pictures.map((item, idx) => {
                return (
                  <div
                    className="flexColumn"
                    style={{
                      backgroundColor: "#333",
                      margin: "0 auto 4rem",
                      borderRadius: "10px",
                    }}
                    key={idx}
                  >
                    <h4
                      className="raleway"
                      css={{
                        color: "white",
                        padding: "0.7rem 0",
                        fontSize: "1rem",
                      }}
                    >
                      Image {idx + 1}
                    </h4>
                    <img src={item} css={imgStyle} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="adminPage adminPage2 bg">
          <h3 className="bgtransparent raleway" css={noCompTitleStyle}>
            No past competitions. Go to Active Competitions and click button on
            top to create one.
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
              setUnsaved(false);
              setOpenModal(false);
            }}
          >
            No
          </button>
          <button
            className="raleway dm_modalBtn dm_modalBtn2 pointer"
            onClick={() => updateWinner()}
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
    width: "200px",
    height: "200px",
    alignSelf: "flex-start",
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
    width: "100%",
    boxShadow: "5px 5px 10px #111",
    borderRadius: "0 0 5px 5px",
  },
  placeholderStyle = {
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
  noCompTitleStyle = {
    lineHeight: "2rem",
  };

export default PastCompetitions;
