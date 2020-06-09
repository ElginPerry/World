import * as ActionTypes from './ActionTypes'

const defaultState = {
    ShipDesigns: [],
    ShipPods: [],
    ShipHulls: [],
    PlanetFleets: [] 
}

// This is where you manipulate the state. The state is immutable so you need to return a new state vs changing the state directly.
// This is an example

const shipReducer = (state = defaultState, {type, payload}) => {
    switch (type) {
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
        case ActionTypes.SET_PLANETFLEETS:
            return {
                ...state,
                PlanetFleets:payload
            }    
        default:
            return state
    }
}
export default shipReducer