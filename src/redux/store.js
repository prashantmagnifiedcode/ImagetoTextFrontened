import {createStore} from 'redux'
import {persistStore} from 'redux-persist';
import persistedReducer from './Reducer/combiner'

const store= createStore(persistedReducer)

let persistor = persistStore(store);
export {store, persistor}