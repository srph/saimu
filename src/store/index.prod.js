import {applyMiddleware, createStore, compose} from 'redux'
import reducers from './modules'
import debtors from './debtors/middleware'
import debts from './debts/middleware'

const createStoreWithMiddleware = applyMiddleware(debtors, debts);
const finalCreateStore = createStoreWithMiddleware(createStore);
const store = finalCreateStore(reducers);
export default store;
