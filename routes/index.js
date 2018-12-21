import { Router } from 'express'

const router = Router()

router.get('/user/:id', require('./user'))
router.post('/upload', require('./upload'))
router.get('/category', require('./category'))
router.post('/category/add', require('./categoryAdd'))
router.get('/album', require('./album'))
router.post('/album/add', require('./albumAdd'))
router.put('/album/edit', require('./albumEdit'))
router.delete('/album/delete', require('./albumDelete'))
router.get('/album/photo/:album', require('./photo'))
router.post('/photo/save', require('./photoAdd'))
router.put('/photo/update', require('./photoUpdate'))
router.delete('/photo/delete', require('./photoDelete'))

module.exports = router