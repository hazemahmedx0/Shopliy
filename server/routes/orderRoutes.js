const { Router } = require('express')
const {
  getAllOrders,
  getUserOrders,
  createOrder,
  deleteOrder,
  getMyOrders,
  getMyorderById,
  getUserOrderById,
} = require('./../controllers/orderControllers')
const { isAuthenticated, isAdmin } = require('../middleware/auth')
const Order = require('./../models/Order')
const {
  validateShippingAddressInput,
} = require('../validators/TheOrderValidator')

const router = Router()

// user routes
router.get('/myorders', isAuthenticated, getMyOrders)
router.get('/myorders/:id', isAuthenticated, getMyorderById)
router.post(
  '/orders/add',
  [isAuthenticated, validateShippingAddressInput],
  createOrder
)

// admin routes
router.get('/orders', isAdmin, getAllOrders)
router.get('/orders/:id', isAdmin, getUserOrderById)
router.get('/orders/user/:userId', isAdmin, getUserOrders)
router.delete('/orders/delete/:id', isAdmin, deleteOrder)

module.exports = router
