const express = require('express')
const mongoose = require('mongoose')
const authRoutes = require('./routes/authRoutes')
//TODO: cookieParser pkg

require('dotenv').config()

const app = express()

// middleware

app.use(express.json()) // parse incoming requests with JSON payloads

const port = process.env.PORT || 3000
// Connecting to db
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

app.get('/', (req, res) => {
  res.json('Home')
})

app.use(authRoutes)
