import {ipcRenderer as ipc} from 'electron'
import history from 'app/history'
import {toast} from 'app/store/toast/module'

export default function debts({dispatch}) {
  return (next) => {
    return (action) => {
      const result = next(action)

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
            if (data.error) {
              dispatch(toast(data.message))
              dispatch({ type: 'debts:create.error', payload: data.errors })
              return
            }

            dispatch(toast('A new debt was added'))
            dispatch({ type: 'debts:create.data', payload: { data, debtorId } })
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
            if (data.error) {
              dispatch(toast(data.errors.amount[0]))
              dispatch({ type: 'transactions:create.error', payload: data.errors })
              return
            }

            dispatch({
              type: 'transactions:create.data',
              payload: { data, debtId: payload.debtId, debtorId: payload.debtorId, }
            })

            dispatch(toast('A new debt transaction was added'))
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