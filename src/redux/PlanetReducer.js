import * as ActionTypes from './ActionTypes'

const defaultState = {
    Planet: {planetID: null, planetType: null, planetName: null, position: null, subPosition: null, population: null, military: null,
        galaxy: null, sector: null, system: null, sysPosition: null, moon: null, owner: null },
    buildingQue: [],
    shipQue: [],
    researchQue: [],
    planetStats:{energy: 0, energyCost: 1, energyPer: 1, food: 0, infrastructure: 0, infrastructureMetal: 0, militaryMax: 0, mining: 0, populationMax: 0, research: 0, tradeRoutes: 0},
    BuildingStats:[],
    ResearchTypes:[],
    ResearchStats:[],
    PlanetPop:{metalsPop:0, researchPop:0, foodPop:0, energyPop:0, infrastructurePop:0, infrastructureMetalPop:0}     
}

// This is where you manipulate the state. The state is immutable so you need to return a new state vs changing the state directly.
// This is an example
const planetReducer = (state = defaultState, {type, payload}) => {
    switch (type) {
        case ActionTypes.SET_PLANET:
            return {
                ...state,                
                Planet: payload
            }  
            case ActionTypes.SET_PLANETBUILDQUE:
                return {
                    ...state,
                   buildingQue:payload
                } 
            case ActionTypes.SET_PLANETRESEARCHQUE:
                return {
                    ...state,
                    researchQue:payload
                }                  
            case ActionTypes.SET_PLANETSHIPQUE:
                return {
                    ...state,
                    shipQue:payload
                }
            case ActionTypes.SET_PLANETSTATS:
                return {
                    ...state,
                    planetStats:payload
                }
            case ActionTypes.SET_BUILDINGSTATS:
                return {
                    ...state,
                    BuildingStats:payload
                } 
            case ActionTypes.SET_RESEARCHTYPES:
                return {
                    ...state,
                    ResearchTypes:payload
                }
            case ActionTypes.SET_RESEARCHSTATS:
                return {
                    ...state,
                    ResearchStats:payload
                }
            case ActionTypes.SET_RESETPLANET:
                return {...defaultState
                }
            case ActionTypes.SET_PLANETPOP:
                return {...state, 
                    PlanetPop:payload
                }
        default:
            return state
    }
}

export default planetReducer