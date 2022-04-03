import React, { useEffect } from "react";
import "./App.css";
import Header from "./Header";
import Home from "./Home";
import Checkout from "./Checkout";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Login from "./Login";
import { auth } from "./external_services/FirebaseConfig";
import { useStateValue } from "./StateProvider";
import Footer from "./Footer";
import Payment from "./Payment";
import Orders from "./Orders";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Contact from "./Contact";
import About from "./About";
import SearchProducts from "./SearchProducts";
import Signup from "./Signup";
import { getCurrentUserCartItems } from "./external_services/UsersApi";

const stripe = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

function App() {
  const [{}, dispatch] = useStateValue();
  useEffect(() => {
    //only run once when the app component loads
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //the user just logged in or user was logged in
        getCurrentUserCartItems(authUser.uid)
          .then((cart) => {
            dispatch({
              type: "SET_USER",
              user: authUser,
              basket: cart.items,
            });
          })
          .catch((error) => {
            console.error(
              "Unable to get current cart items, error:",
              error.message
            );
            dispatch({
              type: "SET_USER",
              user: authUser,
              basket: [],
            });
          });
      } else {
        //the user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);
  return (
    <div className="app">
      <BrowserRouter>
        <Switch>
          <Route path="/signup">
            <Signup />
            <Footer />
          </Route>
          <Route path="/about">
            <Header />
            <About />
          </Route>
          <Route path="/contact">
            <Header />
            <Contact />
          </Route>
          <Route path="/orders">
            <Header />
            <Orders />
          </Route>
          <Route path="/login">
            <Login />
            <Footer />
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
            <Footer />
          </Route>
          <Route path="/payment">
            <Header />
            <Elements stripe={stripe}>
              <Payment />
            </Elements>
            <Footer />
          </Route>
          <Route path="/search">
            <Header />
            <SearchProducts />
            <Footer />
          </Route>
          <Route path="/">
            <Header />
            <Home />
            <Footer />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}
export default App;
