const { Router } = require('express')
const cartControllers = require('./../controllers/cartControllers')
const { isAuthenticated } = require('../middleware/auth')

const router = Router()

router.post(
  '/cart/add/:productId',
  isAuthenticated,
  cartControllers.add_item_to_cart
)
router.put(
  '/cart/inc/:productId',
  isAuthenticated,
  cartControllers.inc_product_quantity
)
router.put(
  '/cart/dec/:productId',
  isAuthenticated,
  cartControllers.dec_product_quantity
)
router.delete(
  '/cart/delete/:productId',
  isAuthenticated,
  cartControllers.delete_product_from_cart
)

router.get('/cart', isAuthenticated, cartControllers.get_cart)

module.exports = router
