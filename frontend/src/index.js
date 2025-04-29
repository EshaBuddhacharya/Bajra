import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { CartProvider } from "./component/CartContext";
import AuthProvider from './contexts/AuthContext';


ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
