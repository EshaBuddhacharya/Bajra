import { ShoppingBasket, Minimize2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCart } from './CartContext';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';
import { Dialog, Button, Flex } from '@radix-ui/themes';
import { motion, useAnimation, AnimatePresence } from 'framer-motion'; // eslint-disable-line no-unused-vars

export default function HoveringCart() {
  const [isClicked, setIsClicked] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    deliveryAddress: '',
    additionalInstructions: '',
  });

  const { cart, removeFromCart, setCart } = useCart();
  const { axiosInstance } = useAuth();
  const controls = useAnimation();
  const totalItems = cart?.length || 0; // getting number of items in cart

  useEffect(() => {
    controls.start({
      scale: [0.9, 1],
      transition: {
        duration: 0.8,
        type: "spring",
        bounce: 0.8,
      },
    });
  }, [cart, controls])

  useEffect(() => {
    axiosInstance
      .get('/api/order/getAddress')
      .then((response) => {
        setFormData((prev) => ({ ...prev, deliveryAddress: response.data }));
      })
      .catch((err) => console.log('Error retrieving user address:', err));
  }, [axiosInstance]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getTotalPrice = () => {
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const deliveryCharge = 150; // Delivery charge
    return totalPrice + deliveryCharge; // Add the delivery charge to the total price
  };

  const renderHeader = () => (
    <>
      <div className="d-flex justify-content-between align-items-center px-3 pt-2 pb-0">
        <div className='d-flex gap-2'>
          <ShoppingBasket height='25px' width='20px' />
          <h5 className="p-0 m-0">Cart</h5>
        </div>
        <div
          onClick={() => setIsClicked(false)}
          style={{ cursor: 'pointer' }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#dc3545'}
          onMouseLeave={(e) => e.currentTarget.style.color = ''}
        >
          <Minimize2 height="18px" width="18px" />
        </div>
      </div>
      <hr className="my-2" />
    </>
  );

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const deliveryAddress = e.target.elements.deliveryAddress.value;
      if (!deliveryAddress.trim()) {
        toast.error('Please enter a delivery address');
        return;
      }
      const response = await axiosInstance.post(`/api/order/addOrder`, { items: cart, ...formData });
      console.log(response); // Debugging

      // Remove cart items after success
      setCart([]);
      localStorage.removeItem('cart');
      toast.success('Order submitted successfully');
    } catch (error) {
      console.log(error); // Debugging
      toast.error('Failed to submit order');
    } finally {
      setIsDialogOpen(false); // Close the dialog
    }
  };

  const renderCartSummary = () => (
    <div className="mt-3">
      <h6>Delivery Charge: Rs 150</h6>
      <h5>Grand Total: Rs {getTotalPrice()}</h5>
      <hr className="my-2" />
      <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <Dialog.Trigger>
          <button className="btn btn-danger" style={{ width: '100%' }}>
            Confirm Order
          </button>
        </Dialog.Trigger>
        <Dialog.Content maxWidth="450px">
          <Dialog.Title>Confirm Your Order</Dialog.Title>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="deliveryAddress" className="form-label">
                Delivery Address <span className="text-danger">*</span>
              </label>
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
              <label htmlFor="additionalInstructions" className="form-label">
                Additional Instructions
              </label>
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
  );

  const renderCartItem = (item) => (
    <AnimatePresence mode="popLayout">
      <motion.div
        key={item.name + item.selectedType}
        className="card rounded"
        style={{ width: '100%', border: 'none' }}
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: -20 }}
        transition={{ duration: 0.15 }}
        layout
      >
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-md-4 p-0" style={{ height: '100px', width: '108px', overflow: 'hidden' }}>
            <img
              src={item.image}
              className="img-fluid"
              alt={item.name}
              style={{ height: '100%', width: '100%', objectFit: 'cover', borderRadius: '20%' }}
            />
          </div>
          <div className="col-md-8 p-0">
            <div className="card-body px-3 py-2">
              <h6 className="card-title text-sm">
                {item.name} ({item.selectedType})
              </h6>
              <p className="card-text m-0" style={{ fontSize: '12px' }}>Price: Rs {item.price}</p>
              <p className="card-text m-0" style={{ fontSize: '12px' }}>Quantity: {item.quantity}</p>
              <motion.button
                onClick={() => removeFromCart(item)}
                className="btn btn-danger btn-sm mt-1"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.99 }}
              >
                Remove
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );

  const renderCard = () => (
    <div
      className="d-flex flex-column"
      style={{
        position: 'fixed',
        bottom: '0.5rem',
        right: '1rem',
        backgroundColor: 'white',
        padding: '10px',
        height: '26rem',
        width: '23rem',
        borderRadius: '5%',
        boxShadow: '0 2px 5px rgba(0,0,0,0.4)',
        overflowY: 'auto',
        flexDirection: 'column',
      }}
    >
      {renderHeader()}
      <div
        style={{
          flexGrow: 1,
          overflowY: 'scroll',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <style>
          {`
            div::-webkit-scrollbar {
              display: none;
            }
          `}
        </style>
        {cart.length === 0 ? (
          <div className="text-center">
            <h6>Your cart is empty</h6>
          </div>
        ) : (
          <motion.div>
            {cart.map(renderCartItem)}
            {renderCartSummary()}
          </motion.div>
        )}
      </div>
    </div>
  );

  const renderBasket = () => (
    <motion.div
      className="d-md-block"
      onClick={() => setIsClicked(true)}
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '3rem',
        backgroundColor: 'white',
        padding: '10px',
        borderRadius: '50%',
        boxShadow: '0 2px 5px rgba(0,0,0,0.4)',
        cursor: 'pointer',
      }}
      animate={controls}
    >
      <ShoppingBasket />
      <span
        className="position-absolute translate-middle badge rounded-pill text-white"
        style={{
          top: '3px',
          right: '-16px',
          backgroundColor: '#Dc3545'
        }}
      >
        {totalItems}
      </span>
    </motion.div>
  );

  return <>{isClicked ? renderCard() : renderBasket()}</>;
}