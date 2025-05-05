const verifyFirebaseToken  = require("../firebase/authMiddleware")
const express = require('express')
const  { addOrder, getAddress, getOrders, getDeliveryCost, cancelOrder } = require("../controllers/orderController")

const router = express.Router(); 

router.post('/addOrder', verifyFirebaseToken,  addOrder)
router.post('/cancelOrder', verifyFirebaseToken,  cancelOrder)
router.get('/getAddress', verifyFirebaseToken, getAddress)
router.get('/getOrders', verifyFirebaseToken, getOrders)
router.get('/getDeliveryCost', verifyFirebaseToken, getDeliveryCost)

module.exports = router; 