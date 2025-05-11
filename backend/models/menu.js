const mongoose = require('mongoose');

const foodTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    }
})

const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: String,
    category: { type: String, required: true },
    portion: String,
    imgUrl: String,
    types: [foodTypeSchema]
})

const menu = new mongoose.model('menu', menuSchema)

module.exports = menu 