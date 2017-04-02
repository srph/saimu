import {ipcRenderer as ipc} from 'electron'
import history from 'app/history'
import {toast} from 'app/store/toast/module'

export default function debtors({dispatch}) {
  return (next) => {
    return (action) => {
      const result = next(action)

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
            console.log(toast('The debtor was successfully registered'), dispatch)
            dispatch(toast('The debtor was successfully registered'))
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