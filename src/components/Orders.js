import React, { useEffect, useState, useContext } from "react";
/** @jsx jsx */
import { jsx } from "@emotion/core";
import { get } from "../api/fetch";
import { Redirect } from "react-router-dom";
import UserContext from "../context/UserContext";
import arrowCarousel from "../resources/arrowCarousel.png";

const th = {
  color: "#868686",
  fontSize: "0.8rem",
  paddingRight: "4rem",
  paddingBottom: "1rem",
};

const tr = {
  margin: "2rem 4rem",

  td: {
    fontSize: "0.8rem",
    fontWeight: "600",
    padding: "0.5rem 0",
  },
};
function Orders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(false);
  const [render, setRender] = useState(false)


  const context = useContext(UserContext);

  useEffect(() => {

    if (context.user._id !== undefined) {
      getOrders(0);
    }
  }, []);

  const getOrders = async (skip) => {

    const result = await get(`/orders/user/${context.user._id}/${skip}`);

    if (result.ok) {
      setOrders(result.data);

      setRender(!render);


    } else {
      setError(true);
    }
  };

  const setDate = (date) => {
    let dot = date.replaceAll("-", ".");

    return dot.substring(0, 10);
  };
  const setValue = (amount) => {
    let value = String(amount);
    while (value.length < 2) {
      value = "0" + value;
    }
    return value;
  };

  if (error) {
    return <Redirect to={"/error"} />;
  }

  return (
    <div css={{ height: "50vh", marginLeft: "3rem", marginTop: "1rem", }}>
      <p css={{ color: "#00FFFF", fontWeight: "600", marginBottom: "1rem" }}>ORDER HISTORY</p>
      <p css={{ fontWeight: "600", marginBottom: "2rem" }}>YOU HAVE MADE {setValue(orders.total)} ORDERS SO FAR</p>

      {orders.total > 0 ?
        <table>
          <thead>
            <tr>
              <th css={th}>ORDER DATE</th>
              <th css={th}>ORDER NUMBER</th>
              <th css={th}>AMOUNT</th>
              <th css={th}>PAYMENT</th>
            </tr>
          </thead>
          <tbody>
            {
              orders.orders.map((order, index) => {
                return (
                  <tr css={tr} key={index}>

                    <td>{setDate(order.orderDate)}</td>
                    <td>{order.orderNumber}</td>
                    <td>£{order.amount.toFixed(2)}</td>
                    <td css={{ textTransform: "uppercase", color: "#00FFFF" }}>{order.paymentStatus}</td>
                  </tr>
                )
              })}
          </tbody>
        </table> : null}

      <Pages pages={orders.pages} changePage={getOrders} />
    </div>
  );
}


const Pages = (props) => {


  const [page, setPage] = useState(1);

  const next = () => {

    props.changePage((page) * 5);
    setPage(page + 1);


  }

  const prev = () => {

    if (page > 2) {


      props.changePage((page - 2) * 5);
      setPage(page - 1);

    }
    else if (page === 2) {

      props.changePage(0);
      setPage(page - 1);

    }
  }

  return (

    <div css={{ display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer", padding: "1rem" }}
    >

      <img onClick={() => { prev() }}
        css={{ cursor: "pointer", transform: "rotate(180deg)", width: "1.6rem", marginRight: "1.5rem" }} src={arrowCarousel} />

      <span css={{
        lineHeight: "1.2rem",
        padding: "1rem",
        margin: "1rem",
        textDecoration: "underline",
        color: "#00FFFF",
        cursor: "pointer"
      }}>{page}</span>

      {props.pages !== page ?
        <img onClick={() => { next() }}
          css={{ cursor: "pointer", width: "1.6rem", marginLeft: "1.5rem" }} src={arrowCarousel} />
        : null}
    </div>

  )
}

export default Orders;
