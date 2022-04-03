import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer">
      <div className="footer__1 footer__all">
        <Link to="/about" className="footer__link">
          ABOUT
        </Link>
      </div>

      <div className="footer__1 footer__all">
        <Link to="/contact" className="footer__link">
          CONTACT
        </Link>
      </div>
    </div>
  );
}
export default Footer;
