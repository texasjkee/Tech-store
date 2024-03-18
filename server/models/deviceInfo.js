const mongoose = require('mongoose')

const deviceInfoSchema = new mongoose.Schema(
  {
    device_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Device',
      required: true
    },
    title: String,
    description: String
  },
  { timestamps: true }
)

const DeviceInfo = mongoose.model('DeviceInfo', deviceInfoSchema)

module.exports = DeviceInfo
