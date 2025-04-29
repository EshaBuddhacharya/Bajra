import React, { createContext, useContext, useState } from "react";

export const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (itemToAdd) => {
    // Check if the item is already in the cart
    const existingItem = cart.find(
      (item) =>
        item.name === itemToAdd.name && item.selectedType === itemToAdd.selectedType
    );

    if (existingItem) {
      // Update quantity if item already exists in cart
      setCart(
        cart.map((item) =>
          item.name === itemToAdd.name && item.selectedType === itemToAdd.selectedType
            ? { ...item, quantity: item.quantity + itemToAdd.quantity }
            : item
        )
      );
    } else {
      // Add new item to cart
      setCart((prevCart) => [...prevCart, itemToAdd]);
    }
  };

  const removeFromCart = (itemToRemove) => {
    setCart(cart.filter(item => item !== itemToRemove));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
