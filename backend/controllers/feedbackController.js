const Feedback = require('../models/feedback')
const User = require('../models/users')

const submitFeedback = async (req, res) => { 
    const { feedback } = req.body
    const user = req.user

    // getting user
    const dbUser = await User.findOne({ firebaseUid: user.user_id }) 

    // savining feedback 
    try {
        const userFeedback = new Feedback({
            user: dbUser,
            feedback: feedback
        })
        await userFeedback.save()

        return res.send("User Feedback Saved Successfully")
    }
    catch (error) { 
        return res.status(500).send("Failed to save user feedback")
    }
}
const getFeedbacks = async (req, res) => {
    try { 
        const feedbacks = await Feedback.find({}).populate('user')
        return res.status(200).send({feedbacks})
    }
    catch (error) { 
        console.log(error)
        return res.status(500).send("Error getting user feedback")
    }
}
module.exports = {submitFeedback, getFeedbacks}