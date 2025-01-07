import React, { useContext, useState } from "react";
import { ProductContext, CartContext } from "./ProductContext";
import "./Card.css";

const Card = () => {
  const products = useContext(ProductContext);
  const { cart, setCart } = useContext(CartContext); // Access cart context

  return (
    <div className="row cardRow">
      {products.map((product) => {
        const [quantity, setQuantity] = useState(1); // Track selected quantity
        const [price, setPrice] = useState(product.price); // Track price based on quantity
        const [customQuantity, setCustomQuantity] = useState(""); // Track custom quantity input
        const [isCustom, setIsCustom] = useState(false); // Track whether "Custom" is selected

        const handleQuantityChange = (e) => {
          const selectedValue = e.target.value;

          if (selectedValue === "custom") {
            setIsCustom(true); // Show custom input
            setCustomQuantity(""); // Clear custom input
          } else {
            setIsCustom(false); // Hide custom input
            const newQuantity = Number(selectedValue);
            setQuantity(newQuantity);
            setPrice(product.price * newQuantity);
          }
        };

        const handleCustomQuantityChange = (e) => {
          const newCustomQuantity = Number(e.target.value) || 0;
          setCustomQuantity(newCustomQuantity);
          setQuantity(newCustomQuantity); // Update main quantity
          setPrice(product.price * newCustomQuantity);
        };

        const handleAddToCart = () => {
          const totalPrice = price;
          setCart((prevCart) => [
            ...prevCart,
            { ...product, quantity: quantity, totalPrice: totalPrice },
          ]);
        };

        const handleRemoveFromCart = () => {
          setCart((prevCart) =>
            prevCart.filter((item) => item.id !== product.id)
          );
         
        };

        // Check if the product is already in the cart
        const isInCart = cart.some((item) => item.id === product.id);

        return (
          <div
            key={product.id}
            className="col col-xxl-4 col-lg-6 col-md-12 cardCol mb-4"
          >
            <div className="card">
              <div className="card-body">
                <img
                  className="card-img-top rounded-5 mb-3"
                  src={product.image}
                  alt={product.title}
                />
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">{product.description}</p>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">Price: ${price.toFixed(2)}</li>
                  <li className="list-group-item">
                    Category: {product.category.toUpperCase()}
                  </li>
                  <li className="list-group-item">
                    Rating: {product.rating.rate} (
                    {product.rating.count} reviews)
                  </li>
                </ul>
                </div>
                <div className="card-footer d-flex justify-content-around align-items-center m-2">
                  {!isInCart && (
                    <>
                      <label
                        htmlFor={`quantity-select-${product.id}`}
                        className="form-label"
                      >
                        Quantity
                      </label>
                      <select
                        id={`quantity-select-${product.id}`}
                        className="form-select w-25 border-5"
                        value={isCustom ? "custom" : quantity} // Ensure the select shows the current value
                        onChange={handleQuantityChange}
                        aria-label="Select quantity"
                      >
                        {[1, 2, 3, 4, 5].map((num) => (
                          <option key={num} value={num}>
                            {num}
                          </option>
                        ))}
                        <option value="custom">Custom</option>
                      </select>

                      {isCustom && (
                       
                        <input
                          type="number"
                          min="1"
                          value={customQuantity}
                          className="form-control w-20 "
                          onChange={handleCustomQuantityChange}
                          placeholder="Enter quantity"
                        />
                       
                      )}
                    </>
                  )}

                  {isInCart ? (
                    <button
                      className="btn btn-danger"
                      onClick={handleRemoveFromCart}
                    >
                      Remove from Cart
                    </button>
                  ) : (
                    <button
                      className="btn btn-success"
                      onClick={handleAddToCart}
                      disabled={isCustom && customQuantity < 1} // Disable if custom quantity is invalid
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            </div>
        
        );
      })}
    </div>
  );
};

export default Card;
