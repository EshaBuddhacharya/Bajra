import React, { useState, useEffect } from "react";
import FoodItem from "./FoodItem";  // Import FoodItem component
import { useCart } from "./CartContext"
import axios from "axios"

const Itemsshow = () => {
  const { addToCart } = useCart();  // Get addToCart from context
  const [menuData, setMenuData] = useState([])

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/menu/getItems`)
      .then(response => {
        setMenuData(response.data)
        console.log('Menu items fetched:', response.data);
      })
      .catch(error => {
        console.error('Error fetching menu items:', error);
      });
  }, []);



  return (
    <div className="row row-cols-1 row-cols-md-3 py-5 g-4">
      {menuData.map((item, index) => (
        <FoodItem
          key={index}
          {...item}
          addToCart={addToCart}  // Pass addToCart function to FoodItem
        />
      ))}
    </div>
  );
};

export default Itemsshow;
