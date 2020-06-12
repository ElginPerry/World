import * as ActionTypes from './ActionTypes'

const defaultState = {
    ShipDesigns: [],
    ShipPods: [],
    ShipHulls: [],
    UserFleets: [],
    CurrentDesigns: [] 
}

// This is where you manipulate the state. The state is immutable so you need to return a new state vs changing the state directly.
// This is an example

const shipReducer = (state = defaultState, {type, payload}) => {
    switch (type) {
        case ActionTypes.LOGOUT_USER:
            return {
                ...defaultState
            }
        case ActionTypes.SET_SHIPDESIGNS:
            return {
                ...state,                
                ShipDesigns: payload
            }  
        case ActionTypes.SET_SHIPPODS:
            return {
                ...state,
                ShipPods:payload
            } 
        case ActionTypes.SET_SHIPHULLS:
            return {
                ...state,
                ShipHulls:payload
            } 
        case ActionTypes.SET_USERFLEETS:
            return {
                ...state,
                UserFleets:payload
            } 
        case ActionTypes.SET_CURRENTDESIGNS:
            return {
                ...state,
                CurrentDesigns:payload
            }                 
        default:
            return state
    }
}
export default shipReducer