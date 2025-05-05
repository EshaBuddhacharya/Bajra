import React, { useState, useEffect, useContext } from "react";
import FoodItem from "./FoodItem"; // Import FoodItem component
import { useCart, CartContext } from "./CartContext";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import { ShoppingBasket } from 'lucide-react';

const Itemsshow = () => {
  const { addToCart, search } = useCart(); // Get addToCart from context
  const [menuData, setMenuData] = useState([]);
  const { selectedCategory } = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/menu/getItems`)
      .then((response) => {
        setMenuData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching menu items:", error);
        setIsLoading(false);
      });
  }, []);

  const filteredItems = menuData.filter((item) => {
    if (search) {
      return item.name.toLowerCase().includes(search.trim().toLowerCase());
    }
    if (selectedCategory === "all") {
      return true;
    }
    return item.category === selectedCategory;
  });

  return (
    <div>
      {isLoading ? (
        <div
          style={{
            height: "60vh",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-3 py-5 g-4 mx-md-5 m-0">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <FoodItem key={index} {...item} addToCart={addToCart} />
            ))
          ) : (
            <div className="w-100 text-center py-5">
              <h2>No Results Found</h2>
            </div>
          )}
        </div>
      )}
      <div className="d-md-block" style={{
        position: 'fixed',
        bottom: '2rem',
        right: '3rem',
        backgroundColor: 'white',
        padding: '10px',
        borderRadius: '50%',
        boxShadow: '0 2px 5px rgba(0,0,0,0.4)',
        cursor: 'pointer'
      }}>
        <ShoppingBasket />
      </div>
    </div>
  );
};

export default Itemsshow;
