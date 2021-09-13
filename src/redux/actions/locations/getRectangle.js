import axios from 'axios'
import cookie from 'react-cookies'
import { toast } from 'react-toastify'
import * as API_LINKS from '../../../config/links'

export const FETCH_RECTANGLE = 'FETCH_RECTANGLE'
export const RECEIVE_RECTANGLE = 'RECEIVE_RECTANGLE'
export const FAILED_RECTANGLE = 'FAILED_RECTANGLE'

export function fetchRectangle(){
    const auth = cookie.load('token')

    return (dispatch, getState) => {
        dispatch({ type: FETCH_RECTANGLE })

        axios({
            method: 'post',
            url: API_LINKS.LOCATION_RECTANGLE_URL,
            headers: {
                Authorization: auth
            }
        })
        .then((response) => {
            if(response.status === 200){
                if(response.data.status === 200){
                    dispatch({
                        type: RECEIVE_RECTANGLE,
                        payload: response.data.result
                    })
                } else {
                    dispatch({ type: FAILED_RECTANGLE })
                    return toast.error(response.data.message)
                }
            } 
        })
        .catch(function(error){
            if (error.response) {
                if(error.response.status === 401) {
                    dispatch({
                        type: FAILED_RECTANGLE
                    })
                    return toast.error(error.response.data.message);
                } else if (error.response.status === 403) {
                    dispatch({
                        type: FAILED_RECTANGLE
                    })
                    return toast.error(error.response.data.message);
                } else if (error.response.status === 400) {
                    dispatch({
                        type: FAILED_RECTANGLE
                    })
                    return toast.error(error.response.data.message);
                } else if (error.response.status === 404 || error.response.status === 500) {
                    dispatch({
                        type: FAILED_RECTANGLE
                    })
                    return toast.error("Server cannot be contacted! Please ask your system administrator!");
                } else {
                    dispatch({
                        type: FAILED_RECTANGLE
                    })
                    return toast.error('Something went wrong... Please try again later...')
                }
            } else if (error.request) {
                dispatch({
                    type: FAILED_RECTANGLE
                })
                return toast.error('Request have no response! Please check on your internet connection and refresh this page.')
            } else {
                dispatch({
                    type: FAILED_RECTANGLE
                })
                return toast.error('Something went wrong... Please try again later...')
            }
        })
    }
}