const express = require('express');
const router = express.Router();

const {
  getAllCategories,
  addCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/categoryController');


router.get('/', getAllCategories);


router.post('/', addCategory);


router.put('/:categoryId', updateCategory);


router.delete('/:categoryId', deleteCategory);

module.exports = router;
