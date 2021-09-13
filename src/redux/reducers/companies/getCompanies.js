import { FETCH_COMPANY, RECEIVE_COMPANY, FAILED_COMPANY } from '../../actions/companies/getCompanies'

const defaultState = {
    companies: [],
    companiesOptions: [],
    companiesCount: 0
}

export function fetchCompany(state = defaultState, action){
    switch(action.type){
        case FETCH_COMPANY:
            return ({ companies: [], companiesOptions: [], companiesCount: 0, inProgress: true })
        case RECEIVE_COMPANY:
            const companies = action.payload
            let list = []

            companies.forEach((result, index) => {
                list.push({
                    label: result.name,
                    value: result.id
                })
            })

            return Object.assign({}, state, { companies, companiesOptions: list, companiesCount: companies.length, inProgress: false })
        case FAILED_COMPANY:
            return ({ companies: [], companiesOptions: [], companiesCount: 0, inProgress: false })
        default:
            return state
    }
}