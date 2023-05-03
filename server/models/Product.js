const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  image: {
    type: String,
    required: true,
  },
  availability: {
    type: Boolean,
    default: true,
  },
  brand: {
    type: String,
    required: true,
  },
  //   category_id: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'Category',
  //     required: true,
  //   },
  label: {
    type: String,
    enum: ['New', 'Sale', 'Hot'],
  },
  //   purchased: {
  //     type: Number,
  //     default: 0,
  //   },
})

const Product = mongoose.model('product', productSchema)

module.exports = Product
