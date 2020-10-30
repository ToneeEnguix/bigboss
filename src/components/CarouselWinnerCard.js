import React from 'react';

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
/** @jsx jsx */
import { jsx } from '@emotion/core';


const carouselCard = {

    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom:"1rem"
}

const winner={

    textTransform:"uppercase",
    color:"#00FFFF"
}
function CarouselCard(props) {



    return (

        <div css={carouselCard}>
            <img css={{ maxWidth: "100%", }} src={props.competition.winnerPic} />
            <h2 css={{padding:"4rem 0 1rem 0"}}>{props.competition.title}</h2>
    <p css={winner}>WON BY {props.competition.winner.name} {props.competition.winner.lastName}</p>

        </div>
    )

}

export default CarouselCard;