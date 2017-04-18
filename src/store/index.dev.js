import {applyMiddleware, createStore, compose} from 'redux'
import reducers from './modules'
import DevTools from 'app/components/DevTools'
import config from './config/middleware'
import toast from './toast/middleware'
import debtors from './debtors/middleware'
import debts from './debts/middleware'

const createStoreWithMiddleware = compose(
  applyMiddleware(
    config,
    toast,
    debtors,
    debts
  ),
  DevTools.instrument()
)
const finalCreateStore = createStoreWithMiddleware(createStore)
const store = finalCreateStore(reducers)
export default store
