import { FETCH_USER, RECEIVE_USER, FAILED_USER } from '../../actions/users/getUsers'

const defaultState = {
    users: [],
    usersOptions: [],
    usersCount: 0
}

export function fetchUser(state = defaultState, action){
    switch(action.type){
        case FETCH_USER:
            return ({ users: [], usersOptions: [], usersCount: 0, inProgress: true })
        case RECEIVE_USER:
            const users = action.payload
            let list = []

            users.forEach((result, index) => {
                list.push({
                    label: result.name,
                    value: result.id,
                })
            })

            return Object.assign({}, state, { users, usersOptions: list, usersCount: users.length, inProgress: false })
        case FAILED_USER:
            return ({ users: [], usersOptions: [], usersCount: 0, inProgress: false })
        default:
            return state
    }
}