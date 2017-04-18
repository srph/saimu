const path = require('path')
const homedir = require('os').homedir()
const low = require('lowdb')
const config = low(path.join(homedir, '.loanerconfig.json'))
config.defaults({ config_path: '' }).write()
module.exports = config
