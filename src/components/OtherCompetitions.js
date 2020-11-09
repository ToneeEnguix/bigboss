import React, { useEffect, useState } from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core';
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import OtherCompCard from "./OtherCompCard";
import { get } from "../api/fetch";
import { Redirect } from "react-router-dom";
import arrowCarousel from "../resources/arrowCarousel.png";
import facepaint from "facepaint";

const breakpoints = [1299, 1300,];

const mq = facepaint(breakpoints.map((bp) => `@media (min-width: ${bp}px)`));

const otherCompetitionsWrapper = {

  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  marginTop: "4rem"
}
export default function OtherCompetitions() {


  const [error, setError] = useState(false);
  const [competitions, setCompetitions] = useState([]);



  useEffect(() => {

    getRandomCompetitions();;
  }, []);


  const getRandomCompetitions = async () => {

    const result = await get("/competitions/active");
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
    <div css={otherCompetitionsWrapper}>
      <h1 css={mq({ textAlign: ["center", "center", "left", "left"] })}> OTHER COMPETITIONS</h1>
      < Carousel
        additionalTransfrom={0}
        centerMode={true}
        className="pepe"
        containerClass="container-with-dots"
        dotListClass=""
        draggable
        infinite
        focusOnSelect={false}
        arrows={false}
        customButtonGroup={<ButtonGroup />}
        itemClass="othercomp"
        keyBoardControl
        minimumTouchDrag={80}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        responsive={{


          desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1,
            partialVisibilityGutter: 90
          },
          tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1,
            partialVisibilityGutter: 50
          },
          mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            partialVisibilityGutter: 0
          }

        }}
        renderButtonGroupOutside={true}
        showDots={false}
        sliderClass=""
        slidesToSlide={1}
        swipeable
      >

        {competitions.map((competition, index) => {

          return (
            <React.Fragment key={index}>
              <OtherCompCard  competition={competition} />
            </React.Fragment>
          )

        })}
      </Carousel>
    </div >
  );

}


const ButtonGroup = ({ next, previous, goToSlide, ...rest }) => {
  const { carouselState: { currentSlide } } = rest;
  return (
    <div className="carousel-button-group">


      <div css={{ display: "flex", alignItems: "center", cursor: "pointer", padding: "1rem" }} onClick={() => previous()}>

        <img css={{ transform: "rotate(180deg)", width: "1.6rem", marginRight: "1.5rem" }} src={arrowCarousel} />
        <span css={{ fontSize: "0.9rem", letterSpacing: "0.1rem" }}>
          PREV
        </span>
      </div>
      <div css={{ display: "flex", cursor: "pointer", padding: "1rem", alignItems: "center" }} onClick={() => next()}>

        <span css={{ fontSize: "0.9rem", letterSpacing: "0.1rem" }}>
          NEXT
        </span>
        <img css={{ width: "1.6rem", marginLeft: "1.5rem" }} src={arrowCarousel} />
      </div>
    </div>
  );
};