const Joi = require('joi')

const validateLoginInput = (req, res, next) => {
  const user = req.body

  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  })

  const errors = {}
  const validationErrors = schema.validate(user, { abortEarly: false })

  if (!validationErrors.error) return next()

  const errorDetails = validationErrors.error.details
  errorDetails.forEach((detail) => {
    console.log(detail)
    errors[detail.path[0]] = detail.message.replace(/[\\"]/g, '')
  })

  if (Object.keys(errors).length > 0) {
    return res.status(400).json(errors)
  }

  next()
}

const handleLoginError = (err) => {
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

module.exports = { validateLoginInput, handleLoginError }
