import React, { useState } from "react";
import { useCart } from "../component/CartContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../component/Navbar";


const Confirm = () => {
  const { cart } = useCart();
  const navigate = useNavigate();

  const [location, setLocation] = useState("");
  const [manualAddress, setManualAddress] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [additionalInstructions, setAdditionalInstructions] = useState("");
  const [isPaymentCompleted, setIsPaymentCompleted] = useState(false);
  const [error, setError] = useState("");

  const getTotalPrice = () => {
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const deliveryCharge = 150; // Delivery charge
    return totalPrice + deliveryCharge;
  };

  const handleConfirmClick = () => {
    if (!location || !name || !phone || !manualAddress || !isPaymentCompleted) {
      setError("Please fill in all the required fields and confirm the payment.");
      return;
    }
    if (!/^[A-Za-z ]+$/.test(name)) {
      setError("Name must contain only letters and spaces.");
      return;
    }
    if (!/^[0-9]{10}$/.test(phone)) {
      setError("Phone number must be exactly 10 digits.");
      return;
    }

    // Create order details
    const orderDetails = {
      name,
      phone,
      location,
      manualAddress,
      additionalInstructions,
      totalPrice: getTotalPrice(),
      date: new Date().toLocaleString(), // current date and time
    };

    console.log("Order confirmed!");

    // Pass order details to the next page (Orderri)
    navigate("/order", { state: orderDetails });
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-5 p-4 border rounded shadow">
        <h2>Confirm Your Order</h2>

        <div className="mt-4">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name <span className="text-danger">*</span></label>
            <input 
              type="text" 
              className="form-control" 
              id="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              required 
            />
          </div>

          <div className="mb-3">
            <label htmlFor="phone" className="form-label">Phone <span className="text-danger">*</span></label>
            <input 
              type="text" 
              className="form-control" 
              id="phone" 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)}
              required 
            />
          </div>

          <div className="mb-3">
            <label htmlFor="location" className="form-label">Location <span className="text-danger">*</span></label>
            <select 
              className="form-select" 
              id="location" 
              value={location} 
              onChange={(e) => setLocation(e.target.value)}
              required
            >
              <option value="">Select Location</option>
              <option value="Lalitpur">Lalitpur</option>
              <option value="Bhaktapur">Bhaktapur</option>
              <option value="Kathmandu">Kathmandu</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="manualAddress" className="form-label">Manual Address <span className="text-danger">*</span></label>
            <input 
              type="text" 
              className="form-control" 
              id="manualAddress" 
              value={manualAddress} 
              onChange={(e) => setManualAddress(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="additionalInstructions" className="form-label">Additional Instructions</label>
            <textarea 
              className="form-control" 
              id="additionalInstructions" 
              value={additionalInstructions} 
              onChange={(e) => setAdditionalInstructions(e.target.value)} 
            ></textarea>
          </div>

          <div className=" mb-3 p-3 border rounded">
            <h5>Please complete at least 50% of the payment</h5>
            <img 
              src="/images/qr.svg" 
              alt="QR Code for Payment" 
              style={{ width: "200px", height: "200px" }} 
            />
          </div>

          <div className="form-check">
            <input 
              type="checkbox" 
              className="form-check-input" 
              id="paymentCheck" 
              checked={isPaymentCompleted} 
              onChange={(e) => setIsPaymentCompleted(e.target.checked)}
              required
            />
            <label className="form-check-label" htmlFor="paymentCheck">
              I have completed at least 50% of the payment
            </label>
          </div>

          {error && <p className="text-danger mt-2">{error}</p>}
          <div className="mt-4 p-3 border rounded">
            <h5>Delivery Charge: Rs 150</h5>
            <h5>Total Charge: Rs {cart.reduce((total, item) => total + item.price * item.quantity, 0)}</h5>
            <h4>Grand Total: Rs {getTotalPrice()}</h4>
          </div>
          <div className="mt-4 text-center">
            <button 
              onClick={handleConfirmClick} 
              className="btn btn-danger" 
              style={{ width: "200px" }}
              disabled={!location || !name || !phone || !manualAddress || !isPaymentCompleted || !/^[A-Za-z ]+$/.test(name) || !/^[0-9]{10}$/.test(phone)}
            >
              Confirm Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
