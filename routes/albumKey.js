const arangodb = require('../utils/arangodb')

//Get the album info by album's key.
module.exports = async (req, res, next) => {
  const { key } = req.params
  
  try {
    const data = await arangodb.query(
      `FOR a IN display_album 
      FILTER a._key==@key and a.status==1
      RETURN a`, 
      {key: key}
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