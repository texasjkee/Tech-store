const mongoose = require('mongoose')

const ratingSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    device_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Device',
      required: true
    },
    rate: Number
  },
  { timestamps: true }
)

const Rating = mongoose.model('Rating', ratingSchema)

module.exports = Rating
