import React, { useState, useEffect, useContext } from "react";
import FoodItem from "./FoodItem"; // Import FoodItem component
import { useCart, CartContext } from "./CartContext";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import HoveringCart from "./hoveringCart";
import { motion, AnimatePresence } from 'framer-motion'  // eslint-disable-line no-unused-vars

const Itemsshow = () => {
  const { addToCart, cart, search } = useCart(); // Get addToCart from context
  const [menuData, setMenuData] = useState([]);
  const { selectedCategory } = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(false);

  const cartHasItem = (cart?.length || 0) >= 1; // getting number of items in cart

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/menu/getItems`)
      .then((response) => {
      setMenuData(response.data);
      })
      .catch((error) => {
      console.error("Error fetching menu items:", error);
      })
      .finally(() => {
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
            <FoodItem {...item} index={index} addToCart={addToCart} />
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
      {cartHasItem && <HoveringCart />}
    </div>
  );
};

export default Itemsshow;
