import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
/** @jsx jsx */
import { jsx } from "@emotion/core";
import { get } from "../api/fetch";
import { Redirect } from "react-router-dom";
import CarouselCard from "./CarouselHomeCard";
/* eslint-disable no-unused-vars */
var React = require("react");
/* eslint-enable no-unused-vars */

function HomeCarousel() {
  const [error, setError] = useState(false);
  const [competitions, setCompetitions] = useState([]);

  useEffect(() => {
    const getRandomCompetitions = async () => {
      const result = await get("/competitions/randompicks");
      if (result.ok) {
        setCompetitions(result.data);
      } else {
        setError(true);
      }
    };
    getRandomCompetitions();
  }, []);

  if (error) {
    return <Redirect to={"/error"} />;
  }

  return (
    <div css={carouselWrapper}>
      <Carousel
        css={{
          width: "100%",
          maxWidth: "1200px",
          ".carousel .slider-wrapper": {
            borderRadius: "0 !important",
          },
        }}
        showStatus={false}
        showThumbs={false}
        showArrows={false}
      >
        {competitions.map((competition, index) => {
          return <CarouselCard key={index} competition={competition} />;
        })}
      </Carousel>
    </div>
  );
}

const carouselWrapper = {
  display: "flex",
  justifyContent: "center",
  marginTop: "4rem",
};

export default HomeCarousel;
