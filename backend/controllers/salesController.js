const Order = require("../models/order")
const GetUserAvatar = require("../utils/getUserAvatar")
const FeastOrder = require("../models/feastOrder")

const getSalesData = async (req, res) => {
    console.log("GET /api/order/getSalesData")
    // This function is not implemented yet

    // calculate total sales
    const orders = await Order.find().populate('items.menuItem')
    const feastOrders = await FeastOrder.find().populate('compulsoryItems.item additionalItems.item desserts.item')

    let total = orders.reduce((sum, order) => {
        if (order.orderStatus === 'completed') {
            return sum + order.total
        }
        return sum;
    }, 0)
    total += feastOrders.reduce((sum, order) => {
        if (order.status === 'completed') {
            return sum + order.totalPrice
        }
        return sum;
    }, 0)

    // calculate daily sales
    today = Date.now()
    let dailySales = orders.reduce((sum, order) => {
        if (new Date(order.createdAt).toDateString() === new Date(today).toDateString()) {
            if (order.orderStatus === 'completed') {
                return sum + order.total
            }
        }
        return sum;
    }, 0)
    dailySales += feastOrders.reduce((sum, order) => {
        if (new Date(order.deliveryDate).toDateString() === new Date(today).toDateString()) {
            if (order.status === 'completed') {
                return sum + order.totalPrice
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
        const recentOrders = await Order.aggregate([
            {
                $addFields: {
                    total: {
                        $reduce: {
                            input: "$items",
                            initialValue: 0,
                            in: {
                                $add: [
                                    "$$value",
                                    {
                                        $multiply: [
                                            "$$this.quantity",
                                            { $ifNull: ["$$this.selectedType.price", 0] }
                                        ]
                                    }
                                ]
                            }
                        }
                    }
                }
            },
            { $sort: { createdAt: -1 } },
            { $limit: 3 }
        ]).exec();

        await Order.populate(recentOrders, [
            { path: 'user', select: 'name phone firebaseUid' },
            { path: 'items.menuItem', select: 'name price' }
        ]);

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
    getSalesData,
    getRecentOrders
}