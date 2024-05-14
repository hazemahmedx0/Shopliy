const {
  createItem,
  getCart,
  updateCartItems,
  incrementQuantity,
  decrementQuantity,
  deleteProduct,
  getCartWithProductDetails,
} = require('../utils/cartUtils')
const stripe = require('stripe')('')

const getMyCart = async (req, res) => {
  const userId = res.locals.user._id
  try {
    let cart = await getCart(userId)
    cart = await getCartWithProductDetails(cart._id)

    res.json(cart)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

const addProductToCart = async (req, res) => {
  const productId = req.params.productId
  const userId = res.locals.user._id
  console.log(productId, userId)
  try {
    const item = await createItem(productId)
    let cart = await getCart(userId)
    cart = await updateCartItems(cart, item)
    cart = await getCartWithProductDetails(cart._id)

    res.json({ message: 'added Item successfully', cart })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

const incProductQuantity = async (req, res) => {
  const productId = req.params.productId
  const userId = res.locals.user._id
  console.log(productId, userId)
  try {
    const item = await createItem(productId)
    let cart = await getCart(userId)
    cart = await incrementQuantity(cart, item)
    cart = await getCartWithProductDetails(cart._id)

    res.json({ message: 'item incremented successfully', cart })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Internal server error' })
  }
}
const decProductQuantity = async (req, res) => {
  const productId = req.params.productId
  const userId = res.locals.user._id
  console.log(productId, userId)
  try {
    const item = await createItem(productId)
    let cart = await getCart(userId)
    cart = await decrementQuantity(cart, item)
    cart = await getCartWithProductDetails(cart._id)
    res.json({ message: 'item decremented successfully', cart })
  } catch (err) {
    if (err.message === 'This product is already removed.')
      return res.status(404).json({ message: err.message })
    console.log(err)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

const deleteProductFromCart = async (req, res) => {
  const productId = req.params.productId
  const userId = res.locals.user._id
  console.log(productId, userId)
  try {
    const item = await createItem(productId)
    let cart = await getCart(userId)
    cart = await deleteProduct(cart, item)
    cart = await getCartWithProductDetails(cart._id)

    res.json({ message: 'item deleted successfully', cart })
  } catch (err) {
    if (err.message === 'This product is already removed.')
      return res.status(404).json({ message: err.message })
    console.log(err)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

const cartSession = async (req, res) => {
  function makeRandomID() {
    let id = ''
    let characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (let i = 0; i < 10; i++) {
      id += characters.charAt(Math.floor(Math.random() * characters.length))
    }

    return id
  }

  const { products } = req.body
  const lineItems = products.map((product) => ({
    price_data: {
      currency: 'usd',
      product_data: {
        name: product.productId.name,
        // images: [product.productId.image],
      },
      unit_amount: Math.round(product.price * 100),
    },
    quantity: product.quantity,
  }))
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    success_url: `http://localhost:5173/`,
    cancel_url: 'http://localhost:3000/cancel',
  })
  console.log('seeees', session)
  res.json({ id: session.id })
}

module.exports = {
  getMyCart,
  addProductToCart,
  incProductQuantity,
  decProductQuantity,
  deleteProductFromCart,
  cartSession,
}
