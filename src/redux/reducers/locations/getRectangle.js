import { FETCH_RECTANGLE, RECEIVE_RECTANGLE, FAILED_RECTANGLE } from '../../actions/locations/getRectangle'

const defaultState = {
    rectangles: []
}

export function fetchRectangle(state = defaultState, action){
    switch(action.type){
        case FETCH_RECTANGLE:
            return ({ rectangles: [], inProgress: true })
        case RECEIVE_RECTANGLE:
            const rectangles = action.payload

            return Object.assign({}, state, { rectangles, inProgress: false })
        case FAILED_RECTANGLE:
            return ({ rectangles: [], inProgress: false })
        default:
            return state
    }
}