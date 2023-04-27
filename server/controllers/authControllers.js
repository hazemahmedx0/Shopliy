const User = require('./../models/User')
const jwt = require('jsonwebtoken')

const userValidationErrorHandler = async (err, email) => {
  let errors = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  }

  // Already registered ?
  const existingUser = await User.findOne({ email })
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

signup_get = (req, res) => {
  res.json('here is the form')
  //res.render()
}

signup_post = async (req, res) => {
  // 1. Get email & password
  const { firstName, lastName, email, password } = req.body

  try {
    // 2. Create a user in db
    const user = await User.create({ firstName, lastName, email, password })

    // 3. Create jwt cookie
    const maxAge = 24 * 60 * 60 // 1 day in msec

    // 3.1 Generate jwt token that expires in 1 day
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: maxAge,
    })

    // 3.2 Set token in a cookie in the response object (also expires in 1 day)
    res.cookie('jwt', token, { httpOnly: true }, { maxAge: maxAge * 1000 })

    res.status(201).json({ id: user._id })
  } catch (err) {
    const errors = await userValidationErrorHandler(err, email)

    console.log(`signup post error: ${err}`)

    res.status(400).json(errors)
  }
}

module.exports = { signup_get, signup_post }
