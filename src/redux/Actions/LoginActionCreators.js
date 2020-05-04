import * as ActionTypes from '../ActionTypes'

const LoginUser = (abaid, authenticationToken) => {
    return {
        type: ActionTypes.LOGIN_USER,
        payload: {
            abaid,
            authenticationToken,
        },
    }
}

export default LoginUser
