import { createStore,combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import AuthenticationReducer from './state/AuthenticationReducer';
import HolderGroupMasterReducer from './state/HolderGroupMasterReducer';
import AccountHolderMasterReducer from './state/AccountHolderMasterReducer'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const loggerMiddleware = createLogger();

const persistConfig = {
    key: 'root',
    storage,
}

const rootReducers = combineReducers({
    //state name: reducer function
    // authState: AuthReducer,
    authenticationReducer: AuthenticationReducer,
    holderGroupMasterReducer:HolderGroupMasterReducer,
    accountHolderMasterReducer:AccountHolderMasterReducer
    //state items: state Reducer
});

const persistedReducer = persistReducer(persistConfig, rootReducers)

let store = createStore(persistedReducer,applyMiddleware(thunk,loggerMiddleware));

let persistor = persistStore(store)

export default { store,persistor
}