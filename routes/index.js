import { Router } from 'express'

const router = Router()

router.post('/upload', require('./upload'))
router.get('/category', require('./category'))
router.get('/picture', require('./picture.js'))
router.get('/album', require('./album'))
router.post('/album/add', require('./albumAdd'))

module.exports = router