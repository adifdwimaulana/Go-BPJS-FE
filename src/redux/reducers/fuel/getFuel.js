import { FETCH_FUEL, RECEIVE_FUEL, FAILED_FUEL } from '../../actions/fuel/getFuel'

const defaultState = {
    fuels: [],
    fuelsOptions: [],
}

export function fetchFuel(state = defaultState, action){
    switch(action.type){
        case FETCH_FUEL:
            return ({ fuels: [], fuelsOptions: [], inProgress: true })
        case RECEIVE_FUEL:
            const fuels = action.payload
            let list = []

            fuels.forEach((result, index) => {
                list.push({
                    label: `${result.name} (${result.value})`,
                    value: result.id,
                })
            })

            return Object.assign({}, state, { fuels, fuelsOptions: list, inProgress: false })
        case FAILED_FUEL:
            return ({ fuels: [], fuelsOptions: [], inProgress: false })
        default:
            return state
    }
}