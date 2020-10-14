/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useEffect, useState } from "react";
import { ReactComponent as LiveLogo } from "../resources/LiveLogo.svg";
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
    overflow: "hidden"


}



function NextDraw() {


    const [nextDraw, setNextDraw] = useState("");
    const [error, setError] = useState(false);

    useEffect(() => {

        getNextDraw();
    }, []);

    const getNextDraw = async () => {

        const result = await get("/competitions/nextdraw");

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
                <CounterSmall date={nextDraw} />
            </div>
            <div css={{ paddingRight: "2rem" }}>
                <LiveLogo css={{ backgroundColor: "#222222 !important" }} width={"80px"} height={"70px"} />
            </div>

        </div>
    );
}

export default NextDraw;