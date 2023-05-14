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

module.exports.add_product = async (req, res) => {
  console.log(req.body)
  const {
    name,
    description,
    price,
    image,
    availability,
    brand,
    categoryId,
    label,
  } = req.body
  try {
    const product = await Product.create({
      name,
      description,
      price,
      image,
      availability,
      brand,
      categoryId,
      label,
    })
    res.status(200).json(product)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

module.exports.update_product = async (req, res) => {
  const product_id = await Product.findOne({ _id: req.params.id })

  if (product_id) {
    const product = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      image: req.body.image,
      availability: req.body.availability,
      categoryId: req.body.categoryId,
      brand: req.body.brand,
      label: req.body.lable,
    }
    try {
      const updateproduct = await Product.updateOne(
        { _id: req.params.id },
        product
      )
      res.status(200).json(updateproduct)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ message: 'Internal server error' })
    }
  } else {
    res.status(404).send('The product is not found')
  }
}

module.exports.delete_product = async (req, res) => {
  const product_id = await Product.findOne({ _id: req.params.id })
  if (product_id) {
    try {
      await Product.deleteOne({ _id: req.params.id })
      res.status(204)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ message: 'Internal server error' })
    }
  } else {
    res.status(404).send('The product is not found')
  }
}
