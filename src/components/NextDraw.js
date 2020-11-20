/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useCallback, useEffect, useState } from "react";
import LiveLogo from "../resources/facebook.png";
import CounterSmall from "../utils/CounterSmall";
import { get } from "../api/fetch";
import { Redirect, useLocation } from "react-router-dom";
import facepaint from "facepaint";
const breakpoints = [576, 950, 992, 1200];


const mq = facepaint(breakpoints.map((bp) => `@media (min-width: ${bp}px)`));

const flexContainer = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  backgroundColor: "#222222",
  height: "3rem",
  overflow: "hidden",
};

function NextDraw() {
  const [nextDraw, setNextDraw] = useState(undefined);
  const [error, setError] = useState(false);
  const location = useLocation();

  useEffect(() => {
    getNextDraw();
  }, []);

  const redrawLatest = () => {
    getNextDraw();
  };

  const getNextDraw = async () => {
    const result = await get("/competitions/nextdraw");

    if (result.ok && result.data.length !== 0) {
      setNextDraw(result.data[0].dateFinishes);
    } else if (!result.ok) {
      setError(true);
    }
  };

  if (error) {
    return <Redirect to={"/error"} />;
  }

  if (nextDraw !== undefined) {
    return (
      <div
        css={flexContainer}
        style={{
          display: location.pathname.includes("admin") && "none",
        }}
      >
        <div css={mq({ visibility: "hidden",display:["none","inline","inline","inline"] })}
        >Hidden</div>
        <div>
          <CounterSmall
            key={nextDraw}
            setRedraw={redrawLatest}
            date={nextDraw}
          />
        </div>
        <div css={mq({ marginRight: "1rem", display:["none","inline","inline","inline"]})}>
          <img src={LiveLogo} css={{ width: "3.5rem" }} />
        </div>
      </div>
    );
  } else {
    return (
      <div css={flexContainer}>
        <div css={{ visibility: "hidden" }}>Hidden</div>
        <div>
          <p>NO NEXT DRAWS AVAILABLE!</p>
        </div>
        <div css={{ marginRight: "1rem" }}>
          <img src={LiveLogo} css={{ width: "3.5rem" }} />
        </div>
      </div>
    );
  }
}

export default NextDraw;
