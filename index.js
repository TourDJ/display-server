const path = require('path')
import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'
const config = require('./config/config')

const app = module.exports = express()

//upload path
global.uploadPath = path.join(__dirname, 'upload');
//static resource
app.use(express.static("public"))
app.use(express.static(uploadPath))

//app.use('/home', require('./arangodb_proxy'))

app.use(morgan('dev'))
app.use(cors())
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))
// for parsing application/json
app.use(bodyParser.json())
app.use(bodyParser.json({type: 'application/*+json'}))
app.use(bodyParser.json({type: 'text/html'}))
app.use(bodyParser.json({type: 'text/plain'}))


/*app.use((req, res, next) => {*/
  //res.locals.app = {request}
  //next()
/*})*/

app.use(require('./routes'))

/**
 * ������
 */
app.use((err, req, res, next) => {
  console.log(err)
  if (typeof err === 'string') {
    res.json({ error: err })
  } else if (typeof err === 'object') {
    res.json({ error: '500: EXCEPTION_ERROR' })
  }
})

/**
 * 404����
 */
app.use((req, res) => {
 // console.log(404)
  res.json({error: '404: NOT_FOUND'})
})

app.listen(config.port, () => {
  console.log('account service listening on port ' + config.port)
})

