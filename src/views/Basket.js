import React, { useContext, useEffect, useState } from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Redirect } from "react-router-dom"
import UserContext from "../context/UserContext";
import BasketCard from "../components/BasketCard";
import { get } from "../api/fetch";
import bigbossblue from "../resources/bigbossblue.png"

const contentWrapper = {

  margin: "4rem 0rem",

  "h1": {

    marginLeft: "4rem"
  }

}


const compsColumn = {

  width:"30%",
  display: "flex",
  flexDirection: "column"
}

const dataColumn = {


  display: "flex",
  flexDirection: "column",

}

const summary = {

  boxShadow: "-1px 4px 22px 0px black",

}

const invisible = {

  width: "8rem",
  padding: "0.5rem 1rem",
  border: "none",
  boxShadow: "none",
  outline: "none",
  "::placeholder": {

    color: "#FFFFFF"
  }
}
const inputButton = {

  display: "flex",
  justifyContent: "center",
  width: "100%",
  backgroundColor: "#252525",
  color: "white",
  border: "none",
  letterSpacing: "0.1rem",
  padding: "1rem 4rem",
  outline: "none",
  fontWeight: "600",
  boxShadow: "-1px 4px 22px 0px rgba(0,0,0,16%)",
  margin: "0.5rem 0",

  "::placeholder": {

    color: "#FFFFFF"
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
  const [redirect, setRedirect] = useState(false);
  const [couponValue, setCouponValue] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [partialAmount, setPartialAmount] = useState(0);

  const [message, setMessage] = useState({ visible: "hidden", message: "hidden" })

  useEffect(() => {

    if (context.user.cart.length === 0) {

      setRedirect(true);
    }
    else {

      calculatePartialAmount();
    }

  })

  const calculatePartialAmount = () => {
    let total = 0;
    let cart = context.user.cart;

    cart.forEach(item => {

      total = total + ((item.competition.ticketPrice) * item.amount);
    })

    setPartialAmount(total.toFixed(2));
  }

  const handleCoupon = (e) => {

    setCouponValue(e.target.value);

  }

  const redeem = async () => {

    const result = await get(`/coupons/read/${couponValue}`);

    if (result.ok) {
      console.log(result)
      calculateDiscount(result.data[0].discount)

    }
    else {
      setMessage({ visibility: "visible", message: "COUPON NOT VALID" });
      setTimeout(() => { setMessage({ visible: "hidden", message: "hidden" }) }, 2000);
    }
  }

  const calculateDiscount = (discount) => {

    const discountAmount = (partialAmount * discount) / 100;

    setDiscountAmount(discountAmount.toFixed(2))
  }




  if (redirect) {

    return (
      <Redirect to="/home" />
    )
  }


  return (

    <React.Fragment>
      <div css={contentWrapper}>
        <h1>BASKET</h1>
        <div css={{ display: "flex", justifyContent: "space-evenly", marginTop:"3.5rem" }}>
          <div css={compsColumn}>
            {
              context.user.cart.map((competition, index) => {
                return (<BasketCard key={index} competition={competition} />)
              })
            }
          </div>
          <div css={dataColumn}>
            <div css={summary}>
              <div css={{
                padding: "2rem 6rem", display: "flex",
                flexDirection: "column",

                ">*": {
                  margin: "0.5rem 0"
                }
              }}>
                <p css={{ color: "#00C6D6", fontWeight: "600", fontSize: "0.7rem" }}>ORDER SUMMARY</p>
                <p css={{ fontWeight: "600", fontSize: "0.7rem" }}>DO YOU HAVE A PROMOTIONAL CODE?</p>
                <div css={inputButton}>
                  <input value={couponValue} name={"coupon"} onChange={handleCoupon} css={invisible} placeholder="ENTER HERE" />
                </div>

                <button onClick={redeem} css={{ color: "white" }} className="button02">REDEEM PROMO CODE</button>
                <div css={{ visibility: message.visible, width: "100%", textAlign: "center" }}>
                  <p css={{ fontSize: "0.5rem" }}>{message.message}</p>
                </div>
                <div css={{ display: "flex", justifyContent: "space-between" }}>
                  <p css={{ fontWeight: "600", fontSize: "0.7rem" }}>SUBTOTAL</p>
                  <p css={{fontWeight:"500"}}>£{partialAmount}</p>
                </div>
                <div css={{ display: "flex", justifyContent: "space-between" }}>
                  <p css={{ fontWeight: "600", fontSize: "0.7rem" }}>PROMO DISCOUNT</p>
                  {discountAmount > 0 ? <p css={{fontWeight:"500"}}>-£{discountAmount}</p> : null}
                </div>
                <hr />
                <div css={{ display: "flex", justifyContent: "space-between" }}>
                  <h5 css={{ fontWeight: "600", fontSize: "0.7rem" }}>TOTAL</h5>
                  <p css={{fontWeight:"500"}}>£{(partialAmount-discountAmount).toFixed(2)}</p>
                </div>
                <button className="button03">PAY NOW</button>
              </div>
            </div>
            <div css={logo}>
              <div css={{ padding: "5rem 6rem", alignItems: "center", display: "flex", flexDirection: "column" }}>
                <img src={bigbossblue}/>
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



