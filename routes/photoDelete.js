const arangodb = require('../utils/arangodb');

module.exports = async function(req, res, next) {
  const key = req.body.key;
  let filter, ret, result;

  try {
    if(!key)
      return res.json({statusCode: 201, msg: "操作失败，参数异常。"});

    filter = {_key: key}
    let action = String(function (params) {
      // This code will be executed inside ArangoDB!
      const db = require('@arangodb').db;

      return db._query(`
        FOR v IN display_photo
        FILTER v._key == @key
        UPDATE v 
            WITH {status: 0} IN display_photo
        RETURN NEW
      `, {key: params.key});
    });

    result = await arangodb.transaction(
      {write: 'display_photo'},
      action,
      {key: key}
    );

    ret = result._documents[0];

    return res.json({"statusCode": 200, msg: "ok", "data": ret})
  } catch (e){
    return res.json({statusCode: 201, msg: e.message});
  }
}
