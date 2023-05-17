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

    if (user) {
      let updatedUserFields = req.body

      Object.keys(updatedUserFields).forEach((key) => {
        if (
          updatedUserFields[key] === '' ||
          updatedUserFields[key] === undefined
        ) {
          delete updatedUserFields[key]
        }
      })

      const result = await User.updateOne({ _id: user._id }, updatedUserFields)
      if (!result.acknowledged) {
        return res
          .status(500)
          .json({ message: 'Failed to update profile info' })
      }

      const updatedUser = await User.findById(id)
      delete updatedUser._doc.password

      res.json({
        message: 'Profile updated successfully.',
        user: updatedUser,
      })
    } else {
      res.status(404).send({ message: 'Product not found' })
    }
  } catch (err) {
    console.log('err updateMe', err)
    return res.status(500).json({ message: 'Internal server error.' })
  }
}

const removeUser = async (req, res) => {
  const id = req.params.id
  const user = await User.findOne({ _id: id })

  if (user) {
    try {
      const result = await User.deleteOne({ _id: id })
      if (!result.acknowledged) {
        return res.status(500).json({ message: 'Failed to delete User' })
      }
      res.status(204).json({ message: 'Order deleted successfully.' })
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
