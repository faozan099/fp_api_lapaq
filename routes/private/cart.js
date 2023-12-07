const { addCart, deleteCart, listCart } = require('../../controller/Cart')
const authenticateToken = require('../../middleware/Auth')

const router = require('express').Router()

router.post('/product/cart', [authenticateToken], addCart)
router.delete('/product/cart/:_id',[authenticateToken], deleteCart)
router.get('/product/cart/:user_buyer_id', listCart)

module.exports = router