import {combineReducers} from 'redux'
import config from './config/module'
import toast from './toast/module'
import debtors from './debtors/module'
import debts from './debts/module'

export default combineReducers({
  config,
  toast,
  debtors,
  debts,
})
