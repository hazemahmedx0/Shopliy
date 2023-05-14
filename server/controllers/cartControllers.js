const Cart = require('./../models/Cart')
const Product = require('./../models/Product')

const {
  getCart,
  updateCartItems,
  incrementProductQuantity,
  decrementProductQuantity,
  deleteProductFromCart,
  getPopulatedCart,
} = require('../utils/cartUtils')

const createItem = async (productId) => {
  try {
    const product = await Product.findOne({ _id: productId })
    const item = {
      productId,
      quantity: 1,
      price: product.price,
    }
    console.log('created item successfully.')
    return item
  } catch (err) {
    console.log('create item error', err)
  }
}
module.exports.add_item_to_cart = async (req, res) => {
  const productId = req.params.productId
  const userId = res.locals.user._id
  console.log(productId, userId)
  try {
    const item = await createItem(productId)
    let cart = await getCart(userId)
    cart = await updateCartItems(cart, item)
    cart = await getPopulatedCart(cart._id)

    res.json({ message: 'added Item successfully', cart })
  } catch (err) {
    return err
  }
}

module.exports.inc_product_quantity = async (req, res) => {
  const productId = req.params.productId
  const userId = res.locals.user._id
  console.log(productId, userId)
  try {
    const item = await createItem(productId)
    let cart = await getCart(userId)
    cart = await incrementProductQuantity(cart, item)
    cart = await getPopulatedCart(cart._id)

    res.json({ message: 'item incremented successfully', cart })
  } catch (err) {
    return err
  }
}
module.exports.dec_product_quantity = async (req, res) => {
  const productId = req.params.productId
  const userId = res.locals.user._id
  console.log(productId, userId)
  try {
    const item = await createItem(productId)
    let cart = await getCart(userId)
    cart = await decrementProductQuantity(cart, item)
    cart = await getPopulatedCart(cart._id)
    res.json({ message: 'item decremented successfully', cart })
  } catch (err) {
    res.json({ message: err.message })
  }
}

module.exports.get_cart = async (req, res) => {
  const userId = res.locals.user._id
  try {
    let cart = await getCart(userId)
    cart = await getPopulatedCart(cart._id)

    res.json(cart)
  } catch (err) {
    console.log(err)
    res.json({ message: err.message })
  }
}

module.exports.delete_product_from_cart = async (req, res) => {
  const productId = req.params.productId
  const userId = res.locals.user._id
  console.log(productId, userId)
  try {
    const item = await createItem(productId)
    let cart = await getCart(userId)
    cart = await deleteProductFromCart(cart, item)
    cart = await getPopulatedCart(cart._id)

    res.json({ message: 'item deleted successfully', cart })
  } catch (err) {
    console.log(err.message)
    res.json({ message: err.message })
  }
}
