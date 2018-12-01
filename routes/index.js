import { Router } from 'express'

const router = Router()

router.post('/upload', require('./upload'))
router.get('/category', require('./category'))
router.post('/category/add', require('./categoryAdd'))
router.get('/album', require('./album'))
router.post('/album/add', require('./albumAdd'))
router.post('/album/delete', require('./albumDelete'))
router.get('/picture/:album', require('./picture.js'))

module.exports = router