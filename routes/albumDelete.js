const arangodb = require('../utils/arangodb')
const dbUtils = require('../utils/dbUtils')
const options = require('../utils/options')

module.exports = async function(req, res, next) {
  const {key} = req.body
  let userId, cult, aql, vertex, vertexs, ret, result

  try {
    if(!key)
      return res.json({statusCode: 201, msg: "操作失败，数据异常。"})

    // if(!userId)
    //   return res.json({statusCode: 201, msg: "操作失败，参数异常。"})

    vertex = options.vertex.album
    if(!vertex || typeof vertex !== "string")
      return res.json({statusCode: 201, msg: "操作失败，数据库表不存在。"})

    aql = `
      UPDATE {"_key": "${key}"} 
      WITH { status: 0 } 
      IN ${vertex} RETURN NEW
    `
    vertexs = vertex

    result = await dbUtils.doAction(arangodb, vertexs, aql, null, null)

    try {
      ret = result._extra.stats.writesExecuted
    } catch (e) {
      ret = -1
    }

    //If add album successed, query all albums belong this category
    if(ret == 1) {
      ret = result._documents[0]
    } else
      return res.json({statusCode: 201, msg: "操作失败，数据异常。"})

    res.json({statusCode: 200, msg: "ok", data: ret})
  } catch (e) {
    return res.json({statusCode: 201, msg: e.message})
  }  
}