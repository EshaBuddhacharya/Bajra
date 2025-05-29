const users = require('../models/users')
const admin = require("../firebase/firebaseAdmin")
const getAllUsers = async (req, res) => {
    try {
        const allUsers = await users.find()
        return res.status(200).send(allUsers)

    }
    catch (error) {
        console.log("Error retriving user data")
        res.status(500).json({ message: "Error retriving users data" })
    }
}

const deleteUser = async (req, res) => {
    const user_id = req.params.id

    if (!user_id) {
        console.log("Delete performed without user_id")
        return res.status(400).send("must provide user id")
    }

    try {
        const user = await users.findById(user_id);
        if (!user) {
            return res.status(404).send("User not found");
        }
        
        const firebaseUid = user.firebaseUid;
        if (!firebaseUid) {
            return res.status(400).send("Firebase UID not found for this user");
        }

        // Step 3: Delete the user from Firebase Authentication using the Firebase UID
        await admin.auth().deleteUser(firebaseUid);
        await users.deleteOne({ _id: user_id })
        return res.send("User deleted successfully")
    }
    catch (error) {
        console.log("Error delete user", error)
        return res.status(500).send("Error deleting user")
    }
}

const updateRole = async (req, res) => {
    console.log("PUT /api/users/updateRole")
    const user_id = req.params.id
    const { role } = req.body

    if (!user_id || !role) {
        console.log("No item id or provided to update user role")
        return res.status(400).send("No item id or role provided")
    }

    try {
        await users.updateOne({ _id: user_id },
            { $set: { role: role } })

        return res.send("role updated successfully")
    }
    catch (error) {
        console.log("Error updating user role", error)
        return res.status(500).send("Error updating user role")
    }
}
module.exports = { getAllUsers, deleteUser, updateRole }