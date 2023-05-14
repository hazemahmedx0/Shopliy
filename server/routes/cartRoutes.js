const { Router } = require('express')
const cartControllers = require('./../controllers/cartControllers')
const { isAuthenticated } = require('../middleware/auth')

const router = Router()

router.use(isAuthenticated)

router.post('/cart/add/:productId', cartControllers.add_item_to_cart)
router.put('/cart/inc/:productId', cartControllers.inc_product_quantity)
router.put('/cart/dec/:productId', cartControllers.dec_product_quantity)
router.delete(
  '/cart/delete/:productId',
  cartControllers.delete_product_from_cart
)

router.get('/cart', cartControllers.get_cart)

module.exports = router
