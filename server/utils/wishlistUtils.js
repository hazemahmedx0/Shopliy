const { Wishlist } = require("../models/Wishlist")
const { Product } = require('../models/Product')

const getWishlist = async (userId) => {
    try {
      console.log(userId)
      let wishlist= await Wishlist.findOne({ userId })
      if (!wishlist) wishlist = await Wishlist.create({ userId })
      console.log('got a wishlist.')
      return wishlist
    } catch (err) {
      console.log(err)
      return Error('internal Server Error')
    }
  }
  
  const getWishlistWithProductDetails = async (wishlistId) => {
    const wishlistWithProductInfo = await Wishlist.find({ _id: wishlistId }).populate(
      'items.productId'
    )
    return wishlistWithProductInfo
  }

  const addNewItem =async (wishlist, item) => {
    wishlist.items.push(item)
    await wishlist.save()
    console.log('item pushed in wishlist.')
    return(wishlist)
  }


  module.exports = {
    getWishlist,
    getWishlistWithProductDetails,
    addNewItem,

  }