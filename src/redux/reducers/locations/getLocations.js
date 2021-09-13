import { FETCH_LOCATION, RECEIVE_LOCATION, FAILED_LOCATION } from '../../actions/locations/getLocations'

const defaultState = {
    locations: [],
}

export function fetchLocation(state = defaultState, action){
    switch(action.type){
        case FETCH_LOCATION:
            return ({ locations: [], inProgress: true })
        case RECEIVE_LOCATION:
            const locations = action.payload
            let lines = []

            locations.forEach((result) => {
                let multilines = []
                result.forEach((location) => {
                    multilines.push([location.latitude, location.longitude])
                })
                if(multilines.length > 0){
                    lines.push(multilines)
                }
            })

            return Object.assign({}, state, { locations, lines, inProgress: false })
        case FAILED_LOCATION:
            return ({ locations: [], inProgress: false })
        default:
            return state
    }
}