const verifyFirebaseToken  = require("../firebase/authMiddleware")
const express = require('express')
const  { addOrder, getAddress, getOrders } = require("../controllers/orderController")

const router = express.Router(); 

router.post('/addOrder', verifyFirebaseToken,  addOrder)
router.get('/getAddress', verifyFirebaseToken, getAddress)
router.get('/getOrders', verifyFirebaseToken, getOrders)

module.exports = router; 