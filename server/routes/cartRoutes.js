const { Router } = require('express')
const {
  getMyCart,
  addProductToCart,
  incProductQuantity,
  decProductQuantity,
  deleteProductFromCart,
  cartSession,
} = require('./../controllers/cartControllers')
const { isAuthenticated } = require('../middleware/auth')

const router = Router()

router.get('/cart', isAuthenticated, getMyCart)
router.post('/cart/add/:productId', isAuthenticated, addProductToCart)
router.put('/cart/inc/:productId', isAuthenticated, incProductQuantity)
router.put('/cart/dec/:productId', isAuthenticated, decProductQuantity)
router.delete('/cart/delete/:productId', isAuthenticated, deleteProductFromCart)

router.post('/cart/create-checkout-session', isAuthenticated, cartSession)

module.exports = router
