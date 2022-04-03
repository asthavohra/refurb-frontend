import React from "react";
import "./Product.css";
import { useStateValue } from "./StateProvider";
import { addItemToCart } from "./external_services/CartApi";

function Product({ id, title, image, price, rating }) {
  const [{ basket, user }, dispatch] = useStateValue();

  const addToBasket = () => {
    if (user) {
      const cartItems = {
        userId: user.uid,
        item: {
          id: id,
          title: title,
          image: image,
          price: price,
          rating: rating,
        },
      };
      addItemToCart(cartItems)
        .then((response) => {
          dispatch({
            type: "ADD_TO_BASKET",
            item: {
              id: id,
              title: title,
              image: image,
              price: price,
              rating: rating,
            },
          });
        })
        .catch((error) => {
          console.error("Unable to add items to cart, error:", error);
        });
    } else {
      //dispatch item into the data layer
      dispatch({
        type: "ADD_TO_BASKET",
        item: {
          id: id,
          title: title,
          image: image,
          price: price,
          rating: rating,
        },
      });
    }
  };
  return (
    <div className="product" key={`${id}-product`}>
      <div className="product__info" key={`${id}-product-info`}>
        <p>{title}</p>
        <p className="product__price">
          <small>£</small>
          <strong>{price}</strong>
        </p>
        <div className="product__rating" key={`${id}-product-rating`}>
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p key={`${id}-product-rating-${i}`}>⭐</p>
            ))}
        </div>
      </div>
      <img src={image} alt=""></img>
      <button onClick={addToBasket}>Add to Basket</button>
    </div>
  );
}

export default Product;
