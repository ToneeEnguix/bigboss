import React, { useEffect, useState, useContext } from "react";
/** @jsx jsx */
import { jsx } from "@emotion/core";
import { get } from "../api/fetch";
import { Redirect } from "react-router-dom";
<<<<<<< HEAD
import UserContext from "../context/UserContext";

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
=======
import UserContext from "../context/UserContext"


const th = {

  color: "#868686",
  fontSize: "0.8rem",
  paddingRight: "4rem",
  paddingBottom: "1rem"

}

const tr = {

  margin: "2rem 4rem",

  "td": {

    fontSize: "0.8rem",
    fontWeight: "600",
    padding: "0.5rem 0"
  }
}
>>>>>>> 2be4926319ba214fddc4701872770b57da8c9b48
function Orders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(false);
  const context = useContext(UserContext);

  useEffect(() => {
<<<<<<< HEAD
    getOrders();
  }, []);
=======

    if (context.user._id !== undefined) {
      getOrders();
    }
  });
>>>>>>> 2be4926319ba214fddc4701872770b57da8c9b48

  const getOrders = async () => {
    const result = await get(`/orders/user/${context.user._id}`);

    if (result.ok) {
      setOrders(result.data);
<<<<<<< HEAD
      console.log(result.data, "FFFFF");
    } else {
=======

    }
    else {
>>>>>>> 2be4926319ba214fddc4701872770b57da8c9b48
      setError(true);
    }
<<<<<<< HEAD
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
=======
  }

  const setDate = (date) => {

    let dot = date.replaceAll("-", ".");

    return dot.substring(0, 10)
  }
  const setValue = (amount) => {
    let value = String(amount);
    while (value.length < 2) {
      value = '0' + value;
    }
    return value;

  }
>>>>>>> 2be4926319ba214fddc4701872770b57da8c9b48

  if (error) {
    return <Redirect to={"/error"} />;
  }

  return (
    <div css={{ height: "50vh", marginLeft: "3rem", marginTop: "1rem" }}>
      <p css={{ color: "#00FFFF", fontWeight: "600", marginBottom: "1rem" }}>
        ORDER HISTORY
      </p>
      <p css={{ fontWeight: "600", marginBottom: "2rem" }}>
        YOU HAVE MADE {setValue(orders.length)} ORDERS SO FAR
      </p>
      <table>
        <th css={th}>ORDER DATE</th>
        <th css={th}>ORDER NUMBER</th>
        <th css={th}>AMOUNT</th>
        <th css={th}>PAYMENT</th>
        {orders.length === 0 ? (
          <p css={{ marginLeft: "2rem" }}>YOU HAVE MADE 0 ORDERS SO FAR</p>
        ) : (
          orders.map((order, index) => {
            return (
              <tr css={tr} key={index}>
                <td>{setDate(order.orderDate)}</td>
                <td>{order.orderNumber}</td>
                <td>£{order.amount.toFixed(2)}</td>
                <td css={{ textTransform: "uppercase", color: "#00FFFF" }}>
                  {order.paymentStatus}
                </td>
              </tr>
            );
          })
        )}
      </table>
    </div>
  );
}

<<<<<<< HEAD
export default Orders;
=======
  return (
    <div css={{ height: "50vh", marginLeft: "3rem", marginTop: "1rem", }}>
      <p css={{ color: "#00FFFF", fontWeight: "600", marginBottom: "1rem" }}>ORDER HISTORY</p>
      <p css={{ fontWeight: "600", marginBottom: "2rem" }}>YOU HAVE MADE {setValue(orders.length)} ORDERS SO FAR</p>

      {orders.length > 0 ?
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
              orders.map((order, index) => {

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
    </div>
  );
}


export default Orders;
>>>>>>> 2be4926319ba214fddc4701872770b57da8c9b48
