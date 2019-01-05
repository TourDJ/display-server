const arangodb = require('../utils/arangodb')
const dbUtils = require('../utils/dbUtils')
const options = require('../utils/options')

module.exports = async function(req, res, next) {
  const { album } = req.body
  let userId, cult, aql, vertex, vertexs, ret, result

  try {
    if(album) {
      // userId = album.userId
      // album.creator = userId
      album.createTime = Date.now()
      // album.updator = userId
      album.updateTime = Date.now()
      album.status = 1
      album.start = 0
      album.views = 0
    } else
      return res.json({statusCode: 201, msg: "操作失败，数据异常。"})

    // if(!userId)
    //   return res.json({statusCode: 201, msg: "操作失败，参数异常。"})

    vertex = options.vertex.album
    if(!vertex || typeof vertex !== "string")
      return res.json({statusCode: 201, msg: "操作失败，数据库表不存在。"})

    cult = JSON.stringify(album)
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

    //If add album successed, return it
    if(ret == 1) {
      ret = result._documents
    } else
      return res.json({statusCode: 201, msg: "操作失败，数据异常。"})

    return res.json({statusCode: 200, msg: "ok", data: ret})
  } catch (e) {
    return res.json({statusCode: 201, msg: e.message})
  }  
}