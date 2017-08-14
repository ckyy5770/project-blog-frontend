import {AUTH_ERR, AUTH_USER, UNAUTH_USER, CLEAR_AUTH_ERR} from "../actions/index"


export default function (state={}, action) {
    switch(action.type){
        case AUTH_USER:
            return {...state, authenticated: true, user: action.payload};
        case UNAUTH_USER:
            return {...state, authenticated: false, user: null};
        case AUTH_ERR:
            return {...state, error: action.payload};
        case CLEAR_AUTH_ERR:
            return {...state, error: ""};
        default: return state;
    }
}