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
        required: true,
        onDelete: 'cascade'
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
// Corrected virtual for calculating total
orderSchema.virtual('total').get(function () {
    let sum = 0;
    for (const item of this.items) {
        const price = item.selectedType?.price || 0;
        sum += item.quantity * price;
    }
    return sum;
});

// Ensure virtuals are included in JSON and object outputs
orderSchema.set('toObject', { virtuals: true });
orderSchema.set('toJSON', { virtuals: true });

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
