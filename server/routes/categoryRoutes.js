const { Router } = require('express')
const {
  getAllCategories,
  getCategoryById,
  addCategory,
  updateCategory,
  deleteCategory,
} = require('./../controllers/categoryControllers')
const { validateCategoryInput } = require('../validators/categoryValidators')

const router = Router()

router.get('/categories', getAllCategories)
router.get('/categories/:id', getCategoryById)
router.post('/categories/add', validateCategoryInput, addCategory)
router.put('/categories/update/:id', updateCategory)
router.delete('/categories/delete/:id', deleteCategory)

module.exports = router
