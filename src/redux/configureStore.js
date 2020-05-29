import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import user from './user'
import planetTypeReducer from './PlanetTypeReducer'
import planetReducer from './PlanetReducer'

let middleware = [];
if (process.env.NODE_ENV === 'development') {
  middleware = [...middleware, thunk, logger];
} else {
  middleware = [...middleware, thunk];
}


const ConfigureStore = (persistedState) => {
    const store = createStore(
        combineReducers({
            user,planetTypeReducer,planetReducer
        }),persistedState,
        applyMiddleware(...middleware),
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
