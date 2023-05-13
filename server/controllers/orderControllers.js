const Order = require('../models/Order')
const Cart = require('../models/Cart')
const { getPopulatedCart } = require('../helpers/cartHelpers')
const { model } = require('mongoose')
module.exports.get_user_orders = async (req, res) => {
  const userId = req.params.userId
  try {
    const orders = await Order.find({ userId })
    res.status(200).json(orders)
  } catch (err) {
    console.log(err)
  }
}

module.exports.create_order = async (req, res) => {
  console.log('req', req.body)
  const userId = res.locals.user._id
  const cart = await Cart.findOne({ userId })
  const populatedCart = await getPopulatedCart(cart._id)
  //   res.json(populatedCart)

  const { items, subTotal } = cart
  console.log(items)
  try {
    const order = await Order.create({
      userId,
      items,
      subTotal,
    })
    //delete cart
    const ackDeletedCart = await Cart.deleteOne({ userId })
    console.log(ackDeletedCart)
    res.status(201).json(order)
  } catch (err) {
    console.log(err)
  }
}

module.exports.delete_order = async (req, res) => {
  const id = req.params.id

  try {
    const ackDeleteOrder = await Order.deleteOne({ _id: id })
    console.log(ackDeleteOrder)
    res.status(204).json({ message: 'order deleted successfully.' })
  } catch (err) {
    console.log(err)
  }
}

module.exports.get_my_orders = async (req, res) => {
  const userId = res.locals.user._id
  try {
    const orders = await Order.find({ userId })
    res.json(orders)
  } catch (err) {
    console.log(err)
  }
}
module.exports.get_myorder_by_id = async (req, res) => {
  const id = req.params.id
  try {
    const order = await Order.findOne({ _id: id })
    res.json(order)
  } catch (err) {
    console.log(err)
  }
}
