import React from "react";
import { useLocation } from 'react-router-dom';

const OkPage = () => {
  const location = useLocation();
  
  // Check if location.state exists before destructuring
  const orderDetails = location.state || {};
  
  const {
    orderId = 'N/A', // Provide a default value
    orderStatus = 'Pending', // Provide a default value
    location: orderLocation = 'N/A',
    manualAddress = 'N/A',
    totalPrice = 0,
  } = orderDetails;

  return (
    <div>
      <h2>Order Tracking</h2>
      <p><strong>Order ID:</strong> {orderId}</p>
      <p><strong>Status:</strong> {orderStatus}</p>
      <p><strong>Location:</strong> {orderLocation}</p>
      <p><strong>Manual Address:</strong> {manualAddress}</p>
      <p><strong>Total Price:</strong> Rs {totalPrice}</p>
    </div>
  );
};

export default OkPage;
