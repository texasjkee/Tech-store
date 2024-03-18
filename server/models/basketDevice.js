const mongoose = require('mongoose')

const basketDeviceSchema = new mongoose.Schema(
  {
    device_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Device',
      required: true
    },
    basket_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Basket',
      required: true
    }
  },
  { timestamps: true }
)

const BasketDevice = mongoose.model('BasketDevice', basketDeviceSchema)

module.exports = BasketDevice
