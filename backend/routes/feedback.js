const express = require("express")
const router = express.Router()
const {submitFeedback, getFeedbacks}  = require("../controllers/feedbackController")
const {verifyFirebaseToken, verifyAdminToken} = require("../firebase/authMiddleware") 

router.post("/submitFeedback", verifyFirebaseToken, submitFeedback)
router.get("/getFeedbacks", getFeedbacks)

module.exports = router