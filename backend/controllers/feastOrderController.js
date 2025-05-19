const Order = require('../models/feastOrder');
const User = require('../models/users');

// Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('compulsoryItems.item')
      .populate('additionalItems.item')
      .populate('desserts.item');
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error getting all orders:', error.message);
    res.status(500).json({ message: error.message });
  }
};

// Get user's orders
exports.getUserOrders = async (req, res) => {
    try {
      const user_id = req.user.user_id;
      const user = await User.findOne({ firebaseUid: user_id }).catch(err => {
        console.error("Error retrieving user:", err);
        return res.status(500).send("Error retrieving user");
      });

      const userOrders = await Order.find({ user: user._id })
        .populate('compulsoryItems.item')
        .populate('additionalItems.item')
        .populate('desserts.item')
        .sort({ createdAt: -1, status: 1 })
        .catch(err => {
          console.error("Error retrieving user's orders:", err);
          return res.status(500).send("Error retrieving user orders");
        });

      return res.status(200).json(userOrders);
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: error.message });
    }
};

// Get a single order by ID
// exports.getOrderById = async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id)
//       .populate('compulsoryItems.item')
//       .populate('additionalItems.item')
//       .populate('desserts.item');
//     if (!order) {
//       return res.status(404).json({ message: 'Order not found' });
//     }
//     res.status(200).json(order);
//   } catch (error) {
//     console.error('Error getting order by ID:', error.message);
//     res.status(500).json({ message: error.message });
//   }
// };

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    console.log("POST /api/feast/orders/createOrder");
    const { peopleCount, compulsoryItems, additionalItems, desserts, basePricePerPlate, deliveryCharge, totalPrice } = req.body;
    const user = req.user;

    // Find MongoDB user using Firebase UID
    const dbUser = await User.findOne({ firebaseUid: user.user_id });
    if (!dbUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Validate required fields
    if (!peopleCount || !compulsoryItems || !basePricePerPlate || !deliveryCharge || !totalPrice) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Create new order object
    const newOrder = new Order({
      user: dbUser._id,
      peopleCount,
      compulsoryItems,
      additionalItems,
      desserts,
      basePricePerPlate,
      deliveryCharge,
      totalPrice
    });

    const savedOrder = await newOrder.save();

    // Populate the saved order with referenced items
    const populatedOrder = await Order.findById(savedOrder._id)
      .populate('compulsoryItems.item')
      .populate('additionalItems.item')
      .populate('desserts.item');

    res.status(201).json(populatedOrder);
  } catch (error) {
    console.error('Error creating feast order:', error.message);
    res.status(400).json({ message: error.message });
  }
};

// Update an order
exports.updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
      .populate('compulsoryItems.item')
      .populate('additionalItems.item')
      .populate('desserts.item');

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error('Error updating order:', error.message);
    res.status(400).json({ message: error.message });
  }
};

// Delete an order
exports.deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Error deleting order:', error.message);
    res.status(500).json({ message: error.message });
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!['pending', 'confirmed', 'delivered'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    )
      .populate('compulsoryItems.item')
      .populate('additionalItems.item')
      .populate('desserts.item');

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error('Error updating order status:', error.message);
    res.status(400).json({ message: error.message });
  }
};
