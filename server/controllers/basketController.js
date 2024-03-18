const Basket = require('../models/basket')
const BasketDevice = require('../models/basketDevice')
const Device = require('../models/device')
const ApiError = require('../error/ApiError')

const addToBasket = async (req, res, next) => {
  try {
    const { device_id, quantity } = req.body
    const { user } = req // Отримуємо дані про користувача з middleware автентифікації
    console.log('{ user }:', { user })

    // Перевірка, чи існує користувач та пристрій
    const basket = await Basket.findOne({ userId: user.user })
    const device = await Device.findById(device_id)
    console.log('basket:', basket)
    if (!basket || !device) {
      return next(ApiError.notFound('Корзина або пристрій не знайдені'))
    }

    // Додаємо пристрій до корзини
    const basketDevice = await BasketDevice.create({
      device_id,
      basket_id: basket.id,
      quantity: quantity || 1
    })

    return res.json({ success: true, basketDevice, message: 'Пристрій успішно додано до корзини' })
  } catch (error) {
    next(ApiError.internal('Помилка під час додавання пристрою до корзини'))
  }
}

const getBasketTotalPrice = async (req, res, next) => {
  try {
    const { user } = req
    console.log('{ user }:', { user })

    const basket = await Basket.findOne({ userId: user.user })

    if (!basket) {
      return next(ApiError.notFound('Корзина не знайдена'))
    }

    const basketItems = await BasketDevice.find({ basket_id: basket.id })

    const detailedBasketItems = []
    let totalPrice = 0

    for (const item of basketItems) {
      const device = await Device.findById(item.device_id)

      if (device) {
        detailedBasketItems.push({
          device_id: device._id,
          img: device.img[0],
          name: device.name,
          price: device.price,
          quantity: item.quantity
        })

        totalPrice += device.price * item.quantity
      }
    }

    // Повертаємо повну інформацію про товари та загальну суму
    return res.json({ basketItems: detailedBasketItems, totalPrice })
  } catch (error) {
    next(ApiError.internal('Помилка при отриманні загальної суми цін у корзині'))
  }
}

const removeFromBasket = async (req, res, next) => {
  try {
    const { user } = req
    const { device_id } = req.body
    const basket = await Basket.findOne({ userId: user.user })

    if (!basket) {
      return next(ApiError.notFound('Корзина не знайдена'))
    }

    if (!device_id || device_id.length === 0) {
      return next(ApiError.badRequest('Не вказані товари для видалення'))
    }

    // Перевіряємо, чи користувач хоче видалити один товар
    if (device_id.length === 1) {
      const deleteResult = await BasketDevice.deleteOne({
        basket_id: basket.id,
        device_id: device_id[0]
      })

      if (deleteResult.deletedCount === 0) {
        return next(ApiError.notFound('Товар не знайдений у корзині'))
      }

      return res.json({ success: true, message: 'Товар успішно видалений з корзини' })
    }

    // Видаляємо декілька товарів
    const deleteResult = await BasketDevice.deleteMany({ basket_id: basket.id, device_id })
    console.log(deleteResult)
    if (deleteResult.deletedCount === 0) {
      return next(ApiError.notFound('Товари не знайдені у корзині'))
    }

    return res.json({ success: true, message: 'Товари успішно видалені з корзини' })
  } catch (error) {
    next(ApiError.internal('Помилка при видаленні товарів з корзини'))
  }
}

module.exports = {
  addToBasket,
  getBasketTotalPrice,
  removeFromBasket
}
