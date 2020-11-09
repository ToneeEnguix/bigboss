import React, { useContext, useEffect, useState } from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Redirect } from "react-router-dom"
import UserContext from "../context/UserContext";
import BasketCard from "../components/BasketCard";
import { get } from "../api/fetch";
import bigbossblue from "../resources/bigbossblue.png";
import ReactDOM from 'react-dom';
import useModal from "../utils/useModals";

const contentWrapper = {

  margin: "4rem 0rem",

  "h1": {

    marginLeft: "4rem"
  }

}


const compsColumn = {

  display: "flex",
  flexDirection: "column",
  alignItems: "center"
}

const dataColumn = {


  display: "flex",
  flexDirection: "column",

}

const summary = {

  boxShadow: "-1px 4px 22px 0px black",
  minWidth: "450px"

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
  const { isShowing, toggle } = useModal();


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
        <div css={{ display: "flex", flexWrap: "wrap", justifyContent: "space-evenly", marginTop: "3.5rem" }}>
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

                <button onClick={redeem} css={{ color: "white", letterSpacing: "0.1rem" }} className="button02">REDEEM PROMO CODE</button>
                <div css={{ visibility: message.visible, width: "100%", textAlign: "center" }}>
                  <p css={{ fontSize: "0.5rem" }}>{message.message}</p>
                </div>
                <div css={{ display: "flex", justifyContent: "space-between" }}>
                  <p css={{ fontWeight: "600", fontSize: "0.7rem" }}>SUBTOTAL</p>
                  <p css={{ fontWeight: "500" }}>£{partialAmount}</p>
                </div>
                <div css={{ display: "flex", justifyContent: "space-between" }}>
                  <p css={{ fontWeight: "600", fontSize: "0.7rem" }}>PROMO DISCOUNT</p>
                  {discountAmount > 0 ? <p css={{ fontWeight: "500" }}>-£{discountAmount}</p> : null}
                </div>
                <hr />
                <div css={{ display: "flex", justifyContent: "space-between" }}>
                  <h5 css={{ fontWeight: "600", fontSize: "0.7rem" }}>TOTAL</h5>
                  <p css={{ fontWeight: "500" }}>£{(partialAmount - discountAmount).toFixed(2)}</p>
                </div>
                <button onClick={toggle} className="button03">PAY NOW</button>
              </div>
            </div>
            <div css={logo}>
              <div css={{ padding: "5rem 6rem", alignItems: "center", display: "flex", flexDirection: "column" }}>
                <img src={bigbossblue} />
                <p css={{ marginTop: "2rem", fontSize: "0.7rem" }}>ALL RIGHTS RESERVED. 2020</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isShowing={isShowing}
        hide={toggle} />
    </React.Fragment>
  );
}

export default Basket;

const Modal = ({ isShowing, hide }) => {

  const modal = {

    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.6)"
  }

  const window = {
    position: "fixed",
    background: "white",
    width: "80%",
    height: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "2rem 0 ",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    width: "70%"
  }

  const editable = {

    background: "white",
    border: "2px solid black",
    margin: "1rem 0",
    color: "black",
    width: "70%"
  }

return (
  isShowing === true ?
    ReactDOM.createPortal(
      <div css={modal}>
        <div css={window}>
          <div id="st-notification-frame"></div>
          <form css={{
            background: "white",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"

          }} id="st-form" action="https://www.example.com" method="POST">
            <div css={{ width: "100%" }}>CARD NUMBER</div>
            <div css={editable} contenteditable="true" id="st-card-number" className=" st-card-number"></div>
            <div css={{ width: "100%" }}>EXPIRATION DATE</div>
            <div css={editable} contenteditable="true" id="st-expiration-date" className="st-expiration-date"></div>
            <div css={{ width: "100%" }}>SECURITY CODE</div>
            <div css={editable} contenteditable="true" id="st-security-code" className="st-security-code"></div>

            <div css={{ marginTop: "1rem", display: "flex", background: "white", justifyContent: "space-around" }}>
              <button onClick={hide} className="button01">Cancel</button>
              <button
                type="submit" id="st-form__submit" className="st-form__submit"
                className="button01">Confirm</button>
            </div>
          </form>

        </div>
      </div>, document.body) : null
)
}




