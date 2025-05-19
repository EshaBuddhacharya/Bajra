import React, { useState } from 'react';
import Navbar from '../component/Navbar';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useCart } from '../component/CartContext';

const Feastpack = () => {
  const { basePricePerPlate, peopleCount, setPeopleCount } = useCart();
  const [error, setError] = useState("");

  const totalPrice = peopleCount ? peopleCount * basePricePerPlate : 0;

  const handlePeopleChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setPeopleCount(value);

    if (value < 100) {
      setError("Minimum number of people is 100.");
    } else if (value > 500) {
      setError("Maximum number of people is 500.");
    } else {
      setError("");
    }
  };

  return (
    <>
      <Navbar />
      <div className="card mb-3 mt-2" style={{ maxWidth: "100%" }}>
        <div className="row g-0">
          <div className="col-md-4">
            <img src="images/wt.png" className="img-fluid rounded-start" alt="Feast" />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">Feast Package</h5>
              <p><strong>Per plate: Rs. {basePricePerPlate}</strong></p>

              <div className="mb-3">
                <label htmlFor="peopleCount" className="form-label">
                  Number of People (100-500):
                </label>
                <input
                  type="number"
                  id="peopleCount"
                  className="form-control"
                  min="100"
                  max="500"
                  placeholder="Enter number of people"
                  value={peopleCount}
                  onChange={handlePeopleChange}
                />
                {error && <small className="text-danger">{error}</small>}
              </div>

              {/* Display Total Price */}
              <h4>Total Price: Rs. {totalPrice}</h4>
              <div>
              {/* Pass peopleCount and totalPrice via state when navigating */}
              <Button
                variant="danger mt-2 ms-2"
                disabled={!peopleCount || error} // Disable button if input is invalid
              >
                
                <Link
                  to="/view"
                  state={{ peopleCount, totalPrice }}
                  style={{ color: "white", textDecoration: "none" }}
                >
                  View Items
                </Link>
              </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Feastpack;