const jwt = require('jsonwebtoken')

const isAdmin = (req, res, next) => {
  const token = req.cookies.jwt

  // check json web token exists & is verified
  if (!token) {
    return res.redirect('/login')
  }

  try {
    //recreate the signuture based on the header, payload and compare signetures
    const { isAdmin } = jwt.verify(token, process.env.SECRET_KEY)

    if (isAdmin) {
      console.log('yes, admin.')
      next()
    } else {
      return res.status(403).json('forbiden, Unauthorized')
    }
  } catch (err) {
    console.log(`isAdmin err:${err}`)
  }
}

module.exports = { isAdmin }
