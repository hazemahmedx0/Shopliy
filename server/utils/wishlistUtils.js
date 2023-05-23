const { Wishlist } = require('../models/Wishlist')
const getItemIndexInWishlist = (wishlist, productId) => {
  return wishlist.items.findIndex(
    (item) => item.productId.toString() === productId.toString()
  )
}
const getWishlist = async (userId) => {
  try {
    let wishlist = await Wishlist.findOne({ userId })
    if (!wishlist) wishlist = await Wishlist.create({ userId })
    console.log('got a wishlist.')
    return wishlist
  } catch (err) {
    console.log(err)
    return Error('internal Server Error')
  }
}

const getWishlistWithProductDetails = async (wishlistId) => {
  const wishlistWithProductInfo = await Wishlist.find({
    _id: wishlistId,
  }).populate('items.productId')
  return wishlistWithProductInfo
}

const addWishlistItem = async (wishlist, item) => {
  try {
    const itemIndex = getItemIndexInWishlist(wishlist, item.productId)
    if (itemIndex !== -1) {
      return wishlist
    }
    wishlist.items.push(item)
    await wishlist.save()
    console.log('item pushed in wishlist.')
    return wishlist
  } catch (err) {
    console.log(err)
    return Error('internal Server Error')
  }
}

const deleteWishlistItem = async (wishlist, productId) => {
  try {
    wishlist.items = wishlist.items.filter((item) => {
      return item.productId.toString() !== productId.toString()
    })
    await wishlist.save()
    return wishlist
  } catch (err) {
    console.log(err)
    return Error('internal Server Error')
  }
}
module.exports = {
  getWishlist,
  getWishlistWithProductDetails,
  addWishlistItem,
  deleteWishlistItem,
}
