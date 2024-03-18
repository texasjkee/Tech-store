const mongoose = require('mongoose')
const { Schema } = mongoose

const basketSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: true }
)

const Basket = mongoose.model('Basket', basketSchema)

module.exports = Basket
