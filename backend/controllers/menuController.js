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
                res.status(400).json({ message: error.message });
            });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getCategories = async (req, res) => { 
    try { 
        const distinctCategories = await menu.distinct('category')
        return res.send({categories: distinctCategories})
    }
    catch (error) { 
        return res.status(500).send({message: "Error fetching distinct category from database"})
    }
}


module.exports = {
    getItems,
    insertItem,
    getCategories
}