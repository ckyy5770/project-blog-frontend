import {FETCH_POSTS, FETCH_POST_BY_ID, DELETE_POST_BY_ID} from "../actions/post";


export default function (state={}, action) {
    switch(action.type){
        case FETCH_POSTS:
            return {...state, posts: action.payload};
        case FETCH_POST_BY_ID:
            return {...state, show: action.payload};
        case DELETE_POST_BY_ID:
            return state;
        default: return state;
    }
}