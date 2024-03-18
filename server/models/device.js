const mongoose = require('mongoose')

const deviceSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    rating: Number,
    img: [String],
    typeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Type',
      required: true
    },
    brandId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Brand',
      required: true
    },
    deviceInfo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'DeviceInfo' }]
  },
  { timestamps: true }
)

const Device = mongoose.model('Device', deviceSchema)

module.exports = Device
