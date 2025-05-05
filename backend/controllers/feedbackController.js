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

module.exports = {submitFeedback}