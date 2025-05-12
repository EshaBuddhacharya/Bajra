const express = require("express")
const router = express.Router()
const {verifyAdminToken} = require("../firebase/authMiddleware")
const usersController = require('../controllers/userController')

router.get("/getAllUsers", verifyAdminToken, usersController.getAllUsers)
router.delete('/deleteUser/:id', verifyAdminToken, usersController.deleteUser)
router.put("/updateRole/:id", verifyAdminToken, usersController.updateRole)
module.exports = router