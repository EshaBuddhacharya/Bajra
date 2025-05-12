const express = require('express')
const menuController = require("../controllers/menuController")
const {verifyAdminToken} = require('../firebase/authMiddleware')
const router = express.Router()

router.post("/insertItem", menuController.insertItem)
router.get('/getItems', menuController.getItems)
router.get('/getCategories', menuController.getCategories)
router.delete('/deleteItem/:id', verifyAdminToken, menuController.deleteItem)
router.put("/editItem/:id", verifyAdminToken, menuController.editItem)

module.exports = router;