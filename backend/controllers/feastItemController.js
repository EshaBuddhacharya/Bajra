const FeastItem = require('../models/feastPackage');

// Get all feast items
exports.getAllFeastItems = async (req, res) => {
  try {
    console.log('GET /api/feast/items - Getting all feast items');
    const feastItems = await FeastItem.find();
    console.log(`Found ${feastItems.length} feast items`);
    res.status(200).json(feastItems);
  } catch (error) {
    console.error('Error getting all feast items:', error.message);
    res.status(500).json({ message: error.message });
  }
};

// Get feast items by category
exports.getFeastItemsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    console.log(`GET /api/feast/items/category/${category} - Getting feast items by category`);
    const feastItems = await FeastItem.find({ category });
    console.log(`Found ${feastItems.length} items in category: ${category}`);
    res.status(200).json(feastItems);
  } catch (error) {
    console.error(`Error getting feast items for category ${req.params.category}:`, error.message);
    res.status(500).json({ message: error.message });
  }
};

// Get a single feast item
exports.getFeastItem = async (req, res) => {
  try {
    console.log(`GET /api/feast/items/${req.params.id} - Getting single feast item`);
    const feastItem = await FeastItem.findById(req.params.id);
    if (!feastItem) {
      console.log(`Feast item not found with id: ${req.params.id}`);
      return res.status(404).json({ message: 'Feast item not found' });
    }
    console.log(`Found feast item: ${feastItem.name}`);
    res.status(200).json(feastItem);
  } catch (error) {
    console.error(`Error getting feast item ${req.params.id}:`, error.message);
    res.status(500).json({ message: error.message });
  }
};

// Create a new feast item
exports.createFeastItem = async (req, res) => {
  try {
    console.log('POST /api/feast/items - Creating new feast item');
    // Validate required fields
    const { name, category } = req.body;
    if (!name || !category) {
      console.log('Validation failed: Name and category are required');
      return res.status(400).json({ message: 'Name and category are required' });
    }

    // Validate category enum values
    if (!['compulsory', 'additional', 'dessert'].includes(category)) {
      console.log(`Validation failed: Invalid category value - ${category}`);
      return res.status(400).json({ message: 'Invalid category value' });
    }

    // Validate pricePerPerson for additional and dessert items
    if ((category === 'additional' || category === 'dessert') && !req.body.pricePerPerson) {
      console.log('Validation failed: Price per person required for additional/dessert items');
      return res.status(400).json({ message: 'Price per person is required for additional and dessert items' });
    }

    const newFeastItem = new FeastItem(req.body);
    const savedFeastItem = await newFeastItem.save();
    console.log(`Successfully created feast item: ${savedFeastItem.name}`);
    res.status(201).json(savedFeastItem);
  } catch (error) {
    console.error('Error creating feast item:', error.message);
    res.status(400).json({ message: error.message });
  }
};

// Update a feast item
exports.updateFeastItem = async (req, res) => {
  try {
    console.log(`PUT /api/feast/items/${req.params.id} - Updating feast item`);
    const updatedFeastItem = await FeastItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedFeastItem) {
      console.log(`Feast item not found with id: ${req.params.id}`);
      return res.status(404).json({ message: 'Feast item not found' });
    }
    console.log(`Successfully updated feast item: ${updatedFeastItem.name}`);
    res.status(200).json(updatedFeastItem);
  } catch (error) {
    console.error(`Error updating feast item ${req.params.id}:`, error.message);
    res.status(400).json({ message: error.message });
  }
};

// Delete a feast item
exports.deleteFeastItem = async (req, res) => {
  try {
    console.log(`DELETE /api/feast/items/${req.params.id} - Deleting feast item`);
    const deletedFeastItem = await FeastItem.findByIdAndDelete(req.params.id);
    if (!deletedFeastItem) {
      console.log(`Feast item not found with id: ${req.params.id}`);
      return res.status(404).json({ message: 'Feast item not found' });
    }
    console.log(`Successfully deleted feast item: ${deletedFeastItem.name}`);
    res.status(200).json({ message: 'Feast item deleted successfully' });
  } catch (error) {
    console.error(`Error deleting feast item ${req.params.id}:`, error.message);
    res.status(500).json({ message: error.message });
  }
};
