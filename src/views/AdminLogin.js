import React, { useState } from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core';
import StyledInput from "../components/StyledInput";
import {post} from "../api/fetch";
import {Redirect} from "react-router-dom";

const contentWrapper = {

    margin: "4rem 0rem",

    "h1": {

        marginLeft: "4rem"
    }
}


function AdminLogin() {

    const [message, setMessage] = useState({ color: "green", visibility: "hidden", message: "hidden" });
    const [redirect,setRedirect]=useState(false);

    const submit = async (e) => {

        e.preventDefault();
        const name= e.target.name.value;
        const password=e.target.password.value;
        const result = await post("/admin/signin", {name, password });
        
        if (result.ok)
        {
            localStorage.setItem("@auth_token",result.token)
            setRedirect(true);
        }
        else{
            setMessage({ color: "red", visibility: "visible", message: "WRONG CREDENTIALS" })
        }

    }

    if (redirect){

        return(

            <Redirect
            to={{
            pathname: "/admindashboard",
            state: { admin:true }
          }}
        />
        )
    }
    return (



        <div css={contentWrapper}>

            <h1>ADMIN LOGIN</h1>
            <div css={{ display: "flex", justifyContent: "center" }}>
                <form onSubmit={submit} css={{ width: "30%", display: "flex", justifyContent: "center", marginTop: "8rem", flexDirection: "column", textAlign: "center" }}>

                    <StyledInput type="text" width="100%" name="NAME" innerName="name" />
                    <StyledInput type="password" eye={true} width="100%" name="PASSWORD" innerName="password" />
                    <button css={{ marginTop: "1rem" }} className="button01">SUBMIT</button>
                    <p css={{color: message.color, visibility: message.visibility }}>{message.message}</p>
                </form>
            </div>
        </div>
    )

}

export default AdminLogin