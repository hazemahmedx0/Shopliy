const { User } = require('./../models/User')
const jwt = require('jsonwebtoken')

const getMe = (req, res) => {
  const user = res.locals.user
  res.json(user)
}

const updateMe = async (req, res, next) => {
  try {
    const token = req.cookies.jwt
    const { id } = jwt.verify(token, process.env.SECRET_KEY)

    const user = await User.findById(id)

    const defaultPhoto =
      'https://riatarealty.com/wp-content/uploads/2020/03/generic-person-silhouette-32.png'

    let { firstName, lastName, photo, shippingAddress } = req.body

    photo = photo || defaultPhoto
    firstName = firstName || user.firstName
    lastName = lastName || user.lastName

    const result = await User.updateOne(
      { _id: user._id },
      { $set: { firstName, lastName, shippingAddress, photo } }
    )
    if (!result.acknowledged)
      return res.status(500).json({ message: 'Internal server error.' })

    const updatedUser = await User.findById(id)
    delete updatedUser._doc.password

    res.json({
      message: 'Profile updated successfully.',
      user: updatedUser,
    })
  } catch (err) {
    console.log('err updateMe', err)
    return res.status(500).json({ message: 'Internal server error.' })
  }
}

const removeUser = async (req, res) => {
  const id = req.params.id
  const userId = await User.findOne({ _id: id })

  if (userId) {
    try {
      await User.deleteOne({ _id: id })
      res.status(204)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ message: 'Internal server error.' })
    }
  } else {
    res.status(404).send('User not found.')
  }
}

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
    users.forEach((user) => {
      delete user._doc.password
    })

    res.json(users)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Internal server error.' })
  }
}

module.exports = { getMe, updateMe, getAllUsers, removeUser }
