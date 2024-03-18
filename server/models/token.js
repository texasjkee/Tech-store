const mongoose = require('mongoose')
const { Schema } = mongoose
const path = require('path')

const generalSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  refreshToken: { type: String, required: true }
})

const modelName = path.basename(__filename, '.js')
const model = mongoose.model(modelName, generalSchema)

const RegUser = async (user, refreshToken) => {
  const response = await model.create({ user: user, refreshToken: refreshToken })
  console.log('response:', response)
  return response
}

const findOneToken = async user => {
  const response = await model.findOne({ user: user })
  return response
}

const updateOne = async (user, refreshToken) => {
  const response = await model.updateOne({ user: user }, { refreshToken: refreshToken })
  return response
}

const deleteOne = async refreshToken => {
  const response = await model.deleteOne({ refreshToken })
  return response
}

module.exports = {
  RegUser,
  findOneToken,
  updateOne,
  deleteOne
}
