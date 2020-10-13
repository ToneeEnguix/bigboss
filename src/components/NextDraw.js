/** @jsx jsx */
import { jsx } from '@emotion/core';

import { ReactComponent as FacebookLogo } from "../resources/BigBossLogo.svg";
import { ReactComponent as LiveLogo } from "../resources/LiveLogo.svg";



const flexContainer = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    backgroundColor: "#222222",
    padding: "0.4rem"

}

const rightFacebookIcons = {

}

function NextDraw() {
    return (
        <div css={flexContainer}>
            <h4>NEXT DRAW LIVE ON FACEBOOK IN</h4>
            <div css={rightFacebookIcons}>
        
            </div>

        </div>
    );
}

export default NextDraw;