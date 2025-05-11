import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Theme, ThemePanel } from "@radix-ui/themes";
import { CartProvider } from "./component/CartContext";
import AuthProvider from './contexts/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <Theme accentColor="red">
            <App />
          </Theme>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
