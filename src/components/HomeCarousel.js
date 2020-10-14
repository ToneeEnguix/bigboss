import React, { useEffect, useState } from 'react';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

/** @jsx jsx */
import { jsx } from '@emotion/core';
import { get } from "../api/fetch";
import { Redirect } from "react-router-dom";
import CarouselCard from "./CarouselHomeCard";



const carouselWrapper = {

  margin: "0 5%",
  display: "flex",
  justifyContent: "center",
  padding: "2rem",
  marginTop: "4rem",

}

function HomeCarousel() {

  const [error, setError] = useState(false);
  const [competitions, setCompetitions] = useState([]);



  useEffect(() => {

    getRandomCompetitions();;
  }, []);


  const getRandomCompetitions = async () => {

    const result = await get("/competitions/randompicks");
    if (result.ok) {
      setCompetitions(result.data);

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
    <div css={carouselWrapper} >
      <Carousel css={{ height: "400px", width: "100%" }} showStatus={false} showThumbs={false} showArrows={false}>

        {competitions.map((competition, index) => {

          return (
            <CarouselCard key={index} competition={competition} />
          )
        })}

      </Carousel>

    </div >
  );
}

export default HomeCarousel;