const express = require('express')
const mongoose = require('mongoose')
const authRoutes = require('./routes/authRoutes')
const cookieParser = require('cookie-parser')

require('dotenv').config()

const app = express()

// middlewares

app.use(express.json()) // parse incoming requests with JSON payloads
app.use(cookieParser())
const { requireAuth, checkUser } = require('./middleware/auth')
// Connecting to db

const port = process.env.PORT || 3000
const dbURI = process.env.DB_URI
mongoose
  .connect(dbURI)
  .then(() => {
    console.log('Connected to MongoDB!')
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`)
    })
  })
  .catch((err) => {
    console.error(`Error connecting to MongoDB: ${err}`)
  })
app.get('*', checkUser)
app.get('/', (req, res) => {
  console.log(res.locals.user)
  res.status(200).json('Home')
})

app.get('/test-user', requireAuth, (req, res) => {
  console.log(res.locals.user)

  res.status(200).json('hello user')
})

app.use(authRoutes)
