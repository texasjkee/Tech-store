const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const Basket = require('../models/basket')
const tokenController = require('../controllers/token/tokenController')

ACCESS_KEY = process.env.ACCESS_KEY
REFRESH_KEY = process.env.REFRESH_KEY

const registration = async (req, res, next) => {
  console.log('yo')
  const { email, password, role } = req.body
  if (!email || !password) {
    return next(ApiError.badRequest('Некоректний емейл чи пароль!'))
  }
  try {
    const candidate = await User.findOne({ email })
    if (candidate) {
      return next(ApiError.badRequest('Користувач з таким email уже існує!'))
    }
    const hashPassword = await bcrypt.hash(password, 5)
    const user = await User.create({ email, role, password: hashPassword })
    // console.log('Registration user:', user)

    // Створення корзини для нового користувача
    const basket = await Basket.create({ userId: user.id })
    //console.log('Basket created:', basket)

    // Зберігання токена
    const token = await tokenController.saveToken({
      user: user.id,
      email: user.email,
      role: user.role
    })
    return res.json({ token })
  } catch (error) {
    next(ApiError.internal('Помилка при реєстрації користувача'))
  }
}

const login = async (req, res, next) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (!user) {
    return next(ApiError.internal('Такий користувач не найдений!'))
  }
  let comparePassword = bcrypt.compareSync(password, user.password)
  if (!comparePassword) {
    return next(ApiError.internal('Вказаний невірний пароль!'))
  }
  const token = await tokenController.saveToken({
    user: user.id,
    email: user.email,
    role: user.role
  }) // Зберігаємо токени при вході
  return res.json({ token }) // Повертаємо токени відповіддю
}

//Функція check отримує інформацію про користувача, яка була витягнута з JWT токену,
//що був переданий через middleware для аутентифікації. Після цього функція створює
//новий JWT токен на основі отриманої інформації про користувача і повертає його відповідь
//у вигляді JSON об'єкта.

const check = async (req, res, next) => {
  try {
    const user = req.user // Отримуємо дані користувача з middleware аутентифікації
    const payload = { user: user.user, email: user.email, role: user.role }
    const token = await tokenController.saveToken(payload)
    if (!token) {
      throw new Error('Failed to save token')
    }
    return res.json({ token })
  } catch (error) {
    console.error('Error during token generation:', error)
    return next(ApiError.internal('Помилка при створенні токена'))
  }
}

module.exports = {
  registration,
  login,
  check
}
