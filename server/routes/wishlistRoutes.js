const { Router } = require('express')

const {
  getMyWishlist,
  addProductToWishlist,
  deleteProductFromWishlist,
} = require('./../controllers/wishlistControllers')

const { isAuthenticated } = require('../middleware/auth')
const router = Router()

router.get('/wishlist', isAuthenticated, getMyWishlist)
router.post('/wishlist/add/:productId', isAuthenticated, addProductToWishlist)
router.delete(
  '/wishlist/delete/:productId',
  isAuthenticated,
  deleteProductFromWishlist
)

module.exports = router
