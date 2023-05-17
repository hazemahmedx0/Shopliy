const Joi = require('joi')

const validateNewProductInput = (req, res, next) => {
  const user = req.body
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required().min(0),
    image: Joi.array().items(Joi.string()).min(1).max(4).required(),
    availability: Joi.boolean().default(true),
    brand: Joi.string().required(),
    categoryId: Joi.string().required(),
    label: Joi.string().valid('New Arrival', 'On Sale', 'Bestseller'),
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

const validateExistingProductInput = (req, res, next) => {
  const user = req.body
  const schema = Joi.object({
    name: Joi.string(),
    description: Joi.string(),
    price: Joi.number().min(0),
    image: Joi.array().items(Joi.string()).min(1).max(4),
    availability: Joi.boolean(),
    brand: Joi.string(),
    categoryId: Joi.string(),
    label: Joi.string().valid('New Arrival', 'On Sale', 'Bestseller'),
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

module.exports = { validateNewProductInput, validateExistingProductInput }
