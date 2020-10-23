import React, { useEffect, useState } from "react";
/** @jsx jsx */
import { jsx } from "@emotion/core";
import ReactModal from "react-modal";
import close from "../resources/close.svg";
import axios from "axios";
import { URL } from "../config";
import "../components/domain.css";

const Discounts = (props) => {
  const [discounts, setDiscounts] = useState([
    { title: "", discount: 0, expires: "" },
  ]);
  const [i, setI] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [today, setToday] = useState("");

  useEffect(() => {
    getDiscounts();
  }, [i]);

  const getDiscounts = async () => {
    let resDiscounts = await axios.get(`${URL}/coupons/all`);
    resDiscounts.data.map((item) => {
      item.expires = item.expires.slice(0, -8);
      item.created = item.created.slice(0, -8);
    });
    setDiscounts(resDiscounts.data);
  };

  useEffect(() => {
    const updateDiscounts = async () => {
      props.setUpdate();
      await axios.post(`${URL}/coupons/update`, {
        coupon: discounts[i],
      });
    };
    props.update && updateDiscounts();
  }, [props.update]);

  useEffect(() => {
    const createDiscount = async () => {
      props.setCreate();
      await axios.get(`${URL}/coupons/create`);
      getDiscounts();
    };
    props.create && createDiscount();
  }, [props.create]);

  const deleteDiscount = async () => {
    await axios.post(`${URL}/coupons/delete`, {
      coupon: discounts[i],
    });
    props.setRefresh();
    setI(0);
  };

  const handleChange = (e, i) => {
    let tempDiscounts = [...discounts];
    e.target.name === "expires" &&
      (e.target.value = new Date(e.target.value).toISOString().slice(0, -8));
    tempDiscounts[i][e.target.name] = e.target.value;
    setDiscounts(tempDiscounts);
  };

  useEffect(() => {
    let today = new Date(Date.now()).toISOString().slice(0, -8);
    setToday(today);
  }, []);

  return (
    <div>
      <div className="adminPage">
        <div className="flexColumn" css={secondSidebarStyle}>
          <div css={titleStyle2}>Active Discounts</div>
          <div className="flexColumn" css={contentStyle}>
            {props.discounts[i] &&
              props.discounts.map((item, idx) => {
                return (
                  <div
                    className={`${
                      props.discounts[i].title === item.title && "blueBorder"
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
        <h3 css={mainTitleStyle}>{discounts[i] && discounts[i].title}</h3>
        <div className="grid2 bgtransparent">
          <form className="bgtransparent">
            <h3 css={titleStyle}>Discount Code</h3>
            <input
              value={discounts[i] && discounts[i].title}
              name="title"
              onChange={(e) => handleChange(e, i)}
            />
            <h3 css={titleStyle}>Value Calculated in %</h3>
            <input
              value={discounts[i] && discounts[i].discount}
              name="discount"
              onChange={(e) => handleChange(e, i)}
            />
            <h3 css={titleStyle}>Date of Expiry</h3>
            {/* <input
              value={discounts[i] && discounts[i].expires.slice(0, 10)}
              name="expires"
              onChange={(e) => handleChange(e, i)}
            /> */}
            <input
              type="datetime-local"
              name="expires"
              min={today}
              value={discounts[i] && discounts[i].expires}
              onChange={(e) => handleChange(e, i)}
            />
          </form>
          <div className="bgtransparent"></div>
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
            Are you sure you want to delete this competition?
          </h3>
        </div>
        <div className="flexCenter bgtransparent">
          <button
            className="raleway dm_modalBtn dm_modalBtn1 pointer"
            onClick={() => {
              deleteDiscount();
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

const mainTitleStyle = {
    marginBottom: "1rem",
    fontFamily: "Raleway",
    letterSpacing: "0.05rem",
    fontWeight: "300",
    fontSize: "1.15rem",
    height: "21px",
  },
  titleStyle = {
    fontFamily: "Raleway",
    letterSpacing: "0.05rem",
    fontWeight: "300",
    fontSize: "1.15rem",
    margin: "1.7rem auto 0",
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
};
const titleStyle2 = {
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

export default Discounts;
