const {Menu} = require('electron')

const menu = Menu.buildFromTemplate([{
  label: 'Uomi',
  submenu: [{
    label: 'Select file'
  }, {
    type: 'separator'
  }, {
    label: 'GitHub'
  }, {
    label: 'Support'
  }, {
    label: 'About Uomi'
  }, {
    type: 'separator'
  }, {
    label: 'Exit'
  }]
}])

Menu.setApplicationMenu(menu)