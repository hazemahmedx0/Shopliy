const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
        required: true,
        min: [1, 'Quantity can not be less then 1.'],
      },
      price: {
        type: Number,
        ref: 'Product.price',
        required: true,
      },
      totalPrice: {
        type: Number,
        required: true,
      },
    },
  ],
  subTotal: {
    type: Number,
    default: 0,
    required: true,
    min: [0, 'Price must be a positive number.'],
  },
})

const Cart = mongoose.model('cart', cartSchema)
module.exports = { Cart }
