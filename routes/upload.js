const fs = require('fs')
const path = require('path')
import { uploadFile } from '../utils/func'

module.exports = async function(req, res, next) {
  let filename, result

  try {
    filename = 'file'
    result = await uploadFile(req, res, filename)
    res.json({"statusCode": 200, "msg": "ok", "result": result})
  } catch (e) {
    return res.json({"statusCode": 201, "msg": e.message})
  }
}