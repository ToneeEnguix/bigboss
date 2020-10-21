/** @jsx jsx */
import { jsx } from "@emotion/core";
import React, { useState, useContext } from "react";
import { ReactComponent as BigBossLogo } from "../resources/BigBossLogo.svg";
import UserContext from "../context/UserContext";
import { NavLink, Link } from "react-router-dom";

const flexContainer = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",

  a: {
    textDecoration: "none",
  },
};

const menu = {
  display: "flex",
  listStyle: "none",
  width: "60%",
  marginRight: "10rem",
  justifyContent: "space-between",

  "a, strong": {
    fontWeight: "600",
    fontSize: "0.7rem",
    letterSpacing: "0.3rem",
  },

  a: {
    cursor: "pointer",
  },
  strong: {
    cursor: "context-menu",
  },

  "& a:after,strong:after": {
    display: "block",
    content: '""',
    position: "relative",
    top: "1.2rem",
    borderBottom: "solid 3px #00FFFF",
    transform: "scaleX(0)",
    transition: "transform 100ms ease-in-out",
  },

  "a:hover:after,strong:hover:after": {
    transform: "scaleX(1)",
  },

  ".active:after": {
    display: "block",
    content: '""',
    position: "relative",
    top: "1.2rem",
    borderBottom: "solid 3px #00FFFF",
    transform: "scaleX(1)",
    transition: "transform 100ms ease-in-out",
  },
};

const icons = {
  display: "flex",
  marginRight: "2rem",
  cursor: "context-menu",

  div: {
    cursor: "pointer",
  },
  "a,span": {
    fontWeight: "600",
    fontSize: "0.7rem",
    letterSpacing: "0.3rem",
  },

  ".icon:after": {
    display: "block",
    content: '""',
    position: "relative",
    top: "1.1rem",
    borderBottom: "solid 3px #00FFFF",
    transform: "scaleX(0)",
    transition: "transform 100ms ease-in-out",
    cursor: "context-menu",
  },

  ".icon:hover:after": {
    transform: "scaleX(1)",
  },

  ".active:after": {
    display: "block",
    content: '""',
    position: "relative",
    top: "1.1rem",
    borderBottom: "solid 3px #00FFFF",
    transform: "scaleX(1)",
    transition: "transform 100ms ease-in-out",
  },
};

function NavBar() {
  const [userMenu, setUserMenu] = useState(false);
  const [emptyCart, setEmptyCart] = useState(false);
  const [more, setMore] = useState(false);
  const context = useContext(UserContext);

  const extendMenu = () => {
    setUserMenu(true);
  };

  const setValue = (amount) => {
    let value = String(amount);
    while (value.length < 2) {
      value = "0" + value;
    }
    return value;
  };
  const hideMenu = () => {
    setUserMenu(false);
  };

  const showEmptyCart = () => {
    setEmptyCart(!emptyCart);
  };

  const hideEmptyCart = () => {
    setEmptyCart(false);
  };

  const showMore = () => {
    setMore(true);
  };

  const hideMore = () => {};

  return (
    <div css={flexContainer}>
      <BigBossLogo
        css={{ marginLeft: "2rem" }}
        height={"60px"}
        width={"60px"}
      />

      <ul css={menu}>
        <li>
          <NavLink activeClassName={"active"} to="/home">
            HOME
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName={"active"} to="/competitions">
            COMPETITIONS
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName={"active"} to="/winners">
            WINNERS
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName={"active"} to="/draws">
            DRAWS
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName={"active"} to="/entries">
            ENTRIES
          </NavLink>
        </li>
        <li onMouseEnter={showMore}>
          <NavLink
            to="/more/about"
            isActive={(match, location) => {
              if (
                location.pathname === "/more/about" ||
                location.pathname === "/more/terms" ||
                location.pathname === "/more/faq" ||
                location.pathname === "/more/careers" ||
                location.pathname === "/more/privacy"
              ) {
                return true;
              } else {
                return false;
              }
            }}
          >
            MORE
          </NavLink>
        </li>
      </ul>
      <div css={icons}>
        {context.user._id === undefined ? (
          <NavLink className={"icon"} activeClassName={"active"} to="/log">
            <div
              css={{
                display: "flex",
                alignItems: "center",
                i: { marginRight: "0.5rem" },
              }}
            >
              <i className="material-icons-outlined">person</i>
              <span>LOG IN</span>
            </div>
          </NavLink>
        ) : (
          <div
            onMouseEnter={extendMenu}
            onMouseLeave={hideMenu}
            css={{ position: "relative", cursor: "context-menu" }}
            className={"icon"}
          >
            <div
              css={{
                cursor: "context-menu",
                display: "flex",
                alignItems: "center",
                i: { marginRight: "0.5rem" },
              }}
            >
              <i
                css={{ cursor: "context-menu" }}
                className="material-icons-outlined"
              >
                person
              </i>
              <span
                css={{ cursor: "context-menu", textTransform: "upperCase" }}
              >
                {context.user.fullName}
              </span>
            </div>
            {userMenu && context.showPurchaseAlert.status === false ? (
              <UserMenu />
            ) : null}
          </div>
        )}

        <div css={{ display: "hidden", width: "1rem" }}></div>

        {context.user.cart.length > 0 ? (
          <NavLink activeClassName={"active"} to="/basket" className={"icon"}>
            <div
              css={{
                display: "flex",
                alignItems: "center",
                i: { marginRight: "0.5rem" },
              }}
            >
              <i className="material-icons-outlined">shopping_cart</i>
              <span>{setValue(context.user.cart.length)}</span>
            </div>
            <ShowPurchaseAlert active={context.showPurchaseAlert} />
          </NavLink>
        ) : (
          <div
            onMouseLeave={hideEmptyCart}
            onClick={showEmptyCart}
            className={"icon"}
          >
            <div
              css={{
                display: "flex",
                alignItems: "center",
                i: { marginRight: "2rem" },
              }}
            >
              <i className="material-icons-outlined">shopping_cart</i>
              <span>{setValue(context.user.cart.length)}</span>
            </div>
            {emptyCart ? <EmptyCart /> : null}
          </div>
        )}
      </div>
    </div>
  );
}

export default NavBar;

const dropdown = {
  position: "absolute",
  cursor: "context-menu",
  backgroundColor: "transparent",
  minWidth: "160px",
  zIndex: "1",
  paddingTop: "1.3rem",

  "li:hover>*": {
    color: "#00FFFF",
  },

  "a:hover>*": {
    color: "#00FFFF",
  },
};
const UserMenu = () => {
  const context = useContext(UserContext);

  const logout = () => {
    context.logout();
  };

  return (
    <div css={dropdown}>
      <ul
        css={{
          paddingTop: "1.2rem",
          display: "flex",
          flexDirection: "column",
          listStyle: "none",
          boxShadow: "0px 10px 5px 0px rgba(0,0,0,16%)",
        }}
      >
        <li css={{ textDecoration: "none", margin: "0.5rem" }}>
          <NavLink to="/userdashboard/details">
            <p>ACCOUNT</p>
          </NavLink>
        </li>
        <li onClick={logout} css={{ textDecoration: "none", margin: "0.5rem" }}>
          <p>LOG OUT</p>
        </li>
      </ul>
    </div>
  );
};

const dropdown02 = {
  position: "absolute",
  right: "2rem",
  backgroundColor: "transparent",
  minWidth: "160px",
  zIndex: "1",
  paddingTop: "1.3rem",
};

const EmptyCart = () => {
  return (
    <div css={dropdown02}>
      <h5>BASKET IS CURRENTLY EMPTY</h5>
    </div>
  );
};

const dropdown03 = {
  position: "absolute",
  right: "2rem",
  backgroundColor: "transparent",
  zIndex: "1",
  paddingTop: "1.20rem",
};

const ShowPurchaseAlert = (props) => {
  const setValue = (amount) => {
    let value = String(amount);
    while (value.length < 2) {
      value = "0" + value;
    }
    return value;
  };
  if (props.active.status === false) return <React.Fragment></React.Fragment>;
  else
    return (
      <div css={dropdown03}>
        <div
          css={{
            borderTop: "1px solid #868686",
            backgroundColor: "#252525",
          }}
        >
          <div css={{ padding: "2rem 2rem" }}>
            <div css={{ display: "flex", paddingBottom: "3rem" }}>
              <p
                css={{
                  fontSize: "0.7rem",
                  color: "#00FFFF",
                  letterSpacing: "0.1rem",
                }}
              >
                SUCCESS! &nbsp;
              </p>
              <p css={{ fontSize: "0.7rem", letterSpacing: "0.1rem" }}>
                {" "}
                ITEM ADDED TO CART
              </p>
            </div>
            <div
              css={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <div css={{ width: "200px" }}>
                <img
                  css={{ maxWidth: "100%" }}
                  src={props.active.competition.pictures[0]}
                />
              </div>
              <div
                css={{
                  marginLeft: "2rem",
                  p: { margin: "1rem 0" },
                }}
              >
                <p css={{ fontSize: "0.7rem", letterSpacing: "0.1rem" }}>
                  {" "}
                  {props.active.competition.title} COMPETITION
                </p>
                <p
                  css={{
                    color: "#00FFFF",
                    fontSize: "0.7rem",
                    letterSpacing: "0.1rem",
                  }}
                >
                  £{props.active.competition.ticketPrice}
                </p>
                <p css={{ fontSize: "0.7rem", letterSpacing: "0.1rem" }}>
                  QTY: {setValue(props.active.amount)} TICKETS
                </p>
                <p
                  css={{
                    textDecoration: "underline",
                    fontSize: "0.7rem",
                    letterSpacing: "0.1rem",
                  }}
                >
                  REMOVE
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          css={{
            borderRadius: "0px 0px 31px 0px",
            display: "flex",
            width: "100%",
            justifyContent: "center",
            paddingBottom: "1rem",
            borderTop: "3px solid #00FFFF",
          }}
        >
          <p
            css={{
              padding: "1rem 0",
              textDecoration: "underline",
              color: "#00FFFF",
              fontSize: "0.8rem",
              letterSpacing: "0.1rem",
            }}
          >
            GO TO SECURE CHECKOUT
          </p>
        </div>
      </div>
    );
};
