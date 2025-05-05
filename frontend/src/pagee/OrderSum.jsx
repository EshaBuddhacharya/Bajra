import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../component/Navbar';
import { Button } from 'react-bootstrap';

const OrderSum = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    totalPriceWithDelivery,
    deliveryDate,
    deliveryTime,
    address,
    selectedLocation,
    name,
    phone,
    additionalInstructions,
  } = location.state || {};
  // If no data exists (for navigation issues), display a fallback message
  if (!name) {
    return <h2>No order details available</h2>;
  }
 

  return (<>
    <Navbar/>
    <div className="container mt-5">
      <h2 className="mb-4 textorder ">Order Summary</h2>

      <div className="card p-4">
        <h3 className = "textorder"> Customer Details</h3>
        
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Phone:</strong> {phone}</p>

        <h3 className = "textorder">Delivery Details</h3>
        <p><strong>Delivery Address:</strong> {address}</p>
        <p><strong>Delivery Location:</strong> {selectedLocation}</p>
        <p><strong>Delivery Date:</strong> {deliveryDate}</p>
        <p><strong>Delivery Time:</strong> {deliveryTime}</p>

        {additionalInstructions && (
          <>
            <h3 className = "textorder">Additional Instructions</h3>
            <p>{additionalInstructions}</p>
          </>
        )}

        <h3 className = "textorder">Payment Details</h3>
        <p><strong>Total Price (Food):</strong> Rs. {totalPriceWithDelivery - 200}</p>
        <p><strong>Delivery Charge:</strong> Rs. 200</p>
        <p><strong>Total Price (Including Delivery):</strong> Rs. {totalPriceWithDelivery}</p>

        <div className="mt-4">
          <p>We will contact you shortly for further details.</p>
        </div>

        {/* OK Button */}
        <Button variant="danger"className="mt-3" onClick={() => navigate("/")}>
          OK
        </Button>
      </div>
    </div>
    </>
  );
};

export default OrderSum;
