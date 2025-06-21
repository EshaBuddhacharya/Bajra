const mongoose = require('mongoose')

// Order Schema
const FeastOrderSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    peopleCount: {
      type: Number,
      required: true
    },
    compulsoryItems: [
      {
        item: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'feastItem',
          required: true
        },
        selectedSubType: {
          type: String
        }
      }
    ],
    additionalItems: [
      {
        item: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'feastItem',
          required: true
        },
        pricePerPerson: {
          type: Number,
          required: true
        }
      }
    ],
    desserts: [
      {
        item: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'feastItem',
          required: true
        },
        pricePerPerson: {
          type: Number,
          required: true
        }
      }
    ],
    basePricePerPlate: {
      type: Number,
      required: true
    },
    deliveryCharge: {
      type: Number,
      required: true
    },
    totalPrice: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      default: 'pending',
      enum: ['pending', 'confirmed', 'delivered']
    }, 
    additionalInstruction: {
      type: String,
      default: ''
    },
    deliveryLocation: {
      type: String,
      default: ''
    },
    deliveryDate: {
      type: Date,
      default: Date.now
    }
  });
  
  const FeastOrder = mongoose.model('FeastOrder', FeastOrderSchema);

  module.exports = FeastOrder;