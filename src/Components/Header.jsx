import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [isToggleCart, setToggleCart] = useState(false);

  return (
    <div className="fluid-container">
      <div className="row align-items-center mt-1">
        <div className="col-12 text-center">
          <h1>Shopping Zone</h1>
        </div>
        <div className="col-11 text-end">
          
          <Link
            to={isToggleCart ? "/" : "/cart"}
            className="link-reset "
          >
           <button
            className="btn btn-primary cartButton"
            onClick={() => setToggleCart(!isToggleCart)}
          >
            {isToggleCart ? "Shop" : "My Cart"} {" "}
            <i className="fa-solid fa-cart-shopping"></i>
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
