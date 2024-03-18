const mongoose = require('mongoose')

const typeSchema = new mongoose.Schema(
  {
    name: String,
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true
    }
  },
  { timestamps: true }
)

const Type = mongoose.model('Type', typeSchema)

module.exports = Type
