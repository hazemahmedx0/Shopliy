const { User } = require('./../models/User')
const jwt = require('jsonwebtoken')

module.exports.me_get = (req, res) => {
  const { photo, firstName, lastName, shippingAddress } = res.locals.user
  res.json({ photo, firstName, lastName, shippingAddress })
}

module.exports.me_put = async (req, res, next) => {
  try {
    const token = req.cookies.jwt

    // Decode the JWT to get the payload
    const { id } = jwt.verify(token, process.env.SECRET_KEY)

    // Extract the id value from the payload
    const user = await User.findById(id)
    console.log(req.body)
    // Update the user object with the new data
    let { photo, firstName, lastName, shippingAddress } = req.body
    photo = photo || user.photo
    firstName = firstName || user.firstName
    lastName = lastName || user.lastName
    shippingAddress = shippingAddress || user.shippingAddress

    // Save the updated user object to the database
    const aknowlege = await User.updateOne(
      { _id: user._id },
      { $set: { firstName, lastName, shippingAddress, photo } },
      { upsert: true }
    )
    const updatedUser = await User.findById(id)
    console.log(updatedUser)
    console.log('updated', aknowlege)

    // to be sure
    res.json({
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      shippingAddress: updatedUser.shippingAddress,
      photo: updatedUser.photo,
    })
  } catch (err) {
    next(err)
  }
}
