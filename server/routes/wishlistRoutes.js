const { Router } = require('express')

const {
    getMyWishlist,
    addProductToWishlist,
  } = require('./../controllers/wishlistControllers')

const { isAuthenticated } = require('../middleware/auth')
const router = Router()

router.get('/wishlist', isAuthenticated, getMyWishlist)
router.post('/wishlist/add/:productId', isAuthenticated, addProductToWishlist)

module.exports = router
