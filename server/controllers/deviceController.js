const Device = require('../models/device')
const DeviceInfo = require('../models/deviceInfo')
const ApiError = require('../error/ApiError')
const mongoose = require('mongoose')
// Генерує випадкові id для картинок
const uuid = require('uuid')
const path = require('path')

const create = async (req, res, next) => {
  try {
    const { name, price, brandId, typeId, info } = req.body
    const images = req.files['img']

    let fileNames = []

    // Збереження кожного зображення та отримання імен файлів
    await Promise.all(
      images.map(async img => {
        let fileName = uuid.v4() + '.jpg'
        await img.mv(path.resolve(__dirname, '..', 'static', fileName))
        fileNames.push(fileName)
      })
    )

    const device = new Device({ name, price, brandId, typeId, img: fileNames })

    let parsedInfo = info ? JSON.parse(info) : null
    if (parsedInfo) {
      const createdDeviceInfo = await Promise.all(
        parsedInfo.map(
          async i =>
            await DeviceInfo.create({
              title: i.title,
              description: i.description,
              device_id: device._id
            })
        )
      )

      device.deviceInfo = createdDeviceInfo.map(info => info._id)
      await device.save()
    }

    return res.json(device)
  } catch (err) {
    console.error('Error adding device:', err)
    next(ApiError.badRequest(err.message))
  }
}

const getAll = async (req, res) => {
  const { brandId, typeId, limit, page } = req.query
  let offset = (page || 1) * (limit || 9) - (limit || 9)
  let devices = []
  let totalDevicesCount = 0

  if (!brandId && !typeId) {
    devices = await Device.find()
      .limit(Number(limit))
      .skip(offset)
      .populate('typeId')
      .populate('brandId')
    totalDevicesCount = await Device.countDocuments()
  } else if (brandId && !typeId) {
    devices = await Device.find({ brandId })
      .limit(Number(limit))
      .skip(offset)
      .populate('typeId')
      .populate('brandId')
    totalDevicesCount = await Device.countDocuments({ brandId })
  } else if (!brandId && typeId) {
    devices = await Device.find({ typeId })
      .limit(Number(limit))
      .skip(offset)
      .populate('typeId')
      .populate('brandId')
    totalDevicesCount = await Device.countDocuments({ typeId })
  } else if (brandId && typeId) {
    devices = await Device.find({ brandId, typeId })
      .limit(Number(limit))
      .skip(offset)
      .populate('typeId')
      .populate('brandId')
    totalDevicesCount = await Device.countDocuments({ brandId, typeId })
  }
  return res.json({ devices: devices, totalDevicesCount: totalDevicesCount })
}

const getOne = async (req, res) => {
  try {
    const { id } = req.params

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: 'Invalid ObjectId format' })
    }

    const device = await Device.findOne({ _id: id }).populate({
      path: 'deviceInfo',
      model: 'DeviceInfo',
      match: { device_id: id }
    })

    if (!device) {
      return res.status(404).json({ error: 'Device not found' })
    }

    //console.log('Device:', device)
    return res.json(device)
  } catch (error) {
    console.error('Error:', error.message)
    return res.status(500).json({ error: 'Server error' })
  }
}

const deleteDeviceById = async (req, res, next) => {
  try {
    const { id } = req.params
    const deletedDevice = await Device.findByIdAndDelete(id)
    if (!deletedDevice) {
      return next(ApiError.notFound('Девайс не знайдено'))
    }
    return res.json({ success: true, message: 'Девайс успішно видалено' })
  } catch (error) {
    next(ApiError.internal('Помилка при видаленні девайса'))
  }
}

module.exports = {
  create,
  getAll,
  getOne,
  deleteDeviceById
}
