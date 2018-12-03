const arangodb = require('../utils/arangodb')
const dbUtils = require('../utils/dbUtils')
const options = require('../utils/options')

module.exports = async function(req, res, next) {
  const {photo, album} = req.body
  let userId, cult, aql, vertex, vertexs, ret, result

  try {
    if(photo && album) {
      // userId = photo.userId
      // if(!userId)
      //   return res.json({statusCode: 201, msg: "操作失败，参数异常。"})

      // photo.creator = userId
      photo.createTime = Date.now()
      // photo.updator = userId
      photo.updateTime = Date.now()
      photo.album = album
      photo.status = 1
      photo.views = 0
    } else
      return res.json({statusCode: 201, msg: "操作失败，数据异常。"})

    vertex = options.vertex.photo
    if(!vertex || typeof vertex !== "string")
      return res.json({statusCode: 201, msg: "操作失败，数据库表不存在。"})

    cult = JSON.stringify(photo)
    aql = `
      INSERT ${cult}
      INTO ${vertex}
      RETURN NEW
    `
    vertexs = vertex

    result = await dbUtils.doAction(arangodb, vertexs, aql, null, null)

    try {
      ret = result._extra.stats.writesExecuted
    } catch (e) {
      ret = -1
    }

    //If add photo successed, return it
    if(ret == 1) {
      ret = result._documents
    } else
      return res.json({statusCode: 201, msg: "操作失败，数据异常。"})

    res.json({statusCode: 200, msg: "ok", data: ret})
  } catch (e) {
    return res.json({statusCode: 201, msg: e.message})
  }  
}