// routes/user.js
const express = require('express');
const { registerController,signInController, isAuthenticatedController, logoutController, refreshTokenController } = require('../controllers/authController');

// router object
const router = express.Router();

// Define routes
router.post("/register", registerController)
router.post("/signin", signInController)
router.get("/isAuthenticated", isAuthenticatedController)
router.post("/logout", logoutController)
router.post("/refresh", refreshTokenController)

module.exports = router;
