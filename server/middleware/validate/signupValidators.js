const Joi = require('joi')

const validateSignupInput = (req, res, next) => {
  const user = req.body

  const schema = Joi.object({
    firstName: Joi.string().max(30).required(),
    lastName: Joi.string().max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  })

  const errors = {}
  const validationErrors = schema.validate(user, { abortEarly: false })

  if (!validationErrors.error) return next()

  const errorDetails = validationErrors.error.details
  errorDetails.forEach((detail) => {
    errors[detail.path[0]] = detail.message.replace(/[\\"]/g, '')
  })

  if (Object.keys(errors).length > 0) {
    return res.status(400).json(errors)
  }

  next()
}

const checkUniqueness = (err) => {
  if (err.code === 11000) {
    return { email: 'This Email address is already registered.' }
  }
}
module.exports = { validateSignupInput, checkUniqueness }
