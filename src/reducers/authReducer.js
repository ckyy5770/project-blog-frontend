import {AUTH_ERR, AUTH_USER, UNAUTH_USER} from "../actions/index"


export default function (state={}, action) {
    switch(action.type){
        case AUTH_USER:
            return {...state, authenticated: true};
        case UNAUTH_USER:
            return {...state, authenticated: false};
        case AUTH_ERR:
            return {...state, error: action.payload};
        default: return state;
    }
}