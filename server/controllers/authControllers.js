const { User } = require('./../models/User')
const jwt = require('jsonwebtoken')

const handleLoginErrors = (err) => {
  let errors = {
    email: '',
    password: '',
  }

  if (err.message === 'incorrect email') {
    errors.email = 'This email is not registered.'
  }

  if (err.message === 'incorrect password') {
    errors.password = 'incorrect password.'
  }
  return errors
}

const handleSignupErrors = async (err, email) => {
  let errors = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  }
  // Already registered ?
  const existingUser = await User.findOne({ email })
  console.log(existingUser)
  if (existingUser) {
    errors.email = 'Email address is already registered.'
  }

  // Valid email and password ?
  if (err.name === 'ValidationError') {
    // Extracting error messages for email and password from err obj
    const ErrorValues = Object.values(err.errors)

    // Updating errors object
    ErrorValues.forEach((errVal) => {
      path = errVal.properties.path
      message = errVal.properties.message

      errors[path] = message
    })
  }

  return errors
}

module.exports.signup_get = (req, res) => {
  console.log(res.locals.user)
  const user = res.locals.user
  if (!user) {
    return res.json('signup form')
  }
  if (user.isAdmin) {
    res.redirect('/dashboard')
  } else {
    res.redirect('/')
  }
  //res.render()
}

const maxAge = 24 * 60 * 60 // 1 day in msec

module.exports.signup_post = async (req, res) => {
  const { firstName, lastName, email, password } = req.body

  try {
    const user = await User.create({ firstName, lastName, email, password })

    console.log(user._id)
    res.status(201).redirect('/login')
  } catch (err) {
    const errors = await handleSignupErrors(err, email)

    console.log(`signup post error: ${err}`)

    res.status(400).json(errors)
  }
}

module.exports.login_get = (req, res) => {
  console.log(res.locals.user)
  const user = res.locals.user
  if (!user) {
    return res.json('login form')
  }
  if (user.isAdmin) {
    res.redirect('/dashboard')
  } else {
    res.redirect('/')
  }
}

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.login(email, password)

    const payload = { id: user._id, isAdmin: user.isAdmin }
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: maxAge,
    })

    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
    res.status(200).json({ user: user._id })
  } catch (err) {
    const errors = handleLoginErrors(err)

    console.log(`login post error: ${err}`)

    res.status(400).json(errors)
    //400 not a sucess
  }
}

module.exports.logout_get = (req, res) => {
  console.log(res.locals.user)

  token = ''
  res.cookie('jwt', token, { maxAge: 1 })
  res.redirect('/')
}
