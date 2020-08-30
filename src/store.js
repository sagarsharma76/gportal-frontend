import { createStore,combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import AuthenticationReducer from './state/AuthenticationReducer';

const loggerMiddleware = createLogger();

const rootReducers = combineReducers({
    //state name: reducer function
    // authState: AuthReducer,
    authenticationReducer: AuthenticationReducer,
    //state items: state Reducer
});


let store = createStore(rootReducers,applyMiddleware(thunk,loggerMiddleware));
export default store;