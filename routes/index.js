const router = require("express").Router();
const loginRegister = require("./public/LoginRegister");
const userBuyer = require('./private/UserBuyer')
const loginRegisterSeller = require('./private/UserSellerLoginResgister')
const userSeller = require('./private/UserSaller')
const produk = require("./public/Produk")
const comment = require('./private/comments')
const cart = require('./private/cart')
const order = require('./private/order');
const { responseSuccess } = require("../utils/response");

router.get("/", (req, res) => {
  responseSuccess(200, null, "Welcome to api Lapaq", res)
});

router.use(loginRegister);
router.use(userBuyer)
router.use(loginRegisterSeller)
router.use(userSeller)
router.use(produk)
router.use(comment)
router.use(cart)
router.use(order)

module.exports = router;
