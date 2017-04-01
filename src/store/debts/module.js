import update from 'lodash/update'
import findIndex from 'lodash/findIndex'

const initial = {
  data: [],
  resolved: false
}

export default function debts(state = initial, action) {
  switch(action.type) {
    case 'debts:fetch.data': {
      return {
        data: action.payload,
        resolved: true
      }
    }

    case 'debts:create.data': {
      return {
        ...state,
        data: [...state.data, action.payload]
      }
    }

    case 'transactions:create.data': {
      const index = findIndex(state.data, { id: action.payload.debtId })

      return {
        ...state,
        data: update(state.data, index, debt => ({
          ...debt,
          transactions: [...debt.transactions, action.payload.data]
        })).slice()
      }
    }
  }

  return state
}