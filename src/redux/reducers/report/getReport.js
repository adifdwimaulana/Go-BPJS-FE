import { FETCH_REPORT, RECEIVE_REPORT, FAILED_REPORT } from '../../actions/report/getReport'

const defaultState = {
    integration: [],
    holtrop: [],
    data: [],
    average: [],
    ship: {},
    route: ""
}

export function fetchReport(state = defaultState, action){
    switch(action.type){
        case FETCH_REPORT:
            return ({ integration: [], holtrop: [], average: [], ship: {}, route: "", inProgress: true })
        case RECEIVE_REPORT:
            const report = action.payload

            return Object.assign({}, state, { integration: report.integration, holtrop: report.holtrop, stwave: report.stwave, foc: report.foc, report: report.data, average: report.average, ship: report.ship, route: report.route, inProgress: false })
        case FAILED_REPORT:
            return ({ integration: [], holtrop: [], average: [], ship: {}, route: "", inProgress: false })
        default:
            return state
    }
}