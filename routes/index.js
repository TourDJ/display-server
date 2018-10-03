import {Router} from 'express'

const router = module.exports = Router()

router.all('/picture', require('./picture.js'))
