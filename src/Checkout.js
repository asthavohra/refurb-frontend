import React from "react";
import "./Checkout.css";
import banner from "./assets/banner.jpg";
import spinner from "./assets/spinner_1.gif";
import mobilespinner from "./assets/mobilespinner.gif";
import Subtotal from "./Subtotal";
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";

function Checkout() {
  const [{ basket, user }, dispatch] = useStateValue();

  return (
    <div className="checkout">
      <div className="checkout__left">
        <img className="checkout__ad" src={banner} alt=""></img>
        <div>
          <h4 className="checkout__user">Hello {user?.email ?? "Guest"} </h4>
          <h2 className="checkout__title">Your Shopping Basket</h2>
          {user && basket.length === 0 && (
            <img src={spinner} className="checkout__spinner"></img>
          )}
          {user && basket.length === 0 && (
            <img src={mobilespinner} className="checkout__mobilespinner"></img>
          )}
          {basket.length > 0 &&
            basket.map((item, index) => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
                key={`checkoutProduct__${item.id}__${index}`}
              />
            ))}
        </div>
      </div>
      <div className="checkout__right">
        <Subtotal />
      </div>
    </div>
  );
}

export default Checkout;
