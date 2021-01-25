import { useLocation } from "react-router-dom";
/** @jsx jsx */
import { jsx } from "@emotion/core";
import BurgerNav from "./BurgerNav";
import NavBar from "./NavBar";
import NextDraw from "./NextDraw";
import facepaint from "facepaint";

const breakpoints = [576, 950, 992, 1200];

const mq = facepaint(breakpoints.map((bp) => `@media (min-width: ${bp}px)`));

const Header = (props) => {
  let location = useLocation();

  return (
    <header
      css={mq({
        display:
          location.pathname === "/bye" ||
          location.pathname === "/adminlogin" ||
          location.pathname.includes("/admindashboard") ||
          location.pathname === "/basket"
            ? "none"
            : "inline",
        maxWidth: "1800px",
        position: "fixed",
        top: "0",
        width: "100%",
        zIndex: "40",
        boxShadow: "0px 2px 4px 0px rgba(0,0,0,16%)",
      })}
    >
      <NextDraw />
      <NavBar />

      <BurgerNav />
    </header>
  );
};

export default Header;
