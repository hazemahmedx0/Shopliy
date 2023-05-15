const { Router } = require('express')
const {
  getMyCart,
  addProductToCart,
  incProductQuantity,
  decProductQuantity,
  deleteProductFromCart,
} = require('./../controllers/cartControllers')
const { isAuthenticated } = require('../middleware/auth')

const router = Router()

router.use(isAuthenticated)

router.get('/cart', getMyCart)
router.post('/cart/add/:productId', addProductToCart)
router.put('/cart/inc/:productId', incProductQuantity)
router.put('/cart/dec/:productId', decProductQuantity)
router.delete('/cart/delete/:productId', deleteProductFromCart)

module.exports = router
