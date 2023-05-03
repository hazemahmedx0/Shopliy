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
    next()
    return
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
    // check json web token exists & is verified
    isTokenFound(token)
    //recreate the signuture based on the header, payload and compare signetures
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
    console.log('decdecodedToken', decodedToken)
    next()
  } catch (err) {
    if (err.message === 'not authenticated') {
      console.log(err.message)
      return res.status(401).json({ error: 'not authenticated' })
    }

    console.log('is Authenticated err ::', err)

    // console.log(`isAuthenticated err: ${err}`)
    // return res.status(401).json(err)
  }
}

const isAdmin = async (req, res, next) => {
  const token = req.cookies.jwt

  try {
    isTokenFound(token)
    const { isAdmin } = jwt.verify(token, process.env.SECRET_KEY)
    if (isAdmin) {
      next()
    } else {
      throw Error('not authorized')
    }
  } catch (err) {
    console.log(`isAdmin middleware error: ${err.message}`)
    if (err.message === 'not authenticated') {
      console.log(err.message)
      return res.status(401).json({ error: 'not authenticated' })
    }
    if (err.message === 'not authorized') {
      console.log(err.message)
      return res.status(401).json({ error: 'not authorized' })
    }
  }
  next()
}
module.exports = { isAuthenticated, checkUser, isAdmin }
