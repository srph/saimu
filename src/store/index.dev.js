import {applyMiddleware, createStore, compose} from 'redux';
import reducers from './modules';
import DevTools from 'app/components/DevTools';
import debtors from './debtors/middleware'
import debts from './debts/middleware'

const createStoreWithMiddleware = compose(
  applyMiddleware(
    debtors,
    debts
  ),
  DevTools.instrument()
);
const finalCreateStore = createStoreWithMiddleware(createStore);
const store = finalCreateStore(reducers);
export default store;
