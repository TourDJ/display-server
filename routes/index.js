import { Router } from 'express'

const router = Router()

router.get('/category', require('./category.js'))
router.all('/picture', require('./picture.js'))

module.exports = router