import update from 'lodash/update'
import findIndex from 'lodash/findIndex'

const initial = {
  data: [],
  errors: {},
  creating: false,
  resolved: false
}

export default function debts(state = initial, action) {
  switch(action.type) {
    case 'debts:fetch.data': {
      return {
        ...state,
        data: action.payload,
        errors: {},
        resolved: true
      }
    }

    case 'debts:create!': {
      return {
        ...state,
        errors: {}
      }
    }

    case 'debts:create.data': {
      return {
        ...state,
        data: [...state.data, action.payload.data]
      }
    }

    case 'debts:create.error': {
      return {
        ...state,
        errors: action.payload
      }
    }

    case 'transactions:mode': {
      return {
        ...state,
        creating: !state.creating
      }
    }

    case 'transactions:create!': {
      return {
        ...state,
        errors: {}
      }
    }

    case 'transactions:create.data': {
      const index = findIndex(state.data, { id: action.payload.debtId })

      return {
        ...state,
        data: update(state.data, index, debt => ({
          ...debt,
          transactions: [...debt.transactions, action.payload.data]
        })).slice(),
        creating: false
      }
    }

    case 'transactions:create.error': {
      return {
        ...state,
        errors: action.payload
      }
    }
  }

  return state
}
