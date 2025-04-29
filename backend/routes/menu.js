const express = require('express')
const { insertItem, getItems } = require("../controllers/menuController")

const router = express.Router()

router.post("/insertItem", insertItem)
router.get('/getItems', getItems)
module.exports = router;