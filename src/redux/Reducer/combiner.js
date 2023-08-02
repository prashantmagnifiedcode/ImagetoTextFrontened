import {applyMiddleware, createStore} from 'redux'
import thunk from 'redux-thunk';
import userData from './user';
import NTW from './internetconnection';
// import userScanData from './userscandata'
import { persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import {combineReducers} from "redux"

const rootReducer = combineReducers({userData,NTW})
const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    blacklist: ['loading'],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer