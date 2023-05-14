const Product = require('../models/Product')
const { Category } = require('./../models/category')

module.exports.get_all_categories = async (req, res) => {
  try {
    const categories = await Category.find()
    res.status(200).json(categories)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

module.exports.get_category_by_id = async (req, res) => {
  const id = req.params.id
  try {
    const category = await Category.find()
    const productsInCategory = await Product.find({ categoryId: category._id })
    res.status(200).json({ category, productsInCategory })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

module.exports.add_category = async (req, res) => {
  const { name, description } = req.body
  try {
    const category = await Category.create({ name, description })
    res.status(201).json({ message: 'category added successfully', category })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

module.exports.delete_category = async (req, res) => {
  const id = req.params.id
  try {
    const ackCategory = await Category.deleteOne({ _id: id })
    console.log(ackCategory)
    res.status(204).json({ message: 'category deleted successfully' })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

module.exports.update_category = async (req, res) => {
  const id = req.params.id
  const { name, description } = req.body
  try {
    const ackCategory = await Category.updateOne(
      { _id: id },
      { name, description }
    )
    console.log(ackCategory)
    res.status(200).json({ message: 'category updated successfully' })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Internal server error' })
  }
}
