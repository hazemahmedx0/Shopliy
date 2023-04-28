const jwt = require('jsonwebtoken')

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt
  if (!token) {
    return res.redirect('/login')
  }
  // check json web token exists & is verified
  try {
    //recreate the signuture based on the header, payload and compare signetures
    console.log('ath')
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
    console.log('decdecodedToken', decodedToken)
    next()
  } catch (err) {
    console.log(`requireAuth err: ${err}`)
  }
}

module.exports = { requireAuth }
