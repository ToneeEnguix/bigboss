/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useCallback, useEffect, useState } from "react";
import LiveLogo from "../resources/facebook.png";
import CounterSmall from "../utils/CounterSmall";
import { get } from "../api/fetch";
import { Redirect } from "react-router-dom";



const flexContainer = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: "#222222",
    height: "3rem",
    overflow: "hidden",



}



function NextDraw() {


    const [nextDraw, setNextDraw] = useState("");
    const [error, setError] = useState(false);



    useEffect(() => {

        getNextDraw();
    }, []);

    const redrawLatest = () => {

    
        getNextDraw();

    }

    const getNextDraw = async () => {

        const result = await get("/competitions/nextdraw");
        console.log(result)

        if (result.ok) {

            setNextDraw(result.data[0].dateFinishes);


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
        <div css={flexContainer}>
            <div css={{ visibility: "hidden" }}
            >Hidden</div>
            <div>
                <CounterSmall key={nextDraw} setRedraw={redrawLatest} date={nextDraw} />
            </div>
            <div css={{ marginRight: "1rem" }}>
                <img src={LiveLogo} css={{width:"3.5rem"}} />
            </div>

        </div>
    );
}

export default NextDraw;