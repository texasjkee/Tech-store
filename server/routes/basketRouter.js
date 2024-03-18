const express = require('express')
const router = express.Router()
const basketController = require('../controllers/basketController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/add', authMiddleware, basketController.addToBasket)
router.get('/items', authMiddleware, basketController.getBasketTotalPrice)
router.delete('/remove', authMiddleware, basketController.removeFromBasket)

module.exports = router
