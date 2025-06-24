const salesController = require('../controllers/salesController');
const express = require('express');
const { verifyAdminToken } = require("../firebase/authMiddleware");

const router = express.Router();
router.get('/getSalesData', verifyAdminToken, salesController.getSalesData)
router.get('/getRecentOrders', verifyAdminToken, salesController.getRecentOrders)

module.exports = router;