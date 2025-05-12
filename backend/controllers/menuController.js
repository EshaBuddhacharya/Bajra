const menu = require('../models/menu')

const getItems = async (req, res) => {
    try {
        const items = await menu.find();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const insertItem = (req, res) => {
    console.log("POST /api/menu/insertItem")
    try {
        console.log("POST /api/menu/insertItem")
        const newItem = new menu({
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            portion: req.body.portion,
            imgUrl: req.body.imgUrl,
            types: req.body.types
        });

        newItem.save()
            .then(item => {
                res.status(201).json(item);
            })
            .catch(error => {
                console.log("Error saving into menu database", error)
                res.status(400).json({ message: error.message });
            });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
}

const editItem = async (req, res) => {
    console.log("PUT /api/menu/editItem")
    const menuId = req.params.id
    const { name, description, category, portion, imgUrl, types } = req.body
    if (!menuId || !name || !description || !category || !imgUrl || !types) {
        return res.status(400).json({ message: "Required fields missing" });
    }

    try {
        const requestedItem = await menu.findOne({ _id: menuId })
        if (!requestedItem) {
            return res.status(404).json({ message: "Menu item not found" });
        }

        requestedItem.name = name;
        requestedItem.description = description;
        requestedItem.category = category;
        requestedItem.portion = portion;
        requestedItem.imgUrl = imgUrl;
        requestedItem.types = types;

        await requestedItem.save();
        res.status(200).json(requestedItem);
    }
    catch (error) { 
        console.log(error)
        return res.status(500).json({message: "Error saving data into database"})
    }
}

const getCategories = async (req, res) => {
    try {
        const distinctCategories = await menu.distinct('category')
        return res.send({ categories: distinctCategories })
    }
    catch (error) {
        return res.status(500).send({ message: "Error fetching distinct category from database" })
    }
}

const deleteItem = async (req, res) => {
    console.log("DELETE /api/menu/deleteItem")
    // extracting order_id
    const menu_id = req.params.id;

    try {
        const result = await menu.deleteOne({ _id: menu_id });
        if (result.deletedCount === 0) {
            return res.status(404).send("Order not found");
        }
        return res.send("Order deleted successfully");
    }
    catch (error) {
        return res.status(500).send("Error deleting order");
    }
}

module.exports = {
    getItems,
    insertItem,
    getCategories,
    deleteItem,
    editItem,
}