import { FETCH_MEDICINE, RECEIVE_MEDICINE, FAILED_MEDICINE } from '../../actions/medicine/getMedicine'

const defaultState = {
    medicines: [],
    medicineOptions: [],
}

export function fetchMedicine(state = defaultState, action){
    switch(action.type){
        case FETCH_MEDICINE:
            return ({ medicines: [], medicineOptions: [], inProgress: true })
        case RECEIVE_MEDICINE:
            const medicines = action.payload
            let list = []

            medicines.forEach((result, index) => {
                list.push({
                    label: `${result.name} (${result.dose} gram)`,
                    value: result.id,
                })
            })

            return Object.assign({}, state, { medicines, medicineOptions: list, inProgress: false })
        case FAILED_MEDICINE:
            return ({ medicines: [], medicineOptions: [], inProgress: false })
        default:
            return state
    }
}