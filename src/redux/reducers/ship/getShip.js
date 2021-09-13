import { FETCH_SHIP, RECEIVE_SHIP, FAILED_SHIP } from '../../actions/ship/getShip'

const defaultState = {
    ships: [],
    shipsOptions: [],
    shipsCount: 0
}

export function fetchShip(state = defaultState, action){
    switch(action.type){
        case FETCH_SHIP:
            return ({ ships: [], shipsOptions: [], shipsCount: 0, inProgress: true })
        case RECEIVE_SHIP:
            const ships = action.payload
            let list = []

            ships.forEach((result, index) => {
                list.push({
                    label: result.name,
                    value: result.id
                })
            })

            return Object.assign({}, state, { ships, shipsOptions: list, shipsCount: ships.length, inProgress: false })
        case FAILED_SHIP:
            return ({ ships: [], shipsOptions: [], shipsCount: 0, inProgress: false })
        default:
            return state
    }
}