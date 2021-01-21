/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import "./adminheader.css";
import save from "../resources/save.svg";
import plus from "../resources/plus.svg";
/* eslint-disable no-unused-vars */
var React = require("react");
/* eslint-enable no-unused-vars */

const AdminHeader = (props) => {
  return (
    <div className="header flexCenter" css={headerStyle}>
      <div to="/" className="flexCenter h_left bgtransparent">
        <p
          className="anurati"
          style={{ fontFamily: "Anurati", fontSize: "1.8rem" }}
        >
          NI
        </p>
        <div className="flexColumn h_nebulaCont bgtransparent">
          <p className="raleway h_leftNebula">Nebula Industries Ltd.</p>
          <p className="raleway h_leftmm">Trading as Marley Media</p>
        </div>
      </div>
      {(props.selected === "faq" ||
        props.selected === "activeCompetitions" ||
        props.selected === "discounts") && (
        <div
          css={plusStyle}
          className="flexCenter pointer"
          onClick={() => {
            props.newSection();
          }}
        >
          <img
            alt="plus"
            src={plus}
            css={css`
              width: 30px;
              height: 30px;
              border-radius: 100px;
              &:hover {
                width: 35px;
                height: 35px;
              }
            `}
          />
        </div>
      )}
      <div className="flexCenter h_right bgtransparent">
        <p className="raleway h_rightSubmit">Save all Settings</p>
        <div
          className="flexCenter h_rightPlus pointer"
          onClick={() => {
            props.updateSection();
          }}
        >
          <img src={save} className="h_rightImg" alt="add symbol" />
        </div>
      </div>
    </div>
  );
};

const headerStyle = {
    backgroundColor: "#262626",
  },
  plusStyle = {
    width: "60px",
    height: "60px",
    borderRadius: "100px",
    boxShadow: "0px 3px 6px #00000029",
  };

export default AdminHeader;
