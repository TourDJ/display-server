const arangodb = require('../utils/arangodb')
const dbUtils = require('../utils/dbUtils')
const options = require('../utils/options')

module.exports = async function(req, res, next) {
  const {photos} = req.body
  let userId, cult, aql, vertex, vertexs, ret, result

  try {
    if(photos && photos.length > 0) {
      // userId = photo.userId
      // if(!userId)
      //   return res.json({statusCode: 201, msg: "操作失败，参数异常。"})

      photos.forEach(function(photo){
        // photo.creator = userId
        photo.createTime = Date.now()
        // photo.updator = userId
        photo.updateTime = Date.now()
        photo.status = 1
      })

      vertex = options.vertex.photo
      if(!vertex || typeof vertex !== "string")
        return res.json({statusCode: 201, msg: "操作失败，数据库表不存在。"})

      cult = JSON.stringify(photos)
      aql = `
        FOR p IN ${cult}
        INSERT p
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

      //If add photos successed, return it
      if(ret == 1) {
        ret = result._documents
      } else
        return res.json({statusCode: 201, msg: "操作失败，数据异常。"})

      return res.json({statusCode: 200, msg: "ok", data: ret})
    } else
      return res.json({statusCode: 201, msg: "操作失败，数据异常。"})
  } catch (e) {
    console.log(e)
    return res.json({statusCode: 201, msg: e.message})
  }  
}