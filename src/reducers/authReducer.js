import {AUTH_ERR, AUTH_USER, UNAUTH_USER, CLEAR_AUTH_ERR} from "../actions/index"


export default function (state={}, action) {
    switch(action.type){
        case AUTH_USER:
            return {...state, authenticated: true};
        case UNAUTH_USER:
            return {...state, authenticated: false};
        case AUTH_ERR:
            return {...state, error: action.payload};
        case CLEAR_AUTH_ERR:
            return {...state, error: ""};
        default: return state;
    }
}