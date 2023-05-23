const {
  getWishlist,
  getWishlistWithProductDetails,
  addWishlistItem,
  deleteWishlistItem,
} = require('../utils/wishlistUtils')

const getMyWishlist = async (req, res) => {
  const userId = res.locals.user._id
  try {
    let wishlist = await getWishlist(userId)
    wishlist = await getWishlistWithProductDetails(wishlist._id)

    res.json(wishlist)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

const addProductToWishlist = async (req, res) => {
  const productId = req.params.productId
  const userId = res.locals.user._id
  try {
    const item = { productId }
    let wishlist = await getWishlist(userId)
    wishlist = await addWishlistItem(wishlist, item)
    wishlist = await getWishlistWithProductDetails(wishlist._id)
    console.log(wishlist.items)

    res.json({ message: 'added Item successfully', wishlist })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

const deleteProductFromWishlist = async (req, res) => {
  const productId = req.params.productId
  const userId = res.locals.user._id
  try {
    let wishlist = await getWishlist(userId)
    wishlist = await deleteWishlistItem(wishlist, productId)
    wishlist = await getWishlistWithProductDetails(wishlist._id)

    res.json({ message: 'deleted Item successfully', wishlist })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

module.exports = {
  getMyWishlist,
  addProductToWishlist,
  deleteProductFromWishlist,
}
