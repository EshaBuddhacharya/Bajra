import React, { useState, useEffect, useContext } from "react";
import FoodItem from "./FoodItem";  // Import FoodItem component
import { useCart, CartContext } from "./CartContext"
import axios from "axios"
import Spinner from 'react-bootstrap/Spinner';

const Itemsshow = () => {
  const { addToCart } = useCart();  // Get addToCart from context
  const [menuData, setMenuData] = useState([])
  const { selectedCategory } = useContext(CartContext)
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true)
    axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/menu/getItems`)
      .then(response => {
        setMenuData(response.data)
        setIsLoading(false)
      })
      .catch(error => {
        console.error('Error fetching menu items:', error);
      });
  }, []);



  return (
    <div>
      {isLoading ?
        <div style={{height: '60vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div> :
        <div className="row row-cols-1 row-cols-md-3 py-5 g-4">
          {menuData.map((item, index) =>
            selectedCategory === 'all' ? (
              <FoodItem
                key={index}
                {...item}
                addToCart={addToCart}  // Pass addToCart function to FoodItem
              />
            ) : (
              item.category === selectedCategory && (
                <FoodItem
                  key={index}
                  {...item}
                  addToCart={addToCart}  // Pass addToCart function to FoodItem
                />
              )
            )
          )}
        </div>
      }
    </div>
  );
};

export default Itemsshow;
