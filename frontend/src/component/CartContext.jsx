import React, { createContext, useContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  // Initialize cart from localStorage or empty array
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [search, setSearch] = useState(null)

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (itemToAdd) => {
    const existingItem = cart.find(
      (item) =>
        item.name === itemToAdd.name && item.selectedType === itemToAdd.selectedType
    );

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.name === itemToAdd.name && item.selectedType === itemToAdd.selectedType
            ? { ...item, quantity: item.quantity + itemToAdd.quantity }
            : item
        )
      );
    } else {
      setCart((prevCart) => [...prevCart, itemToAdd]);
    }
  };  

  const removeFromCart = (itemToRemove) => {
    setCart(cart.filter(item => item !== itemToRemove));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, selectedCategory, setSelectedCategory, setCart, search, setSearch }}>
      {children}
    </CartContext.Provider>
  );
}; 
