import * as ActionTypes from './ActionTypes'

const defaultState = {    
    planetID: null,
    planetType: null,
    position: null,
    subPosition: null,
    galaxy: null,
    sector: null,
    system: null,
    sysPosition: null,
    moon: null,
    owner: null,
    buildingQue: [],
    shipQue: [],
    researchQue: [],      
}

// This is where you manipulate the state. The state is immutable so you need to return a new state vs changing the state directly.
// This is an example
const planetReducer = (state = defaultState, {type, payload}) => {
    switch (type) {
        case ActionTypes.SET_PLANET:
            return {
                ...state,
                planetID: payload.planetID,
                planetType: payload.planetType,
                position: payload.position,
                subPosition: payload.subPosition,
                galaxy: payload.galaxy,
                sector: payload.sector, 
                system: payload.system,
                sysPosition: payload.sysPosition,
                moon: payload.moon,
                owner: payload.owner
            }  
            case ActionTypes.SET_PLANETBUILDQUE:
                return {
                    ...state,
                    buildingQue: payload
                }       
        default:
            return state
    }
}

export default planetReducer