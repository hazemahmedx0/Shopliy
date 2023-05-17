const { Product } = require('../models/Product')
const { Category } = require('./../models/category')

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find()
    res.status(200).json({ categoriesNo: categories.length, categories })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

const getCategoryById = async (req, res) => {
  const id = req.params.id
  try {
    const category = await Category.findById(id)
    if (category) {
      const productsInCategory = await Product.find({ categoryId: id })
      res.status(200).json({ category, productsInCategory })
    } else {
      res.status(404).send({ message: 'Category not found' })
    }
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

const addCategory = async (req, res) => {
  const { name, description } = req.body
  try {
    const category = await Category.create({ name, description })
    res.status(201).json({ message: 'Category added successfully', category })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

const deleteCategory = async (req, res) => {
  const id = req.params.id
  try {
    const category = await Category.findOne({ _id: id })
    if (category) {
      const result = await Category.deleteOne({ _id: id })
      if (!result.acknowledged) {
        return res.status(500).json({ message: 'Failed to delete Category' })
      }
      res.status(204).json({ message: 'Category deleted successfully.' })
    } else {
      res.status(404).send({ message: 'Category not found' })
    }
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

const updateCategory = async (req, res) => {
  const id = req.params.id
  const updatedCategoryFields = req.body
  try {
    Object.keys(updatedCategoryFields).forEach((key) => {
      if (
        updatedCategoryFields[key] === '' ||
        updatedCategoryFields[key] === undefined
      ) {
        delete updatedCategoryFields[key]
      }
    })
    const category = await Category.findOne({ _id: id })
    if (category) {
      const result = await Category.updateOne(
        { _id: id },
        updatedCategoryFields
      )
      if (!result.acknowledged) {
        return res.status(500).json({ message: 'Failed to update Category' })
      }
      const updatedCategory = await Category.findById(id)

      res
        .status(200)
        .json({ message: 'Category updated successfully', updatedCategory })
    } else {
      res.status(404).send({ message: 'Category not found' })
    }
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

module.exports = {
  getAllCategories,
  getCategoryById,
  addCategory,
  updateCategory,
  deleteCategory,
}
