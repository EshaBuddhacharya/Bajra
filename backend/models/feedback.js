const mongoose = require('mongoose')

const feedbackSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        require: true,
    }, 
    feedback: String, 
    createdAt: {
        type: Date,
        default: Date.now 
    }
})

const feedback = new mongoose.model('Feedback', feedbackSchema)

module.exports = feedback