const mongoose = require('mongoose');
const menu = require('./menu'); // Import the menu model

const itemSchema = new mongoose.Schema({
    menuItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'menu',
        required: true
    },
    selectedType: {
        name: String,
        price: Number
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
   
});

const orderSchema = new mongoose.Schema({
    items: [itemSchema],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    deliveryLocation: String,
    additionalInstructions: String,
    orderStatus: {
        type: String,
        enum: ['pending', 'inprogress', 'in delivery', 'completed', 'canceled'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
