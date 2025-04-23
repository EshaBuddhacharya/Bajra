import React from "react";
import { useCart } from "../component/CartContext";
import { Link } from "react-router-dom";
import Navbar from "../component/Navbar";

const CartPage = () => {
  const { cart, removeFromCart } = useCart();

  const getTotalPrice = () => {
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const deliveryCharge = 150; // Delivery charge
    return totalPrice + deliveryCharge; // Add the delivery charge to the total price
  };

  return (
    <div>
      <Navbar className= "sticky"/>
      
      {cart.length === 0 ? (
        <div className="text-center">
          <div className="empty-cart-box">
            <h1 className="cartempty">Your cart is empty</h1>
          </div>
        </div>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.name + item.selectedType} className="card mb-3" style={{ width: "90%", margin: "auto" }}>
              <div className="row g-0">
                <div className="col-md-4" style={{ height: "300px", overflow: "hidden" }}>
                  <img 
                    src={item.image} 
                    className="img-fluid rounded-start" 
                    alt={item.name} 
                    style={{ height: "100%", width: "100%", objectFit: "cover" }} 
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{item.name} ({item.selectedType})</h5>
                    <p className="card-text">Price: Rs {item.price}</p>
                    <p className="card-text">Quantity: {item.quantity}</p>
                    <p className="card-text">Total: Rs {item.price * item.quantity}</p>
                    <div className="d-flex justify-content-end">
                      <button onClick={() => removeFromCart(item)} className="btn btn-danger">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Display delivery charge and total only when cart is not empty */}
          <div className="container sticky-bottom-price">
            <h5>Delivery Charge: Rs 150</h5> {/* Display the delivery charge */}
            <h4>Grand Total: Rs {getTotalPrice()}</h4>
            <div className="d-flex mt-4">
              <Link to="/confirmm">
                <button className="btn btn-danger" style={{ width: "200px" }}>
                  Confirm Order
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
