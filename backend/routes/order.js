const {verifyFirebaseToken, verifyAdminToken}  = require("../firebase/authMiddleware")
const express = require('express')
const orderController = require("../controllers/orderController")
const router = express.Router(); 

router.post('/addOrder', verifyFirebaseToken, orderController.addOrder)
router.post('/cancelOrder', verifyFirebaseToken, orderController.cancelOrder)
router.get('/getAddress', verifyFirebaseToken, orderController.getAddress)
router.get('/getOrders', verifyFirebaseToken, orderController.getOrders)
router.get('/getDeliveryCost', verifyFirebaseToken, orderController.getDeliveryCost)
router.get('/getAllOrders', verifyAdminToken, orderController.getAllOrders)
router.put('/updateOrderStatus', verifyAdminToken, orderController.updateOrderStatus)
router.delete('/deleteOrder/:id',verifyAdminToken, orderController.deleteOrder)

module.exports = router; 
