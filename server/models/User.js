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
  isAdmin: {
    type: Boolean,
    default: false,
  },
  photo: {
    type: String,
    default:
      'https://riatarealty.com/wp-content/uploads/2020/03/generic-person-silhouette-32.png',
  },
  shippingAddress: {
    type: String,
    default: '',
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

// static method to login user
// a user defined method defined on the schema that can be called on the model itself, rather than on an instance of the model
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email }) //this = User model

  if (user) {
    const auth = await bcrypt.compare(password, user.password)

    if (auth) {
      return user
    } else {
      throw Error('incorrect password')
    }
  }

  throw Error('incorrect email')
}

const User = mongoose.model('user', userSchema)
module.exports = { User }
