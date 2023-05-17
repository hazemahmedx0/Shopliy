const Joi = require('joi')

const validateShippingAddressInput = (req, res, next) => {
  const shippingAddress = req.body

  const schema = Joi.object({
    shippingAddress: Joi.object({
      street: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      zip: Joi.string().required(),
      country: Joi.string().required(),
    }),
  })

  const errors = {}
  const validationErrors = schema.validate(shippingAddress, {
    abortEarly: false,
  })

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

module.exports = { validateShippingAddressInput }
