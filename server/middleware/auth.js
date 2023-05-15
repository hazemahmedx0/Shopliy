const jwt = require('jsonwebtoken')
const { User } = require('./../models/User')

// helper functions
const isTokenFound = (token) => {
  if (!token) throw Error('not authenticated')
}

// middlewares
const checkUser = async (req, res, next) => {
  const token = req.cookies.jwt
  if (!token) {
    res.locals.user = null
    return next()
  }

  try {
    const { id } = jwt.verify(token, process.env.SECRET_KEY)

    let user = await User.findById(id)
    delete user._doc.password

    res.locals.user = user
  } catch (err) {
    console.log(err.message)
    res.locals.user = null
  }
  next()
}

const isAuthenticated = (req, res, next) => {
  const token = req.cookies.jwt
  try {
    isTokenFound(token)
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
    next()
  } catch (err) {
    if (err.message === 'not authenticated') {
      return res.status(401).json({ error: 'not authenticated' })
    }

    console.log('is Authenticated err ::', err)
  }
}

const isAdmin = async (req, res, next) => {
  const token = req.cookies.jwt
  try {
    isTokenFound(token)
    const { isAdmin } = jwt.verify(token, process.env.SECRET_KEY)
    if (isAdmin) {
      return next()
    } else {
      throw Error('not authorized')
    }
  } catch (err) {
    if (err.message === 'not authenticated') {
      return res.status(401).json({ error: 'not authenticated' })
    }
    if (err.message === 'not authorized') {
      return res.status(401).json({ error: 'not authorized' })
    }
    console.log('is admin err ::', err)
  }
  next()
}

module.exports = { isAuthenticated, checkUser, isAdmin }
