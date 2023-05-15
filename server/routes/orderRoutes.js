const { Router } = require('express')
const {
  getUserOrders,
  createOrder,
  deleteOrder,
  getMyOrders,
  getMyorderById,
  getUserOrderById,
} = require('./../controllers/orderControllers')
const { isAuthenticated } = require('../middleware/auth')
const Order = require('./../models/Order')

const router = Router()

router.use(isAuthenticated)

router.get('/myorders', getMyOrders)
router.get('/myorders/:id', getMyorderById)
router.post('/orders/add', createOrder)

router.get('/orders/:id', getUserOrderById)
router.get('/orders/user/:userId', getUserOrders)
router.delete('/orders/delete/:id', deleteOrder)

module.exports = router
