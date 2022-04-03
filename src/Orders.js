import "./Orders.css";
import React, { useEffect, useState } from "react";
import { useStateValue } from "./StateProvider";
import { getAllOrders } from "./external_services/OrderApi";
import Order from "./Order";
import Footer from "./Footer";

function Orders() {
  const [{ basket, user }, dispatch] = useStateValue();
  const [orders, setOrders] = useState();

  useEffect(() => {
    if (user) {
      getAllOrders(user.uid)
        .then((orders) => {
          setOrders(orders);
        })
        .catch((error) => {
          console.error("Error while fetching orders, error:", error);
        });
    }
  }, [user]);

  return (
    <>
      <div className="orders">
        <h1>Your Orders</h1>
        <div className="orders__order">
          {orders?.map((order) => (
            <Order order={order} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Orders;
