const { Router } = require('express')
const userControllers = require('./../controllers/userControllers')
const { isAuthenticated } = require('./../middleware/auth')
const router = Router()

router.get('/me', isAuthenticated, userControllers.me_get)
router.put('/updateMe', isAuthenticated, userControllers.me_put)
router.delete('/users/remove/:id', isAuthenticated, userControllers.remove_user)
router.get('/users', isAuthenticated, userControllers.get_all_users)

module.exports = router
