import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../component/Navbar";

const ConfirmOrder = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { peopleCount, totalPrice } = location.state || { peopleCount: 0, totalPrice: 0 };

  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [address, setAddress] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("Kathmandu");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [amPm, setAmPm] = useState("AM");
  const [additionalInstructions, setAdditionalInstructions] = useState("");
  const [isPaymentCompleted, setIsPaymentCompleted] = useState(false);
  const [finalPrice, setFinalPrice] = useState(totalPrice); // Initialize finalPrice state

  const handleDateChange = (e) => {
    setDeliveryDate(e.target.value);
    const currentDate = new Date();
    const selectedDate = new Date(e.target.value);
    const timeDifference = selectedDate - currentDate;
    const oneWeekInMilliseconds = 7 * 24 * 60 * 60 * 1000;

    if (timeDifference <= oneWeekInMilliseconds) {
      setError("We cannot process orders for delivery within 1 week.");
    } else {
      setError("");
    }
  };

  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
  };

  const handlePaymentChange = (e) => {
    setIsPaymentCompleted(e.target.checked);
  };

  const handleConfirmClick = () => {
    console.log("Confirming order...");

    // Check if all required fields are filled and the payment checkbox is checked
    if (
      !address ||
      !deliveryDate ||
      !deliveryTime ||
      error ||
      !name ||
      !phone ||
      !isPaymentCompleted
    ) {
      setError("Please fill in all the fields correctly and confirm the payment.");
      console.log("Form is invalid");
      return;
    }

    const deliveryCharge = 200;
    let price = totalPrice + deliveryCharge;

    // Price adjustment for mutton curry based on people count
    if (peopleCount <= 100) {
      price += 15000;
    } else if (peopleCount <= 150) {
      price += 22000;
    } else if (peopleCount <= 200) {
      price += 30000;
    } else if (peopleCount <= 250) {
      price += 37000;
    } else if (peopleCount <= 300) {
      price += 45000;
    } else if (peopleCount <= 350) {
      price += 52000;
    } else if (peopleCount <= 400) {
      price += 60000;
    } else if (peopleCount <= 450) {
      price += 67000;
    } else if (peopleCount <= 500) {
      price += 75000;
    }

    // Price adjustment for fish based on people count
    if (peopleCount <= 100) {
      price += 10000;
    } else if (peopleCount <= 150) {
      price += 15000;
    } else if (peopleCount <= 200) {
      price += 20000;
    } else if (peopleCount <= 250) {
      price += 25000;
    } else if (peopleCount <= 300) {
      price += 30000;
    } else if (peopleCount <= 350) {
      price += 35000;
    } else if (peopleCount <= 400) {
      price += 40000;
    } else if (peopleCount <= 450) {
      price += 45000;
    } else if (peopleCount <= 500) {
      price += 50000;
    }

    // Price adjustment for farsi (same as laisu)
    const farsiLaisuPrice = peopleCount <= 100 ? 700 : 
                            peopleCount <= 150 ? 1000 :
                            peopleCount <= 200 ? 1400 :
                            peopleCount <= 250 ? 1700 :
                            peopleCount <= 300 ? 2000 :
                            peopleCount <= 350 ? 2300 :
                            peopleCount <= 400 ? 2600 :
                            peopleCount <= 450 ? 2900 : 3200;

    price += farsiLaisuPrice * 2; // Because laisu and farsi prices are the same

    // Price adjustment for juice
    if (peopleCount <= 100) {
      price += 6000;
    } else if (peopleCount <= 150) {
      price += 9000;
    } else if (peopleCount <= 200) {
      price += 12000;
    } else if (peopleCount <= 250) {
      price += 15000;
    } else if (peopleCount <= 300) {
      price += 18000;
    } else if (peopleCount <= 350) {
      price += 21000;
    } else if (peopleCount <= 400) {
      price += 24000;
    } else if (peopleCount <= 450) {
      price += 27000;
    } else if (peopleCount <= 500) {
      price += 30000;
    }

    // Update final price
    setFinalPrice(price);

    // Navigate to the order summary page
    console.log("Order confirmed, navigating to summary...");
    navigate("/ordersum", {
      state: {
        peopleCount,
        totalPriceWithDelivery: price,
        deliveryDate,
        deliveryTime,
        address,
        selectedLocation,
        name,
        phone,
        additionalInstructions,
      },
    });
  };

  const isFormValid = () => {
    const isValid =
      address &&
      deliveryDate &&
      deliveryTime &&
      name &&
      phone &&
      isPaymentCompleted &&
      !error;

    console.log("Is form valid?", isValid);
    return isValid;
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5 pt-0 mb-5">
        <h2>Confirm Your Order</h2>
        <div className="card mb-3">
          <div className="card-body">
            {/* Name and Phone Number Inputs */}
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Enter Your Name: <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                id="name"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Enter Your Phone Number: <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                id="phone"
                className="form-control"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
              />
            </div>

            {/* Delivery Date Picker */}
            <div className="mb-3">
              <label htmlFor="deliveryDate" className="form-label">
                Select Delivery Date: <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="date"
                id="deliveryDate"
                className="form-control"
                value={deliveryDate}
                onChange={handleDateChange}
                min={new Date().toISOString().split("T")[0]} // Disable past dates
              />
              {error && <small className="text-danger">{error}</small>}
            </div>

            {/* Delivery Time Picker with AM/PM */}
            <div className="mb-3">
              <label htmlFor="deliveryTime" className="form-label">
                Select Delivery Time: <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="time"
                id="deliveryTime"
                className="form-control"
                value={deliveryTime}
                onChange={(e) => setDeliveryTime(e.target.value)}
              />
              <div className="mt-2">
                <label className="form-label">Select AM/PM: <span style={{ color: "red" }}>*</span></label>
                <select
                  value={amPm}
                  onChange={(e) => setAmPm(e.target.value)}
                  className="form-select"
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
              <small className="text-muted">AM/PM format</small>
            </div>

            {/* Location Selection */}
            <div className="mb-3">
              <label htmlFor="location" className="form-label">
                Select Delivery Location (Kathmandu, Lalitpur, Bhaktapur): <span style={{ color: "red" }}>*</span>
              </label>
              <select
                id="location"
                className="form-select"
                value={selectedLocation}
                onChange={handleLocationChange}
              >
                <option value="Kathmandu">Kathmandu</option>
                <option value="Lalitpur">Lalitpur</option>
                <option value="Bhaktapur">Bhaktapur</option>
              </select>
            </div>

            {/* Address Input */}
            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Enter Your Address: <span style={{ color: "red" }}>*</span>
              </label>
              <textarea
                id="address"
                className="form-control"
                rows="3"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your delivery address"
              />
            </div>

            {/* Additional Instructions (Optional) */}
            <div className="mb-3">
              <label htmlFor="additionalInstructions" className="form-label">
                Additional Instructions (Optional):
              </label>
              <textarea
                id="additionalInstructions"
                className="form-control"
                rows="3"
                value={additionalInstructions}
                onChange={(e) => setAdditionalInstructions(e.target.value)}
                placeholder="Enter any additional instructions"
              />
            </div>

            {/* QR Code Image Display (Optional) */}
            <div className="mb-3">
              <p><strong>Note:</strong> You must scan the QR code to confirm your payment (optional).</p>
              <img
                src="/images/qr.svg"
                alt="QR Code"
                style={{  height: "200px",  margin: "auto" }}
              />
            </div>

            {/* Payment Checkbox */}
            <div className="mb-3">
              <input
                type="checkbox"
                id="paymentCompleted"
                checked={isPaymentCompleted}
                onChange={handlePaymentChange}
              />
              <label htmlFor="paymentCompleted" className="form-label ms-2">
                I have completed the payment: <span style={{ color: "red" }}>*</span>
              </label>
            </div>

            {/* Payment and Confirmation Notice */}
            <div className="mb-3">
              <p style={{ color: "red" }}>
                <strong>Important:</strong> You need to pay at least half of the payment before we can confirm your order. Until we receive the payment, your order will not be processed.
              </p>
            </div>

            {/* Delivery Charge and Total Price */}
            <div className="mb-3">
              <p><strong>Delivery Charge: Rs. 1000</strong></p>
              <p><strong>Total Price (Including Delivery): Rs. {finalPrice}</strong></p>
            </div>

            {/* Confirm Order Button */}
            <Button
              variant="danger"
              onClick={handleConfirmClick}
              disabled={!isFormValid()}
            >
              Confirm Order
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;
