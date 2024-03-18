const Type = require('../models/type')
const ApiError = require('../error/ApiError')

const create = async (req, res) => {
  const { name, categoryId } = req.body
  console.log('Received data from client:', name, categoryId)
  const type = await Type.create({ name, categoryId })
  return res.json(type)
}

const getAll = async (req, res, next) => {
  try {
    const types = await Type.find().populate('categoryId').sort('categoryId.name')
    return res.json(types)
  } catch (error) {
    next(ApiError.internal('Помилка при отриманні типів'))
  }
}

const deleteType = async (req, res, next) => {
  try {
    const { id } = req.params
    const deletedType = await Type.findByIdAndDelete(id)
    return res.json({ success: true, message: 'Тип успішно видалено', deletedType })
  } catch (error) {
    next(ApiError.internal('Помилка при видаленні типу'))
  }
}

module.exports = {
  create,
  getAll,
  deleteType
}
