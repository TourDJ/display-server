const arangodb = require('../utils/arangodb');
const dbUtils = require('../utils/dbUtils');
const options = require('../utils/options');

module.exports = async function(req, res, next) {
  const { album } = req.body;
  let userId, key, filter, upsert, upsAql, aql, vertex, vertexs,
    ret, result;

  try {

    if(album) {
      // userId = album.userId;
      key = album.key;

      album._key = key;
      // album.updator = userId;
      album.updateTime = Date.now();

      delete album.key;
      // delete album.userId;
    }

    if(!key/* || !userId*/)
      return res.json({statusCode: 201, msg: "操作失败，参数异常。"});

    vertex = options.vertex.album;
    filter = {_key: key};
    upsAql = "{";
    upsert = {};
    for(let b in album) {
      if(b !== '_key') {
        upsAql += b + ": @" + b + ","
        upsert[b] = album[b];
      }
    }
    upsAql = upsAql.trim().substring(0, upsAql.length - 1);
    upsAql += "}";

    vertexs = vertex;
    aql = `
        FOR v IN ${vertex}
        FILTER v.status == 1 and v._key == @_key
        UPDATE v WITH ${upsAql} 
        IN ${vertex} RETURN NEW
    `;

    result = await dbUtils.doAction(arangodb, vertexs, aql, filter, upsert);

    try {
      ret = result._documents[0]
    } catch (e) {
      ret = {};
    }

    return res.json({statusCode: 200, msg: "ok", data: ret})
  } catch (e) {
    return res.json({statusCode: 201, msg: e.message});
  }
}