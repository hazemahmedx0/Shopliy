const Joi = require('joi')

const validateCategoryInput = (req, res, next) => {
  const user = req.body

  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string(),
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

module.exports = { validateCategoryInput }
