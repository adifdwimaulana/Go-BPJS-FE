import { FETCH_VOYAGE, RECEIVE_VOYAGE, FAILED_VOYAGE } from '../../actions/voyages/getVoyages'

const defaultState = {
    voyages: []
}

export function fetchVoyage(state = defaultState, action){
    switch(action.type){
        case FETCH_VOYAGE:
            return ({ voyages: [], inProgress: true })
        case RECEIVE_VOYAGE:
            const voyages = action.payload

            return Object.assign({}, state, { voyages, inProgress: false })
        case FAILED_VOYAGE:
            return ({ voyages: [], inProgress: false })
        default:
            return state
    }
}