const Category = require('../models/category')
const ApiError = require('../error/ApiError')

const create = async (req, res, next) => {
  try {
    const { name } = req.body
    const category = await Category.create({ name })
    return res.json(category)
  } catch (error) {
    next(ApiError.internal('Помилка при створенні категорії'))
  }
}

const getAll = async (req, res, next) => {
  try {
    const categories = await Category.find()
    return res.json(categories)
  } catch (error) {
    next(ApiError.internal('Помилка при отриманні категорій'))
  }
}

const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params
    const deletedCategory = await Category.findByIdAndDelete(id)
    return res.json({ success: true, message: 'Категорія успішно видалена', deletedCategory })
  } catch (error) {
    next(ApiError.internal('Помилка при видаленні категорії'))
  }
}

module.exports = {
  create,
  getAll,
  deleteCategory
}
