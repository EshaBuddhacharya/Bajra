const User = require("../models/users")
const Order = require("../models/order")

const addOrder = async (req, res) => {
    try {
        console.log("POST /api/order/addOrder")
        const { items, deliveryAddress, additionalInstructions } = req.body
        const user = req.user

        // Find MongoDB user using Firebase UID
        const dbUser = await User.findOne({ firebaseUid: user.user_id })
        if (!dbUser) {
            return res.status(404).json({ message: 'User not found' })
        }

        // Create new order object
        const order = new Order({
            items: items.map(item => ({
                menuItem: item._id,
                selectedType: {
                    name: item.selectedType,
                    price: item.price
                },
                quantity: item.quantity
            })),
            user: dbUser._id,
            deliveryLocation: deliveryAddress,
            additionalInstructions: additionalInstructions
        })

        // Save order to database
        const savedOrder = await order.save()
        res.status(201).json(savedOrder)

    } catch (error) {
        console.error('Error creating order:', error)
        res.status(500).json({ message: 'Error creating order' })
    }
}

const getAddress = async (req, res) => {
    console.log("GET /api/order/getAddress")
    const user_id = req.user.user_id

    User.findOne({ 'firebaseUid': user_id })
        .then(
            response => res.send(response.address)
        ).catch(err => {
            console.log("Error retriving user from database")
        })
}

const getOrders = async (req, res) => {
    console.log("GET /api/order/getOrders")
    const user_id = req.user.user_id
    const user = await User.findOne({ firebaseUid: user_id }).catch(err => {
        console.error("Error retrieving user:", err);
        return res.status(500).send("Error retrieving user");
    });

    const userOrder = await Order.find({ user }).populate('items.menuItem', 'name price description imgUrl')
    .sort({ createdAt: -1 })
    .catch(err => {
        console.error("Error retrieving user's order:", err);
        return res.status(500).send("Error retrieving user order");
    });
    return res.send(userOrder)
}
module.exports = { addOrder, getAddress, getOrders }