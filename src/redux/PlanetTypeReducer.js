import * as ActionTypes from './ActionTypes'

const defaultState = {    
    typeId: null,
    textureNo: null,
    intrastructure: null,
    mining: null,
    energy: null,
    barren: null,
    Galaxy1: [],
    Galaxy2: [],
    Galaxy3: []
}
// This is where you manipulate the state. The state is immutable so you need to return a new state vs changing the state directly.
// This is an example
const planetTypeReducer = (state = defaultState, {type, payload}) => {
    switch (type) {
        case ActionTypes.LOGOUT_USER:
            return {
                ...defaultState
            }
        case ActionTypes.SET_TEXTUREDETAIL:
            return {
                ...state,
                textureNo: payload,
            }
        case ActionTypes.SET_PLANETDETAIL:
            return {
                ...state,
                typeId: payload.typeid,
                textureNo: payload.textureNo,
                intrastructure: payload.intrastructure,
                mining: payload.mining,
                energy: payload.energy,
                barren: payload.barren 
            } 
        case ActionTypes.SET_GALAXY1:
            return {
                ...state,
                Galaxy1: payload,
            }
        case ActionTypes.SET_GALAXY2:
            return {
                ...state,
                Galaxy2: payload,
            }
        case ActionTypes.SET_GALAXY3:
            return {
                ...state,
                Galaxy3: payload,
            }
        default:
            return state
    }
}

export default planetTypeReducer