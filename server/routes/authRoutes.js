const { Router } = require('express')
const { signup, login, logout } = require('./../controllers/authControllers')
const { validateSignupInput } = require('./../validators/signupValidators')
const { validateLoginInput } = require('./../validators/loginValidators')

const router = Router()

router.post('/signup', validateSignupInput, signup)
router.post('/login', validateLoginInput, login)
router.post('/logout', logout)

module.exports = router
