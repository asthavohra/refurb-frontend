import React from "react";
import "./CheckoutProduct.css";
import { useStateValue } from "./StateProvider";
import { removeItemFromCart } from "./external_services/CartApi";

function CheckoutProduct({ id, image, title, price, rating, hideButton }) {
  const [{ user, basket }, dispatch] = useStateValue();

  const removeFromBasket = () => {
    if (user) {
      removeItemFromCart(user.uid, id)
        .then((response) => {
          //remove item from basket
          dispatch({
            type: "REMOVE_FROM_BASKET",
            id: id,
          });
        })
        .catch((error) => {
          console.error("Unable to remove item from the cart, error: ", error);
        });
    } else {
      //remove item from basket
      dispatch({
        type: "REMOVE_FROM_BASKET",
        id: id,
      });
    }
  };
  return (
    <>
      <div className="checkoutProduct">
        <img className="checkoutProduct__image" src={image}></img>
        <div className="checkoutProduct__info">
          <p className="checkoutProduct__title">{title}</p>
          <p className="checkoutProduct__price">
            <small>£</small>
            <strong>{price}</strong>
          </p>
          <div className="checkoutProduct__rating">
            {Array(rating)
              .fill()
              .map((_, i) => (
                <p key={`checkoutProduct__rating__${i}`}>⭐</p>
              ))}
          </div>
          {!hideButton && (
            <button onClick={removeFromBasket}>Remove from Basket</button>
          )}
        </div>
      </div>
    </>
  );
}

export default CheckoutProduct;
