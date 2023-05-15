const { Router } = require('express')
const {
  getMe,
  updateMe,
  removeUser,
  getAllUsers,
} = require('./../controllers/userControllers')
const { isAuthenticated, isAdmin } = require('./../middleware/auth')

const router = Router()

// user routes
router.get('/me', isAuthenticated, getMe)
router.put('/updateMe', isAuthenticated, updateMe)

// admin routes
router.delete('/users/remove/:id', isAdmin, removeUser)
router.get('/users', isAdmin, getAllUsers)

module.exports = router
