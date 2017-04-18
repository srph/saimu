import {ipcRenderer as ipc} from 'electron'
import history from 'app/history'
import config from 'app/config'
import {toast} from 'app/store/toast/module'

export default function configMiddleware({dispatch}) {
  return (next) => {
    return (action) => {
      const result = next(action)

      switch(action.type) {
        case 'config:fetch!': {
          ipc.once('config:get', (event, data) => {
            if (data.error) {
              history.push('/intro')
              return
            }

            dispatch({ type: 'config:fetch.data', payload: data })
          })

          ipc.send('config:get')

          break
        }

        case 'config:create!': {
          ipc.once('config:create', (event, data) => {
            if (data.error) {
              dispatch(toast(data.message))
              return
            }

            dispatch({ type: 'config:create.data', payload: data })
            dispatch(toast(`Hi there! Welcome to ${config.app.title}!`))
            history.push('/')
          })

          ipc.send('config:create', action.payload)

          break
        }
      }

      return result
    }
  }
}
