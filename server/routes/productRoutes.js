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

const router = Router()

router.get('/allProducts', getAllProducts)
router.get('/availableProducts', getAvaialableProducts)
router.get('/products/:id', getProductById)
router.post('/products/add', validateNewProductInput, addProduct)
router.put('/products/update/:id', validateExistingProductInput, updateProduct)
router.delete('/products/delete/:id', deleteProduct)

module.exports = router
