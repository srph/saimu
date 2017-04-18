import {applyMiddleware, createStore, compose} from 'redux'
import reducers from './modules'
import config from './config/middleware'
import toast from './toast/middleware'
import debtors from './debtors/middleware'
import debts from './debts/middleware'

const createStoreWithMiddleware = applyMiddleware(config, toast, debtors, debts)
const finalCreateStore = createStoreWithMiddleware(createStore)
const store = finalCreateStore(reducers)
export default store
