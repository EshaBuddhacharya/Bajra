import React from 'react';
import { CartContext } from "./CartContext";
import { useState, useContext } from "react";
import { AuthContext } from '../contexts/AuthContext'
import { useNavigate } from "react-router-dom";

const FoodItem = ({ name, imgUrl, description, types, desc: portion, addToCart, _id }) => {
  imgUrl = import.meta.env.VITE_BACKEND_BASE_URL + imgUrl; 
  const [selectedType, setSelectedType] = useState(types[0].name);
  const [price, setPrice] = useState(types[0].price);
  const [quantity, setQuantity] = useState(1);  // Initial quantity set to 1
  const [error, setError] = useState("");
  const { cart } = useContext(CartContext);
  const { isAuthenticated } = useContext(AuthContext)
  const navigate = useNavigate();
  
  const handleTypeChange = (type) => {
    setSelectedType(type.name);
    setPrice(type.price);
  };
  
  const handleAddToCart = () => {
    if (!isAuthenticated){
      navigate('/signin');
      return;
    }
    const itemExists = cart.some(
      (item) => item.name === name && item.selectedType === selectedType
    );

    if (itemExists) {
      setError("This item is already in your cart!");
    } else {
      const itemToAdd = {
        name,
        selectedType,
        _id,
        price,
        quantity,  
        image: imgUrl,
      };
      addToCart(itemToAdd);
      setError(""); 
    }
  };

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));  
  };

  return (
    <div className="col">
      <div className="card h-100">
        <img src={imgUrl} className="card-img-top" alt={name} />
        <div className="card-body d-flex flex-column justify-content-between">
          <h4 className="card-title">{name}</h4>
          {description && <p className="card-text">{description}</p>}

          <div style={{ minHeight: "50px" }}>
            <ul className="list-unstyled">
              {types.map((type) => (
                <li key={type.name}>
                  {type.name}: Rs {type.price}
                </li>
              ))}
            </ul>
          </div>
          {portion && <b><p className="card-text">{portion}</p></b>}

          <div className="d-flex justify-content-between">
            <button className="btn btn-light border-danger">
              Price: Rs {price * quantity} 
            </button>

            <div className="d-flex align-items-center ms-3">
              <button
                className="btn btn-outline-danger"
                style={{ width: "40px", height: "40px", borderRadius: "8px" }}
                onClick={decreaseQuantity}
              >
                -
              </button>
              <span className="mx-2">{quantity}</span>
              <button
                className="btn btn-outline-danger"
                style={{ width: "40px", height: "40px", borderRadius: "8px" }}
                onClick={increaseQuantity}
              >
                +
              </button>
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center w-100 mt-3">
            <div className="dropdown me-2">
              <button
                className="btn btn-dark dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Type: {selectedType}
              </button>
              <ul className="dropdown-menu">
                {types.map((type) => (
                  <li key={type.name}>
                    <button
                      className="dropdown-item"
                      type="button"
                      onClick={() => handleTypeChange(type)}
                    >
                      {type.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <button
              className="btn btn-danger"
              style={{ width: "120px" }}
              onClick={handleAddToCart}
            >
              Add to cart
            </button>
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>} 
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
