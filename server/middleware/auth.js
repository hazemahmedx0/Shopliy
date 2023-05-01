const jwt = require('jsonwebtoken')
const { User } = require('./../models/User')

const isAuthenticated = (req, res, next) => {
  const token = req.cookies.jwt
  if (!token) {
    return res.status(301).redirect('/login')
  }
  // check json web token exists & is verified
  try {
    //recreate the signuture based on the header, payload and compare signetures
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
    console.log('decdecodedToken', decodedToken)
    next()
  } catch (err) {
    console.log(`isAuthenticated err: ${err}`)
  }
}

const checkUser = async (req, res, next) => {
  const token = req.cookies.jwt
  if (!token) {
    res.locals.user = null
    next()
    return
  }

  try {
    const { id } = jwt.verify(token, process.env.SECRET_KEY)

    const user = await User.findById(id)
    res.locals.user = user
  } catch (err) {
    console.log(err.message)
    res.locals.user = null
  }
  next()
}

const isAdmin = async (req, res, next) => {
  const token = req.cookies.jwt
  if (!token) {
    console.log('you are not authenticated.')
    return res.status(301).redirect('/login')
  }

  try {
    const { isAdmin } = jwt.verify(token, process.env.SECRET_KEY)
    if (isAdmin) {
      next()
    } else {
      return res
        .status(403)
        .json({ message: 'You are not authorized to access this resource.' })
    }
  } catch (err) {
    console.log(`isAdmin middleware error: ${err.message}`)
    return res.status(500).json({ message: 'An error occurred.' })
  }
  next()
}
module.exports = { isAuthenticated, checkUser, isAdmin }
