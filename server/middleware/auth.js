const jwt = require('jsonwebtoken')
const User = require('./../models/User')

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt
  if (!token) {
    return res.redirect('/login')
  }
  // check json web token exists & is verified
  try {
    //recreate the signuture based on the header, payload and compare signetures
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
    console.log('decdecodedToken', decodedToken)
    next()
  } catch (err) {
    console.log(`requireAuth err: ${err}`)
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
module.exports = { requireAuth, checkUser }
