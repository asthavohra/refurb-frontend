import React from "react";
import { useState } from "react";
import "./Header.css";
import refurbicon from "./assets/reFurb-logos_white.png";
//import refurbicon from "./assets/reFurb..svg";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { Link, Redirect } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { auth } from "./external_services/FirebaseConfig";

function Header() {
  const [initiateSearch, setInitiateSearch] = useState(false);
  const [{ basket, user }, dispatch] = useStateValue();
  const [query, setQuery] = useState("");
  const handleAuthentication = () => {
    if (user) {
      auth.signOut();
      dispatch({
        type: "SIGNOUT",
      });
    }
  };
  const intiateSearchProducts = (event) => {
    event.preventDefault();
    setInitiateSearch(true);
  };

  return (
    <div className="header__wrapper">
      <div className="header">
        {initiateSearch == true ? (
          <Redirect
            to={{
              pathname: "/search",
              search: `?name=${query}`,
            }}
          />
        ) : (
          ""
        )}
        <div className="header__logo-container">
          <Link to="/">
            <img className="header__logo" src={refurbicon}></img>
          </Link>
        </div>

        <div className="header__search">
          <input
            className="header__searchInput"
            type="text"
            onChange={(event) => setQuery(event.target.value)}
          ></input>
          {/* Logo */}

          <SearchIcon
            onClick={intiateSearchProducts}
            className="header__searchIcon"
          />
        </div>
        <div className="header__nav">
          <Link to={!user ? "/login" : "/"} className="header__link">
            <div onClick={handleAuthentication} className="header__option">
              <span className="header__optionLineOne header__optionLineOne__email">
                Hello {!user ? "Guest" : user.email}
              </span>
              <span className="header__optionLineTwo">
                {user ? "Sign Out" : "Sign In"}
              </span>
            </div>
          </Link>
          {user ? (
            <Link to="/orders" className="header__link">
              <div className="header__option">
                <span className="header__optionLineOne">Your</span>
                <span className="header__optionLineTwo">Orders</span>
              </div>
            </Link>
          ) : (
            ""
          )}

          <div className="header__option">
            <span className="header__optionLineOne"></span>
            <span className="header__optionLineTwo"></span>
          </div>
          <Link to="/checkout" className="header__link">
            <div className="header__optionBasket">
              <ShoppingBasketIcon />
              <span className="header__optionLineTwo header__basketCount">
                {basket?.length}
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
