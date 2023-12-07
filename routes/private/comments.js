const { addComment, deleteComment, getComment, editComment } = require('../../controller/Comment')
const multer = require('multer')
const authenticateToken = require('../../middleware/Auth')

const router = require('express').Router()

const storage = multer.memoryStorage()
const upload = multer({storage: storage})

router.post('/comment', [authenticateToken, upload.single('image')], addComment)
router.get('/comment', getComment)
router.delete('/comment/:_id',[authenticateToken], deleteComment)
router.patch('/comment/:_id',[authenticateToken], editComment)

module.exports = router