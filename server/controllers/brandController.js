const Brand = require('../models/brand')
const ApiError = require('../error/ApiError')

const create = async (req, res) => {
  const { name } = req.body
  const brand = await Brand.create({ name })
  return res.json(brand)
}

const getAll = async (req, res) => {
  const brands = await Brand.find()
  return res.json(brands)
}

const deleteBrand = async (req, res, next) => {
  try {
    const { id } = req.params
    const deletedBrand = await Brand.findByIdAndDelete(id)
    return res.json({ success: true, message: 'Бренд успішно видалено', deletedBrand })
  } catch (error) {
    next(ApiError.internal('Помилка при видаленні бренду'))
  }
}

module.exports = {
  create,
  getAll,
  deleteBrand
}
