import React from 'react';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
/** @jsx jsx */
import { jsx } from '@emotion/core';


const carouselWrapper = {

  margin: "0 5%",
  display: "flex",
  justifyContent: "center",
  padding:"2rem"
}
function HomeCarousel() {
  return (
    <div css={carouselWrapper} >
      <Carousel showStatus={false} showThumbs={false} showArrows={false}>
        <div key="slide1">
          <img src="http://placehold.it/500x150" />
        </div>
        <div key="slide2">
          <img src="http://placehold.it/500x150" />
        </div>
        <div key="slide3">
          <img src="http://placehold.it/500x150" />
        </div>
      </Carousel>
    </div>
  );
}

export default HomeCarousel;