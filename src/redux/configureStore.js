import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import user from './user'
import planetTypeReducer from './PlanetTypeReducer'
import planetReducer from './PlanetReducer'

const ConfigureStore = (persistedState) => {
    const store = createStore(
        combineReducers({
            user,planetTypeReducer,planetReducer
        }),persistedState,
        applyMiddleware(thunk, logger),
    )
    return store
}

// const ConfigureStore = () => {
//     const store = createStore(
//         combineReducers({
//             user,planetTypeReducer,planetReducer
//         }),
//         applyMiddleware(thunk, logger),
//     )
//     return store
// }



export default ConfigureStore
