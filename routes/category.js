const arangodb = require('../utils/arangodb')
const options = require('../utils/options')

module.exports = async(req, res, next) => {
  let aql, vertex
  
  try {
    vertex = options.vertex.category
    aql = `for p IN ${vertex} FILTER p.status==1 SORT p.order RETURN p`
    const data = await arangodb.query(aql, {})

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