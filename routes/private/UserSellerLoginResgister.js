const { registerSeller, loginSaller } = require('../../controller/LoginRegisterSellerController')
const authenticateToken = require('../../middleware/Auth')
const multer = require('multer')

const storage = multer.memoryStorage()
const upload= multer({storage: storage})

const router = require('express').Router()

router.post('/register/seller', [authenticateToken, upload.single('avatar')], registerSeller)
router.post('/login/seller', [authenticateToken], loginSaller)

module.exports = router