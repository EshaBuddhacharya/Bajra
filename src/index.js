import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { CartProvider } from "./component/CartContext"; // Import CartProvider

ReactDOM.render(
  <React.StrictMode>
    <CartProvider> {/* Wrap entire app */}
      <App />
    </CartProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
