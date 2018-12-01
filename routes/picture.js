const arangodb = require('../utils/arangodb')
const options = require('../utils/options')

module.exports = async(req, res, next) => {
  const { album } = req.params
  let aql, vertex, albumKey
  
  try {
    vertex = options.vertex.picture
    aql = `for p IN ${vertex} FILTER p.album==@album and p.status==1 RETURN p`
    
    try {
      albumKey = parseInt(album, 10)
    } catch (e) {
      albumKey = -1
    }

    const data = await arangodb.query(
      aql, 
      {album: albumKey}
    )

    return res.json({
        statusCode: '200',
        msg: 'OK',
        data: data._result
    });
  } catch (error) {
    console.log(error)
    return res.json({
      statusCode: '500',
      msg: '服务器异常'
    });
  }
}
