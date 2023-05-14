const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required.'],
  },
  description: {
    type: String,
    required: [true, 'product description is required.'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required.'],
    min: [0, 'Price must be a positive number.'],
  },
  image: {
    type: String,
    required: [true, 'product image is required.'],
    max: [4, 'Maximum number of product images reached.'],
  },
  availability: {
    type: Boolean,
    default: true,
  },
  brand: {
    type: String,
    required: true,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  label: {
    type: String,
    enum: ['New Arrival', 'On Sale', 'Bestseller'],
  },
  //   purchased: {
  //     type: Number,
  //     default: 0,
  //   },
})

const Product = mongoose.model('product', productSchema)

module.exports = Product
