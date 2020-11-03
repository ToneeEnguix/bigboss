import React, { useState, useContext } from 'react';
import UserContext from "../context/UserContext";
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Link } from "react-router-dom"

function ShowCorrectButton(props) {

    const [error, setError] = useState({visible:"hidden",message:"hidden"})

    const context = useContext(UserContext);

    const buyTickets = () => {

        if (props.correctAnswer) {

            setError({visible:"hidden",message:"hidden"});
            context.buyTickets(props.amount, props.data);
            props.regenerateQuestion();
            props.resetAnswer(false);
        }
        else {

            setError({visible:"visible", message:"WRONG SECURITY QUESTION ANSWER"});
            props.regenerateQuestion();
            setTimeout(()=>{setError({visible:"hidden",message:"hidden"})},2000)
        }
    }

    if (context.user._id === undefined) {
        return (

            <Link to="/log" css={{ width: "100%" }}>
                <button css={{ width: "100%", margin: "1rem 0" }} className="button02">LOG IN TO PURCHASE</button>
            </Link>

        )
    }
    else if (context.user._id != undefined && (props.ticketsAvailable > 0) && props.disabled==false) {
        return (
            <React.Fragment>
                <button onClick={() => { buyTickets() }} css={{ width: "100%", margin: "1rem 0" }} className="button02">BUY TICKETS</button>
                <p css={{ visibility: error.visible }}>{error.message}</p>
            </React.Fragment>
        )
    }
    else {
        return (
            <React.Fragment>
                <button css={{ width: "100%", margin: "1rem 0", cursor: "not-allowed" }} className="button02">NO TICKETS AVAILABLE</button>
            </React.Fragment>
        )
    }

}

export default ShowCorrectButton