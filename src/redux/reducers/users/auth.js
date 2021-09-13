import { FETCH_LOGIN, RECEIVE_LOGIN, FAILED_LOGIN, RESET_LOGIN, FETCH_LOGOUT, RECEIVE_LOGOUT, FAILED_LOGOUT } from '../../actions/users/auth'

const defaultState = {
    authData: [],
    isAuthenticated: false
}

export function fetchLogin(state = defaultState, action){
    switch(action.type){
        case FETCH_LOGIN:
            return ({ authData: null, isAuthenticated: false, inProgress: true })
        case RECEIVE_LOGIN:
            return Object.assign({}, state, { authData: action.payload, isAuthenticated: true, inProgress: false })
        case FAILED_LOGIN:
            return ({ authData: null, isAuthenticated: false, inProgress: false })
        case FETCH_LOGOUT:
            return ({ authData: null, isAuthenticated: true, inProgress: true })
        case RECEIVE_LOGOUT:
            return ({ authData: null, isAuthenticated: false, inProgress: false })
        case FAILED_LOGOUT:
            return ({ authData: null, isAuthenticated: true, inProgress: false })
        default:
            return state
    }
}