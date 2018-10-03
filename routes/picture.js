const arangodb = require('../utils/arangodb')


module.exports = async(req, res, next) => {
  
  try {
    const data = await arangodb.query('for p IN display_photo RETURN p', {
    })

    return res.json({
        statusCode: '200',
        msg: 'OK',
        data: data._result
    });
  } catch (error) {
      console.log(error)
    return res.json({
      statusCode: '201',
      msg: '服务器异常'
    });
  }
}
