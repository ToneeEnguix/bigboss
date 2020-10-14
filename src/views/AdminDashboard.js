import React, { useState, useEffect } from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core';

import { Redirect } from "react-router-dom";

const contentWrapper = {

    margin: "4rem 0rem",

    "h1": {

        marginLeft: "4rem"
    }
}


function AdminDashboard(props) {
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {

        if (!props.location.state) {
            setRedirect(true)
        }
    }, [])

    if (redirect) {

        return (

            <Redirect to="/home" />
        )
    }

    return (



        <div css={contentWrapper}>

            <h1>ADMIN DASHBOARD</h1>

            <div css={{ display: "flex", marginTop: "1rem" }}>
               
            </div>

        </div>
    )

}

export default AdminDashboard