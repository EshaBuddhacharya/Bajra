import React, { useState, useEffect, useContext } from "react";
import FoodItem from "./FoodItem"; // Import FoodItem component
import { useCart, CartContext } from "./CartContext";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import HoveringCart from "./hoveringCart";
import { motion, AnimatePresence } from 'framer-motion'

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

  const renderSpinner = () => (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "60vh" }}>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );

  const renderNoResults = () => (
    <motion.div
      className="w-100 text-center py-5"
      key="no-results" // Unique key for the no-results case
      initial={{ opacity: 0, filter: 'blur(10px)' }} // Start faded out
      animate={{ opacity: 1, filter: 'blur(0px)' }} // Fade in
      exit={{ opacity: 0, filter: 'blur(10px)' }} // Fade out when exiting
      transition={{ duration: 0.3 }} // Animation duration of 0.3 seconds>
    >
      <h2>No Results Found</h2>
    </motion.div>
  );

  const renderMenuItems = () => (
    <AnimatePresence>
      <motion.div className="row row-cols-1 row-cols-md-3 py-2 g-4 mx-md-4 m-0">
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <motion.div
              key={item.id || index} // Prefer item.id for uniqueness, fallback to index
              initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }} // Start blurred and scaled down
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }} // Remove blur and scale up
              exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
              transition={{ duration: 0.3 }} // Animation duration of 0.3 seconds
              layout // Enable layout animations for this item
            >
              <FoodItem {...item} addToCart={addToCart} />
            </motion.div>
          ))
        ) : (
          renderNoResults()
        )}
      </motion.div>
    </AnimatePresence>
  );


  return (
    <div>
      {isLoading ? renderSpinner() : renderMenuItems()}
      <HoveringCart />
    </div>
  );
};

export default Itemsshow;
