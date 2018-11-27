const arangodb = require('../utils/arangodb')

module.exports = async(req, res, next) => {
  const category = req.query.category
  
  try {
    const data = await arangodb.query(
      `FOR a IN display_album 
      FILTER a.category==@category and a.status==1
      RETURN a`, 
      {category: category}
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