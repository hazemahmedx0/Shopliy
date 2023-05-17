const { Order } = require('../models/Order')
const { Cart } = require('../models/Cart')
const { User } = require('../models/User')

const getAllOrders = async (req, res) => {
  try {
    let orders = await Order.find().populate(
      'userId',
      '_id firstName lastName email photo'
    )

    res.status(200).json({ ordersNo: orders.length, orders })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Internal server error.' })
  }
}

const getUserOrders = async (req, res) => {
  const userId = req.params.userId
  try {
    const user = await User.findOne({ _id: userId })
    if (user) {
      const orders = await Order.find({ userId })
      delete user._doc.password
      res.status(200).json({ user, ordersNo: orders.length, orders })
    } else {
      res.status(404).send({ message: 'User not found' })
    }
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Internal server error.' })
  }
}

const createOrder = async (req, res) => {
  const userId = res.locals.user._id
  const { shippingAddress } = req.body
  try {
    const cart = await Cart.findOne({ userId })
    if (!cart) return res.status(404).json('Your cart is empty.')

    const { items, subTotal } = cart
    const order = await Order.create({
      userId,
      items,
      shippingAddress,
      subTotal,
    })
    console.log(order)
    // delete cart
    const result = await Cart.deleteOne({ userId })
    if (!result.acknowledged) {
      return res.status(500).json({ message: 'Internal server error.' })
    }
    res.status(201).json(order)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Internal server error.' })
  }
}

const deleteOrder = async (req, res) => {
  const id = req.params.id

  try {
    const order = await Order.findById(id)
    if (!order) return res.status(404).json('Order not found.')

    const result = await Order.deleteOne({ _id: id })
    if (!result.acknowledged) {
      return res.status(500).json({ message: 'Failed to delete Order.' })
    }
    console.log(result)
    res.status(204).json({ message: 'Order deleted successfully.' })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Internal server error.' })
  }
}

const getMyOrders = async (req, res) => {
  const userId = res.locals.user._id
  try {
    const orders = await Order.find({ userId })
    if (!orders) return res.status(404).json('Orders not found.')
    res.json({ ordersNo: orders.length, orders })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Internal server error.' })
  }
}
const getMyorderById = async (req, res) => {
  const id = req.params.id
  const userId = res.locals.user.id
  try {
    const order = await Order.findOne({ _id: id, userId })
    if (!order) return res.status(404).json('Order not found.')
    res.json(order)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Internal server error.' })
  }
}
const getUserOrderById = async (req, res) => {
  const id = req.params.id
  try {
    const order = await Order.findById(id)
    if (!order) return res.status(404).json('Order not found.')
    const user = await User.findById(order.userId)
    delete user._doc.password
    res.status(200).json({ user, order })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Internal server error.' })
  }
}

module.exports = {
  getAllOrders,
  getUserOrders,
  createOrder,
  deleteOrder,
  getMyOrders,
  getMyorderById,
  getUserOrderById,
}
