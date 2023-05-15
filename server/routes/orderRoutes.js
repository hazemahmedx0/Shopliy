const { Router } = require('express')
const {
  getUserOrders,
  createOrder,
  deleteOrder,
  getMyOrders,
  getMyorderById,
} = require('./../controllers/orderControllers')
const { isAuthenticated } = require('../middleware/auth')
const Order = require('./../models/Order')

const router = Router()

router.use(isAuthenticated)

router.delete('/orders/delete/:id', deleteOrder)
router.get('/myorders', getMyOrders)
router.get('/myorders/:id', getMyorderById)

router.get('/orders/:userId', getUserOrders)
// router.get('/orders/:id', getUserOrderById)
router.post('/orders/add', createOrder)
router.delete('/orders/deleteAll', async (req, res) => {
  const orders = await Order.deleteMany()
  res.json(orders)
})

module.exports = router
