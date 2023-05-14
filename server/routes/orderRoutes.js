const { Router } = require('express')
const orderControllers = require('./../controllers/orderControllers')
const { isAuthenticated } = require('../middleware/auth')
const Order = require('./../models/Order')

const router = Router()

router.use(isAuthenticated)

router.get('/orders/:userId', orderControllers.get_user_orders)
router.post('/orders/add', orderControllers.create_order)
router.delete('/orders/delete/:id', orderControllers.delete_order)
router.delete('/orders/delete/:id', orderControllers.delete_order)
router.get('/myorders', orderControllers.get_my_orders)
router.get('/myorders/:id', orderControllers.get_myorder_by_id)
router.delete('/orders/deleteAll', async (req, res) => {
  const orders = await Order.deleteMany()
  res.json(orders)
})

module.exports = router
