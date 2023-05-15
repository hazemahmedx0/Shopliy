const express = require('express')
const mongoose = require('mongoose')
const authRoutes = require('./routes/authRoutes')
const cookieParser = require('cookie-parser')
const userRoutes = require('./routes/userRoutes')
const productRoutes = require('./routes/productRoutes')
const cartRoutes = require('./routes/cartRoutes')
const orderRoutes = require('./routes/orderRoutes')
const categoryRoutes = require('./routes/categoryRoutes')
const { isAuthenticated, checkUser, isAdmin } = require('./middleware/auth')
const cors = require('cors')
require('dotenv').config()
// TODO : in all catch fields , return internal server error if not predefined err
const app = express()

// middlewares

app.use(
  cors({
    origin: true,
    credentials: true,
  })
)
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

app.all('*', checkUser) // to get access user info in all views

// app.get('/dashboard', isAdmin, (req, res) => {
//   const user = res.locals.user
//   res.status(200).json(user)
// })

app.use(authRoutes)
app.use(userRoutes)
app.use(categoryRoutes)
app.use(productRoutes)
app.use(cartRoutes)
app.use(orderRoutes)
