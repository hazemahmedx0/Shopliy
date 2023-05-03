const Product = require('./../models/Product')

module.exports.get_avaialable_products = async (req, res) => {
  try {
    const products = await Product.find({ availability: true })
    const productsNo = products.length

    console.log('Available products:', products)
    return res.json({
      productsNo,
      products,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

module.exports.get_product = async (req, res) => {
  const id = req.params.id
  console.log(id)
  try {
    const product = await Product.findOne({ _id: id })
    if (product) {
      return res.json(product)
    } else {
      return res.status(404).json({ message: 'Product not found' })
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}
