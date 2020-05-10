import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import user from './user'
import planetTypeReducer from './PlanetTypeReducer'

const ConfigureStore = (persistedState) => {
    const store = createStore(
        combineReducers({
            user,planetTypeReducer
        }),persistedState,
        applyMiddleware(thunk, logger),
    )
    return store
}

export default ConfigureStore