const arangodb = require('../utils/arangodb')
const options = require('../utils/options')

module.exports = async(req, res, next) => {
  const { id } = req.params

  let aql, vertex
  
  try {
    vertex = options.vertex.user
    aql = `for p IN ${vertex} FILTER p.userid==@userid and p.status==1 RETURN p`

    const data = await arangodb.query(
      aql, 
      {userid: id}
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