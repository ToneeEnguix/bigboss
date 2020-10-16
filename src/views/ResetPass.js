import React, { useState, useEffect } from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core';
import StyledInput from "../components/StyledInput";
import { Redirect, useParams } from "react-router-dom";
import { get, post } from "../api/fetch";
import { setToken } from "../api/token";
import { verifyPass, verifyMatch } from "../utils/verifyFormData";
import { findAllInRenderedTree } from 'react-dom/test-utils';


const wrapper = {
    margin: "0 auto",
    padding: "2rem",
    display: "flex",
    justifyContent: "center"
}

function ForgotPass() {

    const [redirect, setRedirect] = useState(false);

    const params = useParams();

    useEffect(() => {

        setToken(params.token);
        verifyToken();
    }, []);


    const verifyToken = async () => {

        const result = await get(`/token/verifytokenemail/${params.id}`);

        if (!result.ok) {

            setRedirect(true);
        }

    }

    const submit = async (e) => {

        e.preventDefault();

        const newpassword = e.target.password.value;
        const passMatch = e.target.passconfirm.value;

        newpassword.trim();
        passMatch.trim();


        const passStatus = verifyPass(newpassword);
        const matchStatus = verifyMatch(newpassword, passMatch);

        if (passStatus.ok && matchStatus.ok)
        {

            const result = await post(`/users/${params.id}/resetpassword`,{newpassword});

            console.log(result)
        }

    }

    if (redirect) {

        return (
            <Redirect to="/home" />
        )
    }

    return (
        <React.Fragment>
            <h1 css={{ marginLeft: "4rem" }}>RESET PASSWORD</h1>
            <div css={wrapper}>

                <form onSubmit={submit} css={{ width: "30%", display: "flex", justifyContent: "center", marginTop: "4rem", flexDirection: "column", textAlign: "center" }}>

                    <StyledInput type="password" eye={true} width="100%" name="NEW PASSWORD" innerName="password" />
                    <StyledInput type="password" eye={true} width="100%" name="CONFIRM NEW PASSWORD" innerName="passconfirm" />
                    <button css={{ margin: "2rem 0" }} className="button01">SUBMIT</button>

                </form>
            </div>
        </React.Fragment>
    );
}

export default ForgotPass;