import {combineReducers} from 'redux'
import toast from './toast/module'
import debtors from './debtors/module'
import debts from './debts/module'

export default combineReducers({
  toast,
  debtors,
  debts
})