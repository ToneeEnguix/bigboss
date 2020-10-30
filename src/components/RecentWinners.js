import React, { useEffect, useState } from 'react';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { get } from "../api/fetch";
import { Redirect } from "react-router-dom";
import CarouselWinnerCard from "./CarouselWinnerCard";


const recentWinnersWrapper = {

  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
  margin: "0 5%",
  padding: "2rem",
}
function RecentWinners() {

  const [error, setError] = useState(false);
  const [recentWinners, setRecentWinners] = useState([]);



  useEffect(() => {

    getRecentWinners();;
  }, []);


  const getRecentWinners = async () => {

    const result = await get("/competitions/recentwinners");
    if (result.ok) {
      setRecentWinners(result.data);
    }
    else {
      setError(true);
    }
  }

  if (error) {
    return (
      <Redirect to={"/error"} />
    )
  }


  return (
    <div css={recentWinnersWrapper}>
      <h1> RECENT WINNERS</h1>
      <Carousel css={{
        marginTop: "4rem", width: "100%",
        ".carousel .slider-wrapper": {

          borderRadius: "0 !important"

        },
        ".carousel .control-dots":{

          margin:"0 !important"
        }
      }} showStatus={false} showThumbs={false} showArrows={false}>

        {recentWinners.map((competition, index) => {

          return (
            <CarouselWinnerCard key={index} competition={competition} />
          )
        })}

      </Carousel>
    </div>
  );
}
export default RecentWinners;