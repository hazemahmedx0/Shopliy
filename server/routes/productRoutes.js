const { Router } = require('express')
const productControllers = require('./../controllers/productControllers')

const router = Router()

router.get('/products', productControllers.get_avaialable_products)
router.get('/products/:id', productControllers.get_product)
router.post('/products/add', productControllers.add_product)
router.put('/products/update/:id', productControllers.update_product)
router.delete('/products/delete/:id', productControllers.delete_product)

module.exports = router
