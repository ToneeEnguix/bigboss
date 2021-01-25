import React, { useState, useContext } from "react";
import UserContext from "../context/UserContext";
/** @jsx jsx */
import { jsx } from "@emotion/core";
import facepaint from "facepaint";
import { ReactComponent as BigBossLogo } from "../resources/BigBossLogo.svg";
import { Link } from "react-router-dom";

const breakpoints = [576, 950, 992, 1200];
const mq = facepaint(breakpoints.map((bp) => `@media (min-width: ${bp}px)`));

export default function BurgerNav() {
  const [show, setShow] = useState("translate3d(-100vw, 0, 0)");

  return (
    <div
      css={mq({
        display: ["flex", "flex", "none", "none"],
        alignItems: "center",
        justifyContent: "space-between",
        height: "75px",
      })}
    >
      <div css={{ width: "75px", paddingLeft: "1.5rem" }}>
        <span
          onClick={() => setShow("translate3d(0, 0, 0)")}
          css={{ fontSize: "3rem" }}
          className="material-icons"
        >
          menu
        </span>
      </div>

      <BigBossLogo height={"60px"} />
      <div css={{ width: "60px", visibility: "hidden" }}>
        <span>hidden</span>
      </div>
      <Menu animation={show} setAnimation={setShow} />
    </div>
  );
}

const Menu = (props) => {
  const context = useContext(UserContext);

  const menu = {
    position: "absolute",
    top: "0",
    left: "0",
    width: "55vw",
    height: "100vh",
    backgroundColor: "rgb(37 37 37)",
    zIndex: "999",
    transform: props.animation,
    transition: "transform 1s",
    display: "flex",
    flexDirection: "column",
  };

  const closeAndGo = (path) => {
    props.setAnimation("translate3d(-100vw, 0, 0)");
  };
  return (
    <div css={menu}>
      <div>
        <span
          onClick={() => props.setAnimation("translate3d(-100vw, 0, 0)")}
          css={{ fontSize: "2rem", marginTop: "1rem", marginLeft: "1rem" }}
          className="material-icons"
        >
          close
        </span>
        <div css={{ width: "100%", marginLeft: "3rem" }}>
          <ul
            css={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              alignItems: "flex-start",
              listStyle: "none",

              li: {
                margin: "1rem 0",
              },

              "li a": {
                fontWeight: "bold",
                letterSpacing: "0.1rem",
              },
            }}
          >
            <li>
              <Link
                onClick={() => {
                  closeAndGo();
                }}
                to="/home"
              >
                HOME
              </Link>
            </li>
            <li>
              <Link
                onClick={() => {
                  closeAndGo();
                }}
                to="/competitions"
              >
                COMPETITIONS
              </Link>
            </li>
            <li>
              <Link
                onClick={() => {
                  closeAndGo();
                }}
                to="/winners"
              >
                WINNERS
              </Link>
            </li>
            <li>
              <Link
                onClick={() => {
                  closeAndGo();
                }}
                to="/draws"
              >
                DRAWS
              </Link>
            </li>
            <li>
              <Link
                onClick={() => {
                  closeAndGo();
                }}
                to="/entries"
              >
                ENTRIES
              </Link>
            </li>
            <li>
              {context.user._id !== undefined ? (
                <Link
                  onClick={() => {
                    closeAndGo();
                  }}
                  to="/userdashboard/details"
                >
                  ACCOUNT
                </Link>
              ) : (
                <Link
                  onClick={() => {
                    closeAndGo();
                  }}
                  to="/log"
                >
                  ACCOUNT
                </Link>
              )}
            </li>
            <li>
              <Link
                onClick={() => {
                  closeAndGo();
                }}
                to="/basket"
              >
                BASKET
              </Link>
            </li>
            <li>
              <Link
                onClick={() => {
                  closeAndGo();
                }}
                to="/more/about"
              >
                ABOUT US
              </Link>
            </li>
            <li>
              <Link
                onClick={() => {
                  closeAndGo();
                }}
                to="/more/faq"
              >
                FAQ
              </Link>
            </li>
            <li>
              <Link
                onClick={() => {
                  closeAndGo();
                }}
                to="/more/terms"
              >
                TERMS
              </Link>
            </li>
            <li>
              <Link
                onClick={() => {
                  closeAndGo();
                }}
                to="/more/privacy"
              >
                PRIVACY
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
