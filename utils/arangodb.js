var Database = require("arangojs").Database
var arangodb = new Database({url:"http://root:root@127.0.0.1:8529"})

arangodb.useDatabase("display")
arangodb.useBasicAuth("root", "root")

module.exports = arangodb
