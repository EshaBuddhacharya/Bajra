const express = require("express")
const router = express.Router()
const {submitFeedback}  = require("../controllers/feedbackController")
const verifyFirebaseToken = require("../firebase/authMiddleware") 

router.post("/submitFeedback", verifyFirebaseToken, submitFeedback)

module.exports = router