const path = require('path')
import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'
const config = require('./config/config')

const app = module.exports = express()

app.use(express.static("public"))

//app.use('/home', require('./arangodb_proxy'))

app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
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
 * 错误处理
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
 * 404处理
 */
app.use((req, res) => {
 // console.log(404)
  res.json({error: '404: NOT_FOUND'})
})

app.listen(config.port, () => {
  console.log('account service listening on port ' + config.port)
})

