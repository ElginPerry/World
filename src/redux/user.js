import * as ActionTypes from './ActionTypes'

const defaultState = {
    UserID: null,
    UserEmail: null,
    Password: null,
    Premium: null,
    PremiumExpires: null,
    LastLogin: null,
    IPAddress: null
}

// This is where you manipulate the state. The state is immutable so you need to return a new state vs changing the state directly.
// This is an example
const user = (state = defaultState, {type, payload}) => {
    switch (type) {
        case ActionTypes.LOGOUT_USER:
            return {
                ...state, ...defaultState
            }
        case ActionTypes.LOGIN_USER:
            return {
                ...state,
                UserID: payload.userID,
                UserEmail: payload.userEmail,
                Password: payload.password,
                Premium: payload.premium,
                PremiumExpires: payload.premiumExpires,
                LastLogin: payload.lastLogin,
                IPAddress: payload.ipAddress,
            }    
        case ActionTypes.LOGIN_FAILED:
            return {...defaultState, errMess: payload}

        default:
            return state
    }
}

export default user
