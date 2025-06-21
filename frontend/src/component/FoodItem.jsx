import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { AuthContext } from '../contexts/AuthContext';

const FoodItem = ({ name, imgUrl, description, types, desc: portion, addToCart, _id, index }) => {
  // Build full image URL using environment variable
  const imageSrc = `${import.meta.env.VITE_BACKEND_BASE_URL}${imgUrl}`;

  // Initialize selected type, price, and quantity states
  const [selectedType, setSelectedType] = useState(types[0].name);
  const [price, setPrice] = useState(types[0].price);
  const [quantity, setQuantity] = useState(1);
  const controls = useAnimation() // hover effect control for image scale

  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleTypeChange = (type) => {
    setSelectedType(type.name);
    setPrice(type.price);
  };

  /**
   * Adds the current item to the cart, checking for authentication and duplicates.
   */
  const handleAddToCart = () => {
    if (!isAuthenticated) {
      navigate('/signin');
      return;
    }

    addToCart({
      _id,
      name,
      selectedType,
      price,
      quantity,
      image: imageSrc,
    });
  }

  /**
   * Increment quantity by 1.
   */
  const increaseQuantity = () => setQuantity((q) => q + 1);

  /**
   * Decrement quantity by 1, not going below 1.
   */
  const decreaseQuantity = () => setQuantity((q) => Math.max(1, q - 1));

  return (
    <motion.div
      key={_id || index} // Prefer item.id for uniqueness, fallback to index
      initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }} // Start blurred and scaled down
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }} // Remove blur and scale up
      exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
      transition={{ duration: 0.3 }} // Animation duration of 0.3 seconds
      layout // Enable layout animations for this item
    >
      <motion.div
        className="col"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="card h-100"
          onHoverStart={() => controls.start({ scale: 1.05 })}
          onHoverEnd={() => controls.start({ scale: 1 })}
        >
          <div className='card-img-top overflow-hidden'>
            <motion.img
              src={imageSrc}
              className="w-100 h-100"
              style={{ objectFit: 'cover', height: '200px' }}
              animate={controls}
              alt={name} />
          </div>
          <div className="card-body d-flex flex-column justify-content-between">
            <h4 className="card-title">{name}</h4>

            {description && <p className="card-text">{description}</p>}

            <ul className="list-unstyled mb-2" style={{ minHeight: '3rem' }}>
              {types.map((type) => (
                <li key={type.name}>
                  {type.name}: Rs {type.price}
                </li>
              ))}
            </ul>

            {portion && <p className="card-text fw-bold">{portion}</p>}

            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="btn btn-light border-danger">
                Total: Rs {price * quantity}
              </span>
              <div className="d-flex align-items-center">
                <button
                  className="btn btn-outline-danger"
                  style={{ width: 40, height: 40, borderRadius: 8 }}
                  onClick={decreaseQuantity}
                >
                  -
                </button>
                <span className="mx-2">{quantity}</span>
                <button
                  className="btn btn-outline-danger"
                  style={{ width: 40, height: 40, borderRadius: 8 }}
                  onClick={increaseQuantity}
                  disabled={quantity >= 10} // Limit max quantity to 10
                >
                  +
                </button>
              </div>
            </div>

            <div className="d-flex justify-content-between align-items-center">
              <div className="dropdown me-2" style={{ position: 'relative', zIndex: 9999 }}>
                <button
                  className="btn btn-dark dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Type: {selectedType} 
                </button>
                <ul className="dropdown-menu" style={{ position: 'absolute', zIndex: 9999999999999 }}>
                  {types.map((type) => (
                    <li key={type.name}>
                      <button
                        className="dropdown-item"
                        type="button"
                        onClick={() => handleTypeChange(type)}
                      >
                        {type.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <motion.button
                className="btn btn-danger"
                style={{ width: 120 }}
                onClick={handleAddToCart}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.99 }}
              >
                Add to Cart
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

FoodItem.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
  description: PropTypes.string,
  desc: PropTypes.string,
  types: PropTypes.arrayOf(
    PropTypes.shape({ name: PropTypes.string, price: PropTypes.number })
  ).isRequired,
  addToCart: PropTypes.func.isRequired,
};

export default FoodItem;
