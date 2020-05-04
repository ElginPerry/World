import * as ActionTypes from './ActionTypes'

const defaultState = {
    errMess: null,
    abaid: null,
    authenticationToken: null,
}
// This is where you manipulate the state. The state is immutable so you need to return a new state vs changing the state directly.
// This is an example
const user = (state = defaultState, {type, payload}) => {
    switch (type) {
        case ActionTypes.LOGIN_USER:
            return {
                ...state,
                abaid: payload.abaid,
                authenticationToken: payload.authenticationToken,
            }
        case ActionTypes.LOGIN_FAILED:
            return {...defaultState, errMess: payload}

        default:
            return state
    }
}

export default user
