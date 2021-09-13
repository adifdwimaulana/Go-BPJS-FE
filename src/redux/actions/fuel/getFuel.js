import axios from 'axios'
import cookie from 'react-cookies'
import { toast } from 'react-toastify'
import * as API_LINKS from '../../../config/links'

export const FETCH_FUEL = 'FETCH_FUEL'
export const RECEIVE_FUEL = 'RECEIVE_FUEL'
export const FAILED_FUEL = 'FAILED_FUEL'

export function fetchFuel(data){
    const auth = cookie.load('token')

    return (dispatch, getState) => {
        dispatch({ type: FETCH_FUEL })

        axios({
            method: 'post',
            url: API_LINKS.FUEL_LIST_URL,
            headers: {
                Authorization: auth
            },
            data
        })
        .then((response) => {
            if(response.status === 200){
                if(response.data.status === 200){
                    dispatch({
                        type: RECEIVE_FUEL,
                        payload: response.data.result
                    })
                } else {
                    dispatch({ type: FAILED_FUEL })
                    return toast.error(response.data.message)
                }
            } 
        })
        .catch(function(error){
            if (error.response) {
                if(error.response.status === 401) {
                    dispatch({
                        type: FAILED_FUEL
                    })
                    return toast.error(error.response.data.message);
                } else if (error.response.status === 403) {
                    dispatch({
                        type: FAILED_FUEL
                    })
                    return toast.error(error.response.data.message);
                } else if (error.response.status === 400) {
                    dispatch({
                        type: FAILED_FUEL
                    })
                    return toast.error(error.response.data.message);
                } else if (error.response.status === 404 || error.response.status === 500) {
                    dispatch({
                        type: FAILED_FUEL
                    })
                    return toast.error("Server cannot be contacted! Please ask your system administrator!");
                } else {
                    dispatch({
                        type: FAILED_FUEL
                    })
                    return toast.error('Something went wrong... Please try again later...')
                }
            } else if (error.request) {
                dispatch({
                    type: FAILED_FUEL
                })
                return toast.error('Request have no response! Please check on your internet connection and refresh this page.')
            } else {
                dispatch({
                    type: FAILED_FUEL
                })
                return toast.error('Something went wrong... Please try again later...')
            }
        })
    }
}