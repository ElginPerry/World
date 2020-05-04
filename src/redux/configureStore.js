import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import user from './user'

const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            user,
        }),
        applyMiddleware(thunk, logger),
    )
    return store
}

export default ConfigureStore
