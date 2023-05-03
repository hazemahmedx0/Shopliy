const { Router } = require('express')
const productControllers = require('./../controllers/productControllers')

const router = Router()

router.get('/products', productControllers.get_avaialable_products)
router.get('/products/:id', productControllers.get_product)

module.exports = router
