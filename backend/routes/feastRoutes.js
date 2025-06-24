const express = require('express');
const router = express.Router();
const feastItemController = require('../controllers/feastItemController');
const feastOrderController = require('../controllers/feastOrderController');
const {verifyFirebaseToken, verifyAdminToken} = require("../firebase/authMiddleware")

// Feast Item routes
router.get('/items', feastItemController.getAllFeastItems);
router.get('/items/category/:category', feastItemController.getFeastItemsByCategory);
router.get('/items/:id', feastItemController.getFeastItem);
router.post('/items', feastItemController.createFeastItem);
router.put('/items/:id', feastItemController.updateFeastItem);
router.delete('/items/:id', feastItemController.deleteFeastItem);

// Feast Order routes
router.get('/orders', verifyAdminToken, feastOrderController.getAllOrders);
// router.get('/orders/:id', feastOrderController.getOrderById);
router.post('/orders', verifyFirebaseToken, feastOrderController.createOrder);
router.put('/orders/:id', verifyAdminToken, feastOrderController.updateOrder);
router.delete('/orders/:id', verifyAdminToken, feastOrderController.deleteOrder);
router.put('/orders/:id/status', verifyAdminToken, feastOrderController.updateOrderStatus);
router.get('/orders/getUserOrders', verifyFirebaseToken, feastOrderController.getUserOrders);

module.exports = router;
