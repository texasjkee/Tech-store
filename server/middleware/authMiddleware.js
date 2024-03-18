//authMiddleware.js
const jwt = require('jsonwebtoken')

ACCESS_KEY = process.env.ACCESS_KEY
REFRESH_KEY = process.env.REFRESH_KEY

module.exports = function (req, res, next) {
  if (req.method === 'OPTIONS') {
    next()
  }
  try {
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
      return res.status(401).json({ message: 'Не авторизований' })
    }
    const decoded = jwt.verify(token, ACCESS_KEY)
    //console.log('Decoded user in authMiddleware:', decoded)
    req.user = decoded
    next()
  } catch (err) {
    console.error('Error in authMiddleware:', err)
    res.status(401).json({ message: 'не авторизований' })
  }
}
