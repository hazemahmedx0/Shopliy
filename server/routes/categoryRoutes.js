const { Router } = require('express')
const {
  getAllCategories,
  getCategoryById,
  addCategory,
  updateCategory,
  deleteCategory,
} = require('./../controllers/categoryControllers')
const { validateCategoryInput } = require('../validators/categoryValidators')
const { isAdmin } = require('../middleware/auth')

const router = Router()

// guest routes
router.get('/categories', getAllCategories)
router.get('/categories/:id', getCategoryById)

// admin routes
router.post('/categories/add', [isAdmin, validateCategoryInput], addCategory)
router.put('/categories/update/:id', isAdmin, updateCategory)
router.delete('/categories/delete/:id', isAdmin, deleteCategory)

module.exports = router
