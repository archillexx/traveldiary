const Category = require('../models/category');

// Get all categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new category
const addCategory = async (req, res) => {
  const { name, description } = req.body;

  try {
    const newCategory = await Category.create({ name, description });
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a category
const updateCategory = async (req, res) => {
  const { categoryId } = req.params;
  const { name, description } = req.body;

  try {
    const category = await Category.findById(categoryId);
    if (!category) return res.status(404).json({ message: 'Category not found' });

    category.name = name;
    category.description = description;
    const updatedCategory = await category.save();

    res.json(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a category
const deleteCategory = async (req, res) => {
  const { categoryId } = req.params;

  try {
    const category = await Category.findById(categoryId);
    if (!category) return res.status(404).json({ message: 'Category not found' });

    await Category.deleteOne({ _id: categoryId });
    res.json({ message: 'Category deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllCategories,
  addCategory,
  updateCategory,
  deleteCategory,
};
