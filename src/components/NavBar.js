/** @jsx jsx */
import { jsx } from "@emotion/core";
import React, { useState, useContext } from "react";
import { ReactComponent as BigBossLogo } from "../resources/BigBossLogo.svg";
import UserContext from "../context/UserContext";
import { NavLink, Link, useHistory, useLocation } from "react-router-dom";
import facepaint from "facepaint";

function NavBar() {
  const [userMenu, setUserMenu] = useState(false);
  const [emptyCart, setEmptyCart] = useState(false);
  // const [more, setMore] = useState(false);
  const context = useContext(UserContext);
  const location = useLocation();

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

  // const showMore = () => {
  //   setMore(true);
  // };

  // const hideMore = () => {};

  return (
    <div
      css={flexContainer}
      style={{
        display: location.pathname.includes("admin") && "none",
      }}
    >
      <BigBossLogo
        css={mq({
          width: ["40px", "40px", "60px", "60px"],

          marginLeft: ["1.0rem", "1.0rem", "2rem", "2rem"],
        })}
        height={"50px"}
        width={"50px"}
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
        <li
        // onMouseEnter={showMore}
        >
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
                {context.user.name.substring(0, 7)}
              </span>
            </div>
            {userMenu && context.showPurchaseAlert.status === false ? (
              <UserMenu />
            ) : null}
          </div>
        )}

        <div css={{ display: "hidden", width: "1rem" }}></div>

        {context.user.cart.length > 0 ? (
          <React.Fragment>
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
            </NavLink>
            <ShowPurchaseAlert active={context.showPurchaseAlert} />
          </React.Fragment>
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
                i: { marginRight: "0.5rem" },
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

const breakpoints = [576, 950, 1225, 1400];
const mq = facepaint(breakpoints.map((bp) => `@media (min-width: ${bp}px)`));
const flexContainer = mq({
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    display: ["none", "none", "flex", "flex"],
    a: {
      textDecoration: "none",
    },
    height: "70px",
  }),
  menu = mq({
    position: "relative",
    display: "flex",
    listStyle: "none",
    width: "60%",
    left: ["0", "0", "-4rem", "-7rem"],
    marginLeft: ["1rem", "1rem", "1rem", "0"],
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
  }),
  icons = {
    display: "flex",
    marginRight: "2rem",
    cursor: "context-menu",
    div: {
      cursor: "pointer",
    },
    "a,span": {
      fontWeight: "300",
      fontSize: "0.7rem",
      letterSpacing: "0rem",
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
          <Link to="/userdashboard/details">
            <p>ACCOUNT</p>
          </Link>
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
      <div
        css={{
          borderTop: "1px solid #868686",
          backgroundColor: "#252525",
          boxShadow: "-1px 4px 22px 0px black",
        }}
      >
        <h5 css={{ fontWeight: 300, letterSpacing: "0.1rem", padding: "2rem" }}>
          BASKET IS CURRENTLY EMPTY
        </h5>
      </div>
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
  const context = useContext(UserContext);
  const history = useHistory();

  const closenadGo = () => {
    context.hideModal();
    history.push("/basket");
  };

  const remove = () => {
    context.hideModal();
    context.remove(props.active.competition);
  };

  const setValue = (amount) => {
    let value = String(amount);
    while (value.length < 2) {
      value = "0" + value;
    }
    return value;
  };
  if (context.showPurchaseAlert.status === false)
    return <React.Fragment></React.Fragment>;
  else
    return (
      <div css={dropdown03}>
        <div
          css={{
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
                  onClick={() => {
                    remove();
                  }}
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
            display: "flex",
            width: "100%",
            justifyContent: "center",
            paddingBottom: "1rem",
          }}
        >
          <div
            onClick={() => {
              closenadGo();
            }}
          >
            <p
              css={{
                padding: "1rem 0",
                fontSize: "0.8rem",
                letterSpacing: "0.1rem",
              }}
            >
              GO TO SECURE CHECKOUT
            </p>
          </div>
        </div>
      </div>
    );
};
