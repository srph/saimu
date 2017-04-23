const fs = require('fs')
const path = require('path')
const ipc = require('../wrapped')
const config = require('./config-db')
const db = require('./app-db')
const homedir = require('os').homedir()

ipc.on('config:get', (event, data) => {
  const path = config.get('config_path').value()

  if (!path) {
    event.sender.send('config:get', { error: true })
    return
  }

  db.set(path)
  event.sender.send('config:get', config.value())
})

ipc.on('config:create', (event, data) => {
  const file = path.join(data.path || homedir, '.loanerdata')
  config.set('config_path', file).write()
  db.set(file)
  event.sender.send('config:create', config.value())
})

ipc.on('config:update', (event, data) => {
  console.log('Updated')
  const file = path.join(data.path, '.loanerdata')
  config.set('config_path', file).write()
  db.set(file)
  event.sender.send('config:update', config.value())
})
