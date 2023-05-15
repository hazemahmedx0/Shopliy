const { Router } = require('express')
const {
  getAllProducts,
  getAvaialableProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
} = require('./../controllers/productControllers')
const {
  validateNewProductInput,
  validateExistingProductInput,
} = require('../validators/productValidators')

const { isAdmin } = require('../middleware/auth')
const router = Router()

// guest routes
router.get('/availableProducts', getAvaialableProducts)
router.get('/products/:id', getProductById)

// admin routes
router.get('/allProducts', isAdmin, getAllProducts)
router.post('/products/add', [isAdmin, validateNewProductInput], addProduct)
router.put(
  '/products/update/:id',
  [isAdmin, validateExistingProductInput],
  updateProduct
)
router.delete('/products/delete/:id', isAdmin, deleteProduct)

module.exports = router
