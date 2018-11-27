const arangodb = require('../utils/arangodb')
const dbUtils = require('../utils/dbUtils')
const options = require('../utils/options')

module.exports = async function(req, res, next) {
  const album = req.body
  let userId, cult, aql, vertex, vertexs, ret, result

  try {
    if(album) {
      // userId = album.userId
      // album.creator = userId
      album.createTime = Date.now()
      // album.updator = userId
      album.updateTime = Date.now()
      album.status = 1
      // album.views = 0
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

    // try {
    //   ret = result._extra.stats.writesExecuted
    // } catch (e) {
    //   ret = -1
    // }

    // //If add album successed, query all albums belong this category
    // if(ret == 1) {
    //   let newAlbum = result._documents[0]
    //   let key = newAlbum._key
    //   let category = newAlbum.category
    //   let cover = newAlbum.cover.filepath
    //   let albums
      
    //   //Query category
    //   vertexs = options.vertex.category
    //   aql = `
    //     FOR p IN ${vertexs} 
    //     FILTER p._key=='${category}'
    //     RETURN p  
    //   `
    //   result = await dbUtils.doAction(arangodb, vertexs, aql, null, null)
    //   if(result._countQuery == 1) {
    //     albums = result._documents[0].albums
    //     if(!albums || !(albums instanceof Array))
    //       albums = []

    //     albums.push({
    //       album_key: key,
    //       pictures: 0,
    //       cover: cover
    //     })
    //     albums = JSON.stringify(albums)

    //     //Update category album
    //     aql = `
    //       UPDATE {"_key": '${category}'} 
    //       WITH { albums: ${albums} } 
    //       IN ${vertexs} RETURN NEW      
    //     `     
    //     result = await dbUtils.doAction(arangodb, vertexs, aql, null, null)
    //     ret   = result._documents[0]
    //   } else
    //     return res.json({statusCode: 201, msg: "操作失败，数据异常。"})
    // } else
    //   return res.json({statusCode: 201, msg: "操作失败，数据异常。"})

    res.json({statusCode: 200, msg: "ok", data: ret})
  } catch (e) {
    return res.json({statusCode: 201, msg: e.message})
  }  
}