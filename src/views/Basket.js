import React, { useContext, useEffect, useState } from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Redirect } from "react-router-dom"
import UserContext from "../context/UserContext";
import BasketCard from "../components/BasketCard";
import { ReactComponent as BigBossLogo } from "../resources/BigBossLogo.svg";

const contentWrapper = {

  margin: "4rem 0rem",

  "h1": {

    marginLeft: "4rem"
  }

}


const compsColumn = {

  width: "45%",
  display: "flex",
  flexDirection: "column"
}

const dataColumn = {


  display: "flex",
  flexDirection: "column"
}

const summary = {

  boxShadow: "-1px 4px 22px 0px black",

}

const invisible={

  width:"8rem",
  padding:"0.5rem 1rem",
  border:"none",
  boxShadow:"none",
  outline:"none",
  "::placeholder":{

    color:"#FFFFFF"
}}
const inputButton = {

  display:"flex",
  justifyContent:"center",
  width:"100%",
  backgroundColor: "#252525",
  color: "white",
  border: "none",
  letterSpacing: "0.1rem",
  padding: "1rem 4rem",
  outline: "none",
  fontWeight: "600",
  boxShadow: "-1px 4px 22px 0px rgba(0,0,0,16%)",
  margin:"0.5rem 0",

  "::placeholder":{

    color:"#FFFFFF"
  }


}

const logo = {

  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "-1px 4px 22px 0px black",
  marginTop: "2rem"
}
function Basket() {

  const context = useContext(UserContext);
  const [redirect, setRedirect] = useState(false)

  useEffect(() => {

    if (context.user.cart.length === 0) {

      setRedirect(true);
    }
  }, [])

  if (redirect) {

    return (
      <Redirect to="/home" />
    )
  }

  return (

    <React.Fragment>
      <div css={contentWrapper}>
        <h1>BASKET</h1>
        <div css={{ display: "flex", justifyContent: "space-evenly" }}>
          <div css={compsColumn}>
            {
              context.user.cart.map((competition, index) => {
                return (<BasketCard key={index} competition={competition} />)
              })
            }
            <BasketCard />
            <BasketCard />
          </div>
          <div css={dataColumn}>
            <div css={summary}>
              <div css={{
                padding: "2rem 6rem", display: "flex",
                flexDirection: "column",

                ">*":{
                  margin:"0.5rem 0"
                }
              }}>
                <p css={{color:"#00C6D6", fontWeight:"600", fontSize:"0.7rem"}}>ORDER SUMMARY</p>
                <p css={{fontWeight:"600", fontSize:"0.7rem"}}>DO YOU HAVE A PROMOTIONAL CODE?</p>
                <div css={inputButton}>
                <input css={invisible} placeHolder="ENTER HERE"  />
                </div>
                <button css={{color:"white"}}className="button02">REDEEM PROMO CODE</button>
                <div css={{display:"flex",justifyContent:"space-between"}}>
                <p css={{fontWeight:"600", fontSize:"0.7rem"}}>SUBTOTAL</p>
                <CalculateTotal/>
                </div>
                <div>
                <p css={{fontWeight:"600", fontSize:"0.7rem"}}>PROMO DISCOUNT</p>
                </div>
                <hr />
                <div>
                <h5 css={{fontWeight:"600", fontSize:"0.7rem"}}>TOTAL</h5>
                </div>
                <button className="button03">PAY NOW</button>
              </div>
            </div>
            <div css={logo}>
              <div css={{ padding: "5rem 6rem", alignItems: "center", display: "flex", flexDirection: "column" }}>
                <BigBossLogo color={"#00C6D6"} width={"150px"} height={"150px"} />
                <p css={{ marginTop: "2rem", fontSize: "0.7rem" }}>ALL RIGHTS RESERVED. 2020</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Basket;

const CalculateTotal=()=>{

  const context = useContext(UserContext);
  let total=0

return(<p>£{total}</p>)


}