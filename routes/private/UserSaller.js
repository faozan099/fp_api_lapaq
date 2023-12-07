const { getAllUsers, getDetailUser, updateUser, deleteUser } = require('../../controller/UserSallerController')
const authenticateToken = require('../../middleware/Auth')

const router = require('express').Router()

router.get('/users/seller', getAllUsers)
router.get('/users/seller/:_id',  getDetailUser)
router.patch('/users/seller/:_id', [authenticateToken],  updateUser)
router.delete('/users/seller/:_id', [authenticateToken],  deleteUser)

module.exports = router