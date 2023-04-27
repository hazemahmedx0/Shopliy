const mongoose = require('mongoose')
const { isEmail } = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required.'],
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required.'],
  },
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    validate: [isEmail, 'Please enter a valid email'],
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'Please enter the password'],
    minLength: [6, 'Minimum password length is 6 characters'],
  },
  role: {
    type: String,
    enum: ['admin', 'basic'],
    default: 'basic',
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
})

// Hash password before saving it in db
userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt()
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

const User = mongoose.model('user', userSchema)
module.exports = User
