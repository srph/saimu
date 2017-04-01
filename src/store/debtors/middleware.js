import {ipcRenderer as ipc} from 'electron'
import history from 'app/history'

export default function debtors(store) {
  return (dispatch) => {
    return (action) => {
      const result = dispatch(action)

      switch(action.type) {
        case 'debtors:fetch!': {
          ipc.once('debtors:get', (event, data) => {
            dispatch({ type: 'debtors:fetch.data', payload: data })
          })

          ipc.send('debtors:get')

          break
        }

        case 'debtors:create!': {
          ipc.once('debtors:create', (event, data) => {
            dispatch({ type: 'debtors:create.data', payload: data })
            history.push(`/d/${data.id}`)
          })

          ipc.send('debtors:create', action.payload)

          break
        }
      }

      return result
    }
  }
}