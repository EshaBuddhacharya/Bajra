const User = require("../models/users")
const Order = require("../models/order")
const GetUserAvatar = require("../utils/getUserAvatar")

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
        .sort({ createdAt: -1, orderStatus: 1 })
        .catch(err => {
            console.error("Error retrieving user's order:", err);
            return res.status(500).send("Error retrieving user order");
        });
    return res.send(userOrder)
}

const cancelOrder = async (req, res) => {
    console.log("POST /api/order/cancelOrder")
    const orderId = req.body.orderId

    // verifying orderId exists
    if (!orderId) {
        return res.status(400).send({ message: 'No order id provided' })
    }

    // retriving userOrdrer from database
    try {
        const userOrder = await Order.findOne({ _id: orderId })
        if (!userOrder) {
            return res.status(404).send({ message: 'Order not found' })
        }
        userOrder.orderStatus = 'canceled'
        await userOrder.save()
        return res.status(200).send({ message: 'Order canceled successfully' })
    }
    catch (error) {
        return res.status(500).send({ message: 'Error retriving user order' })
    }

}

const getDeliveryCost = (req, res) => {
    console.log('GET /api/order/getDeliveryCost')
    return res.send(150)
}

const getAllOrders = async (req, res) => {
    console.log("GET /api/order/getAllOrders")
    try {
        const orders = await Order.find()
            .select('user deliveryLocation orderStatus createdAt items additionalInstructions')
            .populate({
                path: 'user',
                select: 'name phone'
            })
            .populate({
                path: 'items.menuItem',
                select: 'name'
            });

        return res.send(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).send("Error fetching order data");
    }
};

const updateOrderStatus = async (req, res) => {
    console.log("PUT /api/order/updateorderStatus")
    const { order_id, status } = req.body;

    // validating
    if (!order_id || !status) {
        return res.status(400).send("req should contain order_id and status")
    }

    try {
        await Order.updateOne({ _id: order_id },
            { $set: { orderStatus: status } })

        return res.status(200).send("Order Status updated successfully")
    }
    catch (error) { return res.status(500).send("Error updating order status", error) }
}

const deleteOrder = async (req, res) => {
    console.log("DELETE /api/order/deleteOrder")
    // extracting order_id
    const order_id = req.params.id;

    try {
        const result = await Order.deleteOne({ _id: order_id });
        if (result.deletedCount === 0) {
            return res.status(404).send("Order not found");
        }
        return res.send("Order deleted successfully");
    }
    catch (error) {
        return res.status(500).send("Error deleting order");
    }
};

const getSalesData = async (req, res) => {
    console.log("GET /api/order/getSalesData")
    // This function is not implemented yet

    // calculate total sales
    const orders = await Order.find().populate('items.menuItem')
    const total = orders.reduce((sum, order) => {
        if (order.orderStatus === 'completed') {
            return sum + order.total
        }
        return sum;
    }, 0)

    // calculate daily sales
    today = Date.now()
    const dailySales = orders.reduce((sum, order) => {
        if (new Date(order.createdAt).toDateString() === new Date(today).toDateString()) {
            if (order.orderStatus === 'completed') {
                return sum + order.total
            }
        }
        return sum;
    }, 0)

    // calculate sales by category 
    sales_by_category = {
        "Nonveg": 0,
        "Desserts": 0,
        "Veg": 0,
        "Drinks": 0,
    }
    orders.forEach(order => {
        order.items.forEach(item => {
            const category = item.menuItem.category
            if (!sales_by_category[category]) {
                sales_by_category[category] = 0
            }

            if (order.orderStatus === 'completed') {
                sales_by_category[category] += item.selectedType.price * item.quantity
            }
        })
    })
    formatedSalesByCategory = []
    Object.entries(sales_by_category).forEach(([key, value]) => {
        formatedSalesByCategory.push({
            category: key,
            sales: value
        })
    });

    // calculate monthly sales
    const monthlySales = {}
    // Initialize all months with zero
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    months.forEach(month => {
        monthlySales[month] = 0
    })

    // Add sales data for months that have orders
    orders.forEach(order => {
        if (order.orderStatus === 'completed') {
            const orderDate = new Date(order.createdAt);
            const currentYear = new Date().getFullYear();
            if (orderDate.getFullYear() === currentYear) {
                const month = orderDate.toLocaleString('default', { month: 'short' });
                monthlySales[month] += order.total;
            }
        }
    })
    formatedMonthlySales = []
    Object.entries(monthlySales).forEach(([key, value]) => {
        formatedMonthlySales.push({
            month: key,
            sales: value
        })
    });

    // prepare the response object
    const salesData = {
        total,
        dailySales,
        salesByCategory: formatedSalesByCategory,
        monthlySales: formatedMonthlySales
    }

    // return response
    return res.send(salesData);
}

const getRecentOrders = async (req, res) => {
    console.log("GET /api/order/getRecentOrders")
    try {
        const recentOrders = await Order.find()
            .sort({ createdAt: -1 })
            .limit(3)
            .populate('user', 'name phone firebaseUid')
            .populate('items.menuItem', 'name price')
            .lean();

        for (const order of recentOrders) {
            order.user.imageUrl = await GetUserAvatar(order.user.firebaseUid);
        }

        return res.send(recentOrders);
    } catch (error) {
        console.error("Error fetching recent orders:", error);
        res.status(500).send("Error fetching recent orders");
    }
}
module.exports = {
    addOrder,
    getAddress,
    getOrders,
    getDeliveryCost,
    cancelOrder,
    getAllOrders,
    updateOrderStatus,
    deleteOrder,
    getSalesData,
    getRecentOrders
}