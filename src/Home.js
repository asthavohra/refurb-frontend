import React from "react";
import "./Home.css";
import heroimage from "./assets/hero0.jpg";
import Product from "./Product";
import spinner from "./assets/spinner_1.gif";
import mobilespinner from "./assets/mobilespinner.gif";
import { getProducts } from "./external_services/ProductApi";
import Header from "./Header";
import Footer from "./Footer";

class Home extends React.Component {
  state = {
    productsInChunk: [],
    productsRawData: [],
  };

  getProductsInChunks(products) {
    let productsInChunk = [];
    // split the original array into a collection of two item sets
    for (let counter = 0; counter < products.length - 1; counter++) {
      if (counter % 2 == 0) {
        productsInChunk.push([products[counter], products[counter + 1]]);
      }
    }
    if (products.length % 2 != 0) {
      productsInChunk.push([products[products.length - 1], null]);
    }
    return productsInChunk;
  }
  componentDidMount() {
    getProducts().then((response) => {
      let productsInChunk = this.getProductsInChunks(response);
      this.setState({
        productsInChunk: productsInChunk,
        productsRawData: response,
      });
    });
  }

  render() {
    if (
      !this.state.productsInChunk ||
      this.state.productsInChunk.length === 0
    ) {
      return (
        <div className="home">
          <div className="home__container">
            <img
              className="home__image"
              src={heroimage}
              alt="hero image showing new mobiles affecting earth"
            />

            <div className="home__spinner">
              <img src={spinner} className="home__desktopspinner"></img>
              <img src={mobilespinner} className="home__mobilespinner"></img>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="home">
        <div className="home__container">
          <div className="home__imageopacity">
            <img
              className="home__image"
              src={heroimage}
              alt="hero image showing new mobiles affecting earth"
            />
            <div className="home__text">
              Hello there! We're reFurb, our mission is to make restored devices
              mainstream. Making old the 'new new' so to speak.
            </div>
          </div>

          {this.state.productsInChunk &&
            this.state.productsInChunk.map((product) => {
              return (
                <div className="home__row" key={`${product[0].id}-product-row`}>
                  <Product
                    id={product[0].id}
                    title={product[0].title}
                    price={product[0].price}
                    rating={parseInt(product[0].rating)}
                    image={product[0].image}
                    key={product[0].id}
                  />
                  {product[1] != null ? (
                    <Product
                      id={product[1]?.id}
                      title={product[1]?.title}
                      price={product[1]?.price}
                      rating={parseInt(product[1]?.rating)}
                      image={product[1]?.image}
                    />
                  ) : (
                    ""
                  )}
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}
export default Home;
