const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
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
    type: [String],
    required: true,
    validate: {
      validator: function (v) {
        return v.length <= 4
      },
    },
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
    ref: 'category',
    required: true,
  },
  label: {
    type: String,
    enum: ['New Arrival', 'On Sale', 'Bestseller'],
  },
})

const Product = mongoose.model('product', productSchema)

module.exports = { Product }
