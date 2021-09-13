import { FETCH_CSTERN, RECEIVE_CSTERN, FAILED_CSTERN } from '../../actions/cstern/getCstern'

const defaultState = {
    csterns: [],
    csternsOptions: [],
}

export function fetchCstern(state = defaultState, action){
    switch(action.type){
        case FETCH_CSTERN:
            return ({ csterns: [], csternsOptions: [], inProgress: true })
        case RECEIVE_CSTERN:
            const csterns = action.payload
            let list = []

            csterns.forEach((result, index) => {
                list.push({
                    label: result.value,
                    value: result.id,
                    image_path: result.image_path
                })
            })

            return Object.assign({}, state, { csterns, csternsOptions: list, inProgress: false })
        case FAILED_CSTERN:
            return ({ csterns: [], csternsOptions: [], inProgress: false })
        default:
            return state
    }
}