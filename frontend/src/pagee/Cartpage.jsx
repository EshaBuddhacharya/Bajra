import React, { useEffect, useState } from "react";
import { useCart } from "../component/CartContext";
import { Link } from "react-router-dom";
import Navbar from "../component/Navbar";
import { toast } from 'react-toastify'
import { useAuth } from "../contexts/AuthContext";
import { Dialog, Button, Flex, TextField } from '@radix-ui/themes'

const CartPage = () => {
  const { cart, removeFromCart, setCart } = useCart();
  const { axiosInstance } = useAuth()
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const [formData, setFormData] = useState({
    deliveryAddress: '',
    additionalInstructions: ''
  });
  useEffect(() => {
    axiosInstance.get('/api/order/getAddress')
    .then(response => { setFormData(prev => ({...prev, deliveryAddress: response.data})); console.log(response.body) })
    .catch(err => console.log("Error retriving user address:", err))
  }, [axiosInstance])
  

  const getTotalPrice = () => {
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const deliveryCharge = 150; // Delivery charge
    return totalPrice + deliveryCharge; // Add the delivery charge to the total price
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const deliveryAddress = e.target.elements.deliveryAddress.value;
      if (!deliveryAddress.trim()) {
        toast.error("Please enter a delivery address");
        return;
      }
      const response = await axiosInstance.post(`/api/order/addOrder`, { items: cart, ...formData})
      console.log(response) //debuggin

      // removing cart items after succcess 
      setCart([])
      localStorage.removeItem('cart')
      toast.success("Order submitted successfully")
    } catch (error) {
      console.log(error) // debugging
      toast.error("Failed to submit order")
    } finally {
      setIsDialogOpen(false); // Close the dialog 
    }
  }

  return (
    <div>
      <Navbar className="sticky" />

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
            <h5>Delivery Charge: Rs 150</h5>
            <h4>Grand Total: Rs {getTotalPrice()}</h4>
            <div className="d-flex mt-4">
              <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <Dialog.Trigger>
                  <button className="btn btn-danger" style={{ width: "200px" }}>
                    Confirm Order
                  </button>
                </Dialog.Trigger>
                <Dialog.Content maxWidth="450px">
                  <Dialog.Title>Confirm Your Order</Dialog.Title>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="deliveryAddress" className="form-label">Delivery Address <span className="text-danger">*</span></label>
                      <input
                        type="text"
                        className="form-control"
                        id="deliveryAddress"
                        name="deliveryAddress"
                        value={formData.deliveryAddress}
                        onChange={handleFormChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="additionalInstructions" className="form-label">Additional Instructions</label>
                      <textarea
                        className="form-control"
                        id="additionalInstructions"
                        name="additionalInstructions"
                        value={formData.additionalInstructions}
                        onChange={handleFormChange}
                      ></textarea>
                    </div>
                    <div className="p-3 border rounded">
                      <div>Delivery Charge: Rs 150</div>
                      <div>Total Charge: Rs {cart.reduce((total, item) => total + item.price * item.quantity, 0)}</div>
                      <div>Grand Total: Rs {getTotalPrice()}</div>
                    </div>
                    <Flex gap="3" mt="4" justify="end">
                      <Dialog.Close>
                        <Button variant="soft" color="gray" type="button">
                          Cancel
                        </Button>
                      </Dialog.Close>
                      <Button type="submit">Confirm</Button>
                    </Flex>
                  </form>
                </Dialog.Content>
              </Dialog.Root>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
