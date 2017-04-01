import update from 'lodash/update'
import findIndex from 'lodash/findIndex'

const initial = {
  data: [],
  resolved: false
}

export default function debtors(state = initial, action) {
  switch(action.type) {
    case 'debtors:fetch.data': {
      return {
        ...state,
        data: action.payload,
        resolved: true
      }
    }

    case 'debtors:create.data': {
      return {
        ...state,
        data: [...state.data, action.payload]
      }
    }

    case 'debts:create.data': {
      const {data, debtorId} = action.payload
      const index = findIndex(state.data, { id: debtorId })

      return {
        ...state,
        data: update(state.data, index, debtor => ({
          ...debtor,
          remaining: debtor.remaining + data.amount
        })).slice()
      }
    }

    case 'transactions:create.data': {
      const {data, debtorId} = action.payload
      const index = findIndex(state.data, { id: debtorId })

      return {
        ...state,
        data: update(state.data, index, debtor => ({
          ...debtor,
          remaining: debtor.remaining - data.amount
        })).slice()
      }
    }
  }

  return state
}