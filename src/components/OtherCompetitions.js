import React, { useEffect, useState } from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core';
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import OtherCompCard from "./OtherCompCard";
import { get } from "../api/fetch";
import { Redirect } from "react-router-dom";
const otherCompetitionsWrapper = {

  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
  width: "100%"
}
export default function OtherCompetitions() {


  const [error, setError] = useState(false);
  const [competitions, setCompetitions] = useState([]);



  useEffect(() => {

    getRandomCompetitions();;
  }, []);


  const getRandomCompetitions = async () => {

    const result = await get("/competitions/all");
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
      <h1 css={{ marginBottom: "4rem" }}> OTHER COMPETITIONS ///</h1>
      < Carousel
        additionalTransfrom={0}
        centerMode={true}
        className="pepe"
        containerClass="container-with-dots"
        dotListClass=""
        draggable
        focusOnSelect={false}
        arrows={false}
        customButtonGroup={<ButtonGroup />}
        itemClass="othercomp"
        keyBoardControl
        minimumTouchDrag={80}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        infinite
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
            partialVisibilityGutter: 30
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
            <React.Fragment>
              <OtherCompCard key={index} competition={competition} />
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

      <div css={{ cursor:"pointer",padding: "1rem" }} onClick={() => previous()}>

        PREVIOUS
        </div>
      <div css={{cursor:"pointer", padding: "1rem" }} onClick={() => next()}>
        NEXT
      </div>
    </div>
  );
};