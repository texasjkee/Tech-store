const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

//localhost:7000/api/user/registration
http: router.post('/registration', userController.registration)
//localhost:7000/api/user/login
http: router.post('/login', userController.login)
//http://localhost:7000/api/user/auth
router.get('/auth', authMiddleware, userController.check)

module.exports = router
