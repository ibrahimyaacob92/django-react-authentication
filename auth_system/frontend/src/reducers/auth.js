import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOAD_USER_FAIL,
    LOAD_USER_SUCCESS,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    LOGOUT,
    PASSWORD_RESET_CONFIRM_FAIL,
    PASSWORD_RESET_CONFIRM_SUCCESS,
    PASSWORD_RESET_FAIL,
    PASSWORD_RESET_SUCCESS,
    SIGNUP_FAIL,
    SIGNUP_SUCCESS,
    ACTIVATE_FAIL,
    ACTIVATE_SUCCCESS
} from '../actions/types'

const initialState = {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    isAuthenticated:null,
    user:null
}

export default function(state=initialState, action){
    const {type, payload} = action
    switch(type){
        case SIGNUP_SUCCESS:
            return{
                ...state,
                isAuthenticated:false
            } 

        case AUTHENTICATED_SUCCESS:
            return{
                ...state,
                isAuthenticated:true
            }

        case LOGIN_SUCCESS:
            localStorage.setItem('access', payload.access)
            return{
                ...state,
                isAuthenticated:true,
                access:payload.access,
                refresh:payload.refresh   
            }
        case LOAD_USER_SUCCESS:
            return{
                ...state,
                user:payload
            }
            
        case AUTHENTICATED_FAIL:
            return {
                ...state,
                isAuthenticated:false
            }    

        case LOAD_USER_FAIL:
            return{
                ...state,
                user:null
            }
        case LOGOUT:
        case LOGIN_FAIL:
        case SIGNUP_FAIL:
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
            return{
                ...state,
                isAuthenticated:false,
                access:null,
                refresh:null
            }
        case PASSWORD_RESET_CONFIRM_FAIL:
        case PASSWORD_RESET_CONFIRM_SUCCESS:
        case PASSWORD_RESET_FAIL:
        case PASSWORD_RESET_SUCCESS:
        case ACTIVATE_SUCCCESS:
        case ACTIVATE_FAIL:
            return{
                ...state
            }
        default:
            return state
    }
}