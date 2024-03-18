const mongoose = require('mongoose')

const brandSchema = new mongoose.Schema(
  {
    name: String
  },
  { timestamps: true }
)

const Brand = mongoose.model('Brand', brandSchema)

module.exports = Brand
