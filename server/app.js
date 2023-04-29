const express = require('express')
const mongoose = require('mongoose')
const authRoutes = require('./routes/authRoutes')
const cookieParser = require('cookie-parser')
const userRoutes = require('./routes/userRoutes')
const { isAuthenticated, checkUser, isAdmin } = require('./middleware/auth')
require('dotenv').config()

const app = express()

// middlewares
app.use(express.json()) // parse incoming requests with JSON payloads
app.use(cookieParser())

// environment variables
const port = process.env.PORT || 3000
const dbURI = process.env.DB_URI

// Connecting to db
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

app.get('*', checkUser) // to get access user info in all views

// Routes
app.get('/', (req, res) => {
  console.log(res.locals.user)
  res.status(200).json('Home')
})

app.get('/test-user', isAuthenticated, (req, res) => {
  console.log(res.locals.user)
  res.status(200).json('hello user')
})

app.get('/dashboard', isAdmin, (req, res) => {
  const user = res.locals.user
  res.status(200).json(`hello admin, ${user.firstName} ${user.lastName}`)
})

app.use(authRoutes)
app.use(userRoutes)
