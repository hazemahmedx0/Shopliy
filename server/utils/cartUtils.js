const { Cart } = require('../models/Cart')
const { Product } = require('../models/Product')

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

const getCart = async (userId) => {
  try {
    console.log(userId)
    let cart = await Cart.findOne({ userId })
    if (!cart) cart = await Cart.create({ userId })
    console.log('got a cart.')
    return cart
  } catch (err) {
    console.log(err)
    return Error('internal Server Error')
  }
}

const getCartWithProductDetails = async (cartId) => {
  const cartWithProductInfo = await Cart.find({ _id: cartId }).populate(
    'items.productId'
  )
  return cartWithProductInfo
}

const updateSubTotal = (cart) => {
  console.log('total price updated.')
  cart.subTotal = cart.items.reduce((total, cartItem) => {
    return total + cartItem.totalPrice
  }, 0)
}
const updateItemsPrice = (cart) => {
  console.log('items price updated for each item.')
  cart.items.forEach((item) => {
    item.totalPrice = item.price * item.quantity
  })
}

const saveUpdatedCart = async (cart) => {
  try {
    const savedCart = await cart.save()
  } catch (err) {
    console.log('Product saved:', savedCart)
  }
}

const getItemIndexInCart = (cart, productId) => {
  return cart.items.findIndex(
    (cartItem) => cartItem.productId.toString() === productId.toString()
  )
}

const addNewItem = (cart, item) => {
  cart.items.push(item)
  console.log('item pushed in cart.')
}

const updateProductQuantity = (cart, existingItemIndex, item) => {
  cart.items[existingItemIndex].quantity += item.quantity
  console.log('item quantity updated.')
}

//////////////////////////////////////////////////////////////////////////////////
//              Cart main Utility Functions                                    //
//////////////////////////////////////////////////////////////////////////////////

const updateCartItems = async (cart, item) => {
  // push new item | update quantity of exisiting item

  try {
    const existingItemIndex = getItemIndexInCart(cart, item.productId)

    if (existingItemIndex === -1) {
      addNewItem(cart, item)
    } else {
      updateProductQuantity(cart, existingItemIndex, item)
    }
    updateItemsPrice(cart)
    updateSubTotal(cart)

    await saveUpdatedCart(cart)
    return cart
  } catch (err) {
    return err
  }
}
const decrementQuantity = async (cart, item) => {
  // err if no product item | delete this item | dec quantity of exisiting item

  try {
    const existingItemIndex = getItemIndexInCart(cart, item.productId)

    if (existingItemIndex === -1) {
      console.log('product number can not be negative.')
      throw new Error('This product is already removed.')
    } else if (cart.items[existingItemIndex].quantity === 1) {
      cart.items = cart.items.filter(
        (curr_item) =>
          curr_item.productId.toString() !== item.productId.toString()
      )
      console.log('Product deleted successfully.')
    } else {
      item.quantity = -1
      updateProductQuantity(cart, existingItemIndex, item)
      console.log('item quantity decremented successfully.')
    }

    updateItemsPrice(cart)
    updateSubTotal(cart)

    await saveUpdatedCart(cart)
    return cart
  } catch (err) {
    throw err
  }
}

const incrementQuantity = async (cart, userId, item) => {
  return await updateCartItems(cart, userId, item)
}

const deleteProduct = async (cart, item) => {
  try {
    const existingItemIndex = getItemIndexInCart(cart, item.productId)

    if (existingItemIndex === -1) {
      console.log('Product number can not be negative.')
      throw new Error('This product is already removed.')
    } else {
      cart.items = cart.items.filter(
        (curr_item) =>
          curr_item.productId.toString() !== item.productId.toString()
      )
      console.log('Product deleted successfully.')
    }

    updateItemsPrice(cart)
    updateSubTotal(cart)

    await saveUpdatedCart(cart)
    return cart
  } catch (err) {
    throw err
  }
}
module.exports = {
  createItem,
  getCart,
  updateCartItems,
  incrementQuantity,
  decrementQuantity,
  deleteProduct,
  getCartWithProductDetails,
}
