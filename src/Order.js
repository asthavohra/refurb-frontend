import React from "react";
import "./Order.css";
import CurrencyFormat from "react-currency-format";
import CheckoutProduct from "./CheckoutProduct";

function Order({ order }) {
  return (
    <div className="order">
      <div className="order__details">
        <h2>Order</h2>
        <div className="order__creation">
          <div className="order__creation-date">
            <p>{order.data.createdAt}</p>
          </div>
          <div className="order__creationid">
            <p className="order__id">
              <small>{order.id}</small>
            </p>
          </div>
        </div>
      </div>
      {order.data.basket?.map((item) => (
        <CheckoutProduct
          id={item.id}
          title={item.title}
          image={item.image}
          price={item.price}
          rating={item.rating}
          hideButton
        />
      ))}
      <CurrencyFormat
        renderText={(value) => (
          <h3 className="order__total">Order Total: {value}</h3>
        )}
        decimalScale={2}
        value={order.data.amount}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"£"}
      />
    </div>
  );
}

export default Order;
