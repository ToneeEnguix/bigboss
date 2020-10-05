import React, { useEffect, useState, useContext } from 'react';
import UserContext from "../context/UserContext";
/** @jsx jsx */
import { jsx } from '@emotion/core';
import {Link} from "react-router-dom"

function ShowCorrectButton(props) {

    const context = useContext(UserContext);

    if (context.user.id === undefined) {
        return (
            <Link to="/log" css={{width:"100%"}}>
            <button css={{width:"100%",margin:"1rem 0"}}className="button02">LOG IN TO PURCHASE</button>
            </Link>
        )
    }

    else if (context.user.id !=undefined && props.ticketsAvailable>0 ) {
        return (
            <button css={{width:"100%",margin:"1rem 0"}}className="button02">BUY TICKETS</button>
       
        )
    }
    else  {
        return (
            <button css={{width:"100%",margin:"1rem 0"}}className="button02">NO TICKETS AVAILABLE</button>
       
        )
    }

}

export default ShowCorrectButton