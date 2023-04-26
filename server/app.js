const express = require('express')
const mongoose = require('mongoose')
const authRoutes = require('./routes/authRoutes')
//TODO: cookieParser pkg

const app = express()

// middleware

app.use(express.json()) // parse incoming requests with JSON payloads

// Connecting to db
const dbURI =
  'mongodb+srv://test-user:test1234@cluster0.iqkprwq.mongodb.net/shopliy'

mongoose
  .connect(dbURI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(`db connection error: ${err}`))

app.get('/', (req, res) => {
  res.json('Home')
})

app.use(authRoutes)
