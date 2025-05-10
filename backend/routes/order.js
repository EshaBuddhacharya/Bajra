const verifyFirebaseToken  = require("../firebase/authMiddleware")
const express = require('express')
const orderController = require("../controllers/orderController")
const router = express.Router(); 

router.post('/addOrder', verifyFirebaseToken, orderController.addOrder)
router.post('/cancelOrder', verifyFirebaseToken, orderController.cancelOrder)
router.get('/getAddress', verifyFirebaseToken, orderController.getAddress)
router.get('/getOrders', verifyFirebaseToken, orderController.getOrders)
router.get('/getDeliveryCost', verifyFirebaseToken, orderController.getDeliveryCost)
router.get('/getAllOrders', orderController.getAllOrders)
router.put('/updateOrderStatus', orderController.updateOrderStatus)
router.delete('/deleteOrder/:id', orderController.deleteOrder)

module.exports = router; 
