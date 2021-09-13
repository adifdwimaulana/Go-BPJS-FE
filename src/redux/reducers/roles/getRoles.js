import { FETCH_ROLE, RECEIVE_ROLE, FAILED_ROLE } from '../../actions/roles/getRoles'

const defaultState = {
    roles: [],
    rolesOptions: [],
}

export function fetchRole(state = defaultState, action){
    switch(action.type){
        case FETCH_ROLE:
            return ({ roles: [], rolesOptions: [], inProgress: true })
        case RECEIVE_ROLE:
            const roles = action.payload
            let list = []

            roles.forEach((result, index) => {
                list.push({
                    label: result.name,
                    value: result.id,
                })
            })

            return Object.assign({}, state, { roles, rolesOptions: list, inProgress: false })
        case FAILED_ROLE:
            return ({ roles: [], rolesOptions: [], inProgress: false })
        default:
            return state
    }
}