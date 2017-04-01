import {combineReducers} from 'redux'
import debtors from './debtors/module'
import debts from './debts/module'

export default combineReducers({
  debtors,
  debts
})