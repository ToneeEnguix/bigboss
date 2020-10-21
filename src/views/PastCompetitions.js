import React from "react";
/** @jsx jsx */
import { jsx } from "@emotion/core";
import "./dashboardstyles.css";
import insert from "../resources/insert.svg";

const PastCompetitions = () => {
  return (
    <div className="adminPage">
      <h3 css={mainTitleStyle}>Individual Competition</h3>
      <div css={mainContentStyle} className="grid2">
        <div>
          <h3 css={titleStyle}>Title</h3>
          <input placeholder="Jon Doe" />
          <h3 css={titleStyle}>Price</h3>
          <input placeholder="Enter Here Ltd." />
          <h3 css={titleStyle}>Description</h3>
          <textarea
            placeholder={`123 Example St. Bushmills \nCo. Down`}
            // onChange={(e) => handleChange(e)}
            name="address"
            style={{ height: "100px", lineHeight: "1.4rem" }}
            // value={business.address}
          ></textarea>
          <h3 css={titleStyle}>Countdown Timer</h3>
          <input placeholder="DD / HH / MM / SS" />
          <h3 css={titleStyle}>How many tickets will be available?</h3>
          <input placeholder="Enter maximmum Number of Tickets" />
          <hr css={hrStyle} />
          <h3 css={titleStyle}>Recorded Facebook Video</h3>
          <input placeholder="Enter the link to the video, I.e. https://www.youtube.com" />
          <input placeholder="And the ... DD / MM / YYYY" />
          <h3 css={titleStyle}>Spreadsheet Link</h3>
          <input placeholder="Enter the link to the video, I.e. https://www.youtube.com" />
          <h3 css={titleStyle}>Photo of the Winner</h3>
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
              <h3 css={titleStyle}>Winner Name</h3>
              <input placeholder="i.e. Jane Doe" />
              <h3 css={titleStyle}>Email</h3>
              <input placeholder="i.e. jane@janedoe.com" />
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

export default PastCompetitions;
