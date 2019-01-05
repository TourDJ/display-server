
require('child_process').exec( `nodemon --watch routes --exec babel-node index.js --start --config=config/conf.json` );