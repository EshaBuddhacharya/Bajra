const mongoose = require('mongoose');

// FoodItem Schema
const feastItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['compulsory', 'additional', 'dessert']
  },
  subTypes: {
    type: [String],
    default: []
  },
  pricePerPerson: {
    type: Number,
    required: function() {
      return this.category === 'additional' || this.category === 'dessert';
    }
  },
  image: {
    type: String
  }
});

const FeastItem = mongoose.model('feastItem', feastItemSchema);



module.exports = FeastItem;