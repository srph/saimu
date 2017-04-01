import {ipcRenderer as ipc} from 'electron'
import history from 'app/history'

export default function debts(store) {
  return (dispatch) => {
    return (action) => {
      const result = dispatch(action)

      switch(action.type) {
        case 'debts:fetch!': {
          ipc.once('debts:get', (event, data) => {
            dispatch({ type: 'debts:fetch.data', payload: data })
          })

          ipc.send('debts:get', action.payload)

          break
        }

        case 'debts:create!': {
          const {data, debtorId} = action.payload

          ipc.once('debts:create', (event, data) => {
            dispatch({ type: 'debts:create.data', payload: data })
            history.push(`/d/${data.debtor_id}`)
          })

          ipc.send('debts:create', {
            ...data,
            debtor_id: debtorId
          })

          break
        }

        case 'transactions:create!': {
          const {payload} = action

          ipc.once('transactions:create', (event, data) => {
            dispatch({
              type: 'transactions:create.data',
              payload: {
                data,
                debtId: payload.debtId,
                debtorId: payload.debtorId,
              }
            })
          })

          ipc.send('transactions:create', {
            ...payload.data,
            debt_id: payload.debtId,
            debtor_id: payload.debtorId
          })

          break
        }
      }

      return result
    }
  }
}