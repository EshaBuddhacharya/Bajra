import React from "react";
import Navbar from "../component/Navbar";
import { Link, useLocation } from 'react-router-dom';


const Orderri = () => {
  const location = useLocation();
  const orderDetails = location.state;

  if (!orderDetails) {
    return <p>No order details found.</p>;
  }

  const {
    name,
    phone,
    location: orderLocation,
    manualAddress,
    additionalInstructions,
    totalPrice,
    date,
  } = orderDetails;

  // Shortened Order ID format
  const orderId = `ORD-${Math.floor(Math.random() * 10000)}`;

  return (
    <div>
      <Navbar />
      <div className="container mt-5 p-4 border rounded shadow">
        <h2 className="mb-4 " style={{ fontSize: '24px',color:"red" }}>Order Summary</h2>

        {/* Order ID and Date Section */}
        <div className="order-details mb-4 p-3 border rounded">
          <h4 style={{ fontSize: '18px' }}>Order ID: <span className="text-primary">{orderId}</span></h4>
          <h5 style={{ fontSize: '16px' }}><strong>Order Date:</strong> {date}</h5>
        </div>

        {/* Order Info Section */}
        <div className="order-info mb-4 p-3 border rounded">
          <h5 style={{ fontSize: '16px' }}><strong>Name:</strong> {name}</h5>
          <h5 style={{ fontSize: '16px' }}><strong>Phone:</strong> {phone}</h5>
          <h5 style={{ fontSize: '16px' }}><strong>Location:</strong> {orderLocation}</h5>
          <h5 style={{ fontSize: '16px' }}><strong>Manual Address:</strong> {manualAddress}</h5>
        </div>

        {/* Additional Instructions Section */}
        {additionalInstructions && (
          <div className="additional-instructions mb-4 p-3 border rounded">
            <h5 style={{ fontSize: '16px' }}><strong>Additional Instructions:</strong> {additionalInstructions}</h5>
          </div>
        )}

        {/* Pricing Section */}
        <div className="order-pricing mb-4 p-3 border rounded">
          <h5 style={{ fontSize: '16px' }}><strong>Total Price:</strong> Rs {totalPrice}</h5>
          <h4 className="text-danger" style={{ fontSize: '18px' }}>Grand Total: Rs {totalPrice}</h4>
        </div>
        <h5>You will get a call shortly.</h5>
        {/* Confirm Button */}
        <Link to ="/">
        <div className="text">
          <button className="btn btn-danger" style={{ width: "200px" }}>
           Ok
          </button>
        </div>
        </Link>
      </div>
    </div>
  );
};

export default Orderri;
