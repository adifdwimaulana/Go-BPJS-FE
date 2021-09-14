import { FETCH_REQUEST, RECEIVE_REQUEST, FAILED_REQUEST } from "../../actions/request/getRequest";


const initState = {
    requests: [],
    requestOption:[],
    requestCount: 0
}

export function fetchRequest(state=initState, action){
    const {type, payload} = action;
    switch (type) {
        case FETCH_REQUEST:
            return ({...state, requests:[],requestOption:[], inProgress: true})
        case RECEIVE_REQUEST:
            return ({...state, requests:payload,requestOption:[], inProgress:false})
        case FAILED_REQUEST:
            return ({...state, requests: [],requestOption:[], requestCount:0, inProgress:false})
        default:
            return state;
    }
}