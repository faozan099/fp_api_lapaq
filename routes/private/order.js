const { addOrder, getOrderUser, getOrderSeller } = require('../../controller/Order')
const authenticateToken = require('../../middleware/Auth')

const router = require('express').Router()

router.post('/product/order',[authenticateToken], addOrder)
router.get('/product/order/:user_buyer_id', getOrderUser)
router.get('/product/order/seller/:user_seller_id', getOrderSeller)

module.exports = router