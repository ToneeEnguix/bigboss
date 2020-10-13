import React from 'react';

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
/** @jsx jsx */
import { jsx } from '@emotion/core';


const carouselCard={
    height:"400px", 
    backgroundImage:'url("https://picsum.photos/1200/800")',
    display:"flex",
    justifyContent:"center",
    alignItems:"center"
}

    const info={

        backgroundColor:"black",
        padding:"5rem"
    }
function CarouselCard(props){

 

    return (

        <div css={carouselCard}>
           <div css={info}>
               hola
           </div>
        </div>
    )

}

export default CarouselCard;