import {applyMiddleware, createStore, compose} from 'redux'
import reducers from './modules'
import toast from './toast/middleware'
import debtors from './debtors/middleware'
import debts from './debts/middleware'

const createStoreWithMiddleware = applyMiddleware(toast, debtors, debts);
const finalCreateStore = createStoreWithMiddleware(createStore);
const store = finalCreateStore(reducers);
export default store;
