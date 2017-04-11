import {app, BrowserWindow} from 'electron'
import ipc from './ipc'
import menu from './menu'

let win = null

app.on('ready', () => {
  win = new BrowserWindow({
    width: 1024,
    height: 768,
    resizable: false,
    fullscreenable: false,
    // titleBarStyle: 'hidden'
  })

  win.loadURL(`file://${__dirname}/../public/index.html`)
  win.webContents.openDevTools()

  win.on('closed', () => {
    win = null
  })
})

app.on('windows-all-closed', () => {
  app.quit()
})
