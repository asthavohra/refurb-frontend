import React, { useState, useEffect } from "react";
import "./Home.css";
import { useLocation } from "react-router-dom";
import Product from "./Product";
import spinner from "./assets/spinner_1.gif";
import noresult from "./assets/no-result.png";
import "./SearchProducts.css";

import { searchProductsByTitle } from "./external_services/ProductApi";

function SearchProducts() {
  const [products, setProducts] = useState();
  const [productsInChunk, setProductsInChunk] = useState();
  const location = useLocation();
  const searchTerm = new URLSearchParams(location.search).get("name") ?? null;

  useEffect(() => {
    searchProductsByTitle(searchTerm)
      .then((response) => {
        if (response.length > 0) {
          setProducts(response);
          setProductsInChunk(getProductsInChunks(response));
        }
      })
      .catch((error) => {
        console.error("unable to search, error:", error);
      });
  }, [searchTerm]);

  function getProductsInChunks(products) {
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

  return (
    //TODO: min-width size set or product not image to be displayed
    <div className="home__search">
      {(!searchTerm || !products) && (
        <img src={noresult} className="home__error"></img>
      )}
      {productsInChunk &&
        productsInChunk.map((product) => {
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
                  key={product[1].id}
                />
              ) : (
                ""
              )}
            </div>
          );
        })}
    </div>
  );
}
export default SearchProducts;
