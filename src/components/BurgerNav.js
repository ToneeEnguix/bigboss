import React from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core';
import facepaint from 'facepaint';


const breakpoints = [576, 950, 992, 1200]

const mq = facepaint(
    breakpoints.map(bp => `@media (min-width: ${bp}px)`));


export default function BurgerNav (){




    return (
<div>HOLA</div>
    )
}