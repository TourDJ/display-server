import fs from 'fs'

const argv = {}

const getValue = (equalIndex, val) => {
  var value = val.substring(equalIndex + 1)
  return value == '' ? true : value
}

process.argv.forEach((val, index, array) => {
  if (val.substring(0, 2) == '--') {
    var equalIndex = val.indexOf('=')
    if (equalIndex < 0) equalIndex = val.length
    argv[val.substring(2, equalIndex)] = getValue(equalIndex, val)
  }
})

const configPath = argv.config || 'data/config/conf.json'
const configFile = JSON.parse(fs.readFileSync(configPath))

module.exports = Object.assign(configFile, argv)

