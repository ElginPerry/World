import * as ActionTypes from '../ActionTypes'

const LoginUser = (payload) => {
    return {
        type: ActionTypes.LOGIN_USER,
        payload: {
            payload,
        },
    }
}

export default LoginUser
