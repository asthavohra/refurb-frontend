import React, { useState, useEffect } from "react";
import CheckoutProduct from "./CheckoutProduct";
import "./Payment.css";
import { useStateValue } from "./StateProvider";
import { Link, useHistory } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./reducer";
import { initiatePayment } from "./external_services/PaymentApi";
import { createOrder } from "./external_services/OrderApi";
import Footer from "./Footer";

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();
  const history = useHistory();
  const stripe = useStripe();
  const elements = useElements();
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true);

  if (!user) {
    history.push("/checkout");
    history.push("/login");
  }

  useEffect(() => {
    //generate special stripe secret which allows to charge the customer and whenever the basket changes
    //we need to get another secret
    if (`${getBasketTotal(basket)}` > 0) {
      initiatePayment(`${getBasketTotal(basket)}`)
        .then((response) => {
          setClientSecret(response.clientSecret);
        })
        .catch((error) => {
          console.error("Error occurred while initiating payment", error);
        });
    }
  }, [basket]);
  const handleSubmit = async (event) => {
    //stripe function
    event.preventDefault();
    setProcessing(true);
    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        //paymentIntent=payment confirmation
        let orderData = {
          userId: user.uid,
          orderId: paymentIntent.id,
          amount: paymentIntent.amount / 100,
          currency: paymentIntent.currency,
          paymentMethodType: paymentIntent.payment_method_types[0],
          status: paymentIntent.status,
          createdAt: new Date(paymentIntent.created * 1000).toLocaleString(
            "en-GB"
          ),
          basket: basket,
        };
        createOrder(orderData)
          .then((response) => {
            setSucceeded(true);
            setProcessing(false);
            dispatch({
              type: "EMPTY_BASKET",
            });
            history.replace("/orders");
          })
          .catch((error) => {
            console.error("Unable to create order, error:", error);
            setError(error);
          });
      });
  };

  const handleChange = (event) => {
    //listen for changes inside the Crad Element
    //display errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  return (
    <>
      <div className="payment">
        <div className="payment__container">
          <h1>
            Checkout(
            <Link to="/checkout" className="payment__items">
              {basket.length}items
            </Link>
            )
          </h1>
          {/*Payment section-delivery address */}
          <div className="payment__section">
            <div className="payment__title">
              <h3>Delivery Address</h3>
            </div>
            <div className="payment__address">
              <p>{user?.email}</p>
              <p>55 BrainStation</p>
              <p>London,UK</p>
            </div>
          </div>

          {/*Payment section-review items */}
          <div className="payment__section">
            <div className="payment__title">
              <h3>Review & Delivery</h3>
            </div>
            <div className="payment__items">
              {basket.map((item) => (
                <CheckoutProduct
                  id={item.id}
                  title={item.title}
                  image={item.image}
                  price={item.price}
                  rating={item.rating}
                />
              ))}
            </div>
          </div>
          {/*Payment section-payment method */}
          <div className="payment__section">
            <div className="payment__title">
              <h3>Payment Method</h3>
            </div>
            <div className="payment__details">
              {/* Stripe function here */}
              <form onSubmit={handleSubmit}>
                <CardElement onChange={handleChange} />
                <div className="payment__priceContainer">
                  <CurrencyFormat
                    renderText={(value) => <h3>Order Total: {value}</h3>}
                    decimalScale={2}
                    value={getBasketTotal(basket)}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"£"}
                  />
                  <button disabled={processing || disabled || succeeded}>
                    <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                  </button>
                </div>
                {/* Errors*/}
                {error && <div>{error}</div>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Payment;
