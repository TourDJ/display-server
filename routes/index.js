import { Router } from 'express'

const router = Router()

router.get('/category', require('./category.js'))
router.get('/picture', require('./picture.js'))
router.post('/upload', require('./upload'));
router.post('/album/add', require('./albumAdd'))

module.exports = router