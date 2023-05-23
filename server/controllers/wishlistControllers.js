const {
    getWishlist,
    getWishlistWithProductDetails,
    addNewItem,

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
    console.log(productId, userId)
    try {
      const item = {productId}
      let wishlist = await getWishlist(userId)
      wishlist = await addNewItem(wishlist, item)
      wishlist = await getWishlistWithProductDetails(wishlist._id)
      console.log(wishlist.items)
  
      res.json({ message: 'added Item successfully', wishlist })
    } catch (err) {
      console.log(err)
      return res.status(500).json({ message: 'Internal server error' })
    }
  }

  module.exports = {
    getMyWishlist,
    addProductToWishlist,
  }
  